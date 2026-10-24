import { useEffect, useRef } from "react";
import { useMotionValueEvent } from "motion/react";

const DENSITY = 900;  // lower (try 600) if slow on a weak phone
const BRISTLES = 6;   // more bristles = smoother, softer stroke

// Colors as [hue, saturation, lightness] so each bristle can vary slightly
const YELLOWS = [[45, 90, 55], [48, 85, 70], [42, 45, 88], [36, 85, 50]];
const BLUES = [[222, 62, 36], [220, 62, 48], [208, 68, 68], [222, 55, 22], [212, 50, 50]];

// Seeded random so the painting looks the same on every load
function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (list, rand) => list[Math.floor(rand() * list.length)];
const tint = ([h, s, l], rand) =>
  `hsl(${h + (rand() - 0.5) * 8}, ${s + (rand() - 0.5) * 16}%, ${l + (rand() - 0.5) * 16}%)`;

function buildStrokes(w, h) {
  const rand = rng(7);
  const unit = Math.min(w, h);
  const centers = [
    { x: w * 0.28, y: h * 0.5, s: 1 },
    { x: w * 0.74, y: h * 0.3, s: -1 },
  ];

  // Direction of the "wind" at a point: gentle waves plus two spirals
  const angleAt = (x, y) => {
    let vx = 1 + 0.5 * Math.sin((y / unit) * 9);
    let vy = 0.6 * Math.cos((x / unit) * 7);
    for (const c of centers) {
      const dx = x - c.x;
      const dy = y - c.y;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.exp(-(d * d) / (unit * unit * 0.12)) * 3.2 * c.s;
      vx += (-dy / d) * k;
      vy += (dx / d) * k;
    }
    return Math.atan2(vy, vx);
  };

  const count = Math.round((DENSITY * w * h) / (unit * unit));
  const strokes = [];
  for (let i = 0; i < count; i++) {
    const x0 = rand() * w;
    const y0 = rand() * h;

    // 1. The brush's center line, following the flow
    let x = x0;
    let y = y0;
    const pts = [{ x, y, a: angleAt(x, y) }];
    const steps = 8 + Math.floor(rand() * 8);
    const step = unit * 0.011;
    for (let k = 0; k < steps; k++) {
      const a = angleAt(x, y);
      x += Math.cos(a) * step;
      y += Math.sin(a) * step;
      pts.push({ x, y, a });
    }

    // 2. Pick a color family by height on screen
    const t = y0 / h + (rand() - 0.5) * 0.5;
    const palette = t < 0.45 ? YELLOWS : BLUES;
    const base = pick(palette, rand);
    const width = unit * (0.016 + rand() * 0.018);

    // 3. Build thin bristle lines beside the center line
    const bristles = [];
    for (let j = 0; j < BRISTLES; j++) {
      const off = j / (BRISTLES - 1) - 0.5;
      const from = rand() * 0.15;       // dry-brush start
      const to = 1 - rand() * 0.25;     // dry-brush end
      const path = new Path2D();
      let started = false;
      pts.forEach((p, n) => {
        const u = n / (pts.length - 1);
        if (u < from || u > to) return;
        const taper = Math.pow(Math.sin(Math.PI * u), 0.5); // narrow at both ends
        const o = off * width * (0.35 + 0.65 * taper);
        const px = p.x - Math.sin(p.a) * o;
        const py = p.y + Math.cos(p.a) * o;
        if (started) path.lineTo(px, py);
        else { path.moveTo(px, py); started = true; }
      });
      const colorSource = rand() < 0.2 ? pick(palette, rand) : base; // some blending
      bristles.push({ path, color: tint(colorSource, rand), lw: (width / BRISTLES) * 1.8 });
    }
    strokes.push({ bristles, order: -(y0 / h + (rand() - 0.5) * 0.25) });
  }
  return strokes.sort((a, b) => a.order - b.order);
}

function drawStroke(ctx, s) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.88;
  for (const b of s.bristles) {
    ctx.strokeStyle = b.color;
    ctx.lineWidth = b.lw;
    ctx.stroke(b.path);
  }
}

export default function PaintCanvas({ progress, className = "" }) {
  const canvasRef = useRef(null);
  const state = useRef({ strokes: [], drawn: 0, w: 0, h: 0 });

  // Paint only new strokes when scrolling down, clear and repaint when scrolling up
  const paint = (value) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = state.current;
    const ctx = canvas.getContext("2d");
    const target = Math.floor(Math.min(1, Math.max(0, value)) * s.strokes.length);
    if (target < s.drawn) {
      ctx.clearRect(0, 0, s.w, s.h);
      s.drawn = 0;
    }
    for (let i = s.drawn; i < target; i++) drawStroke(ctx, s.strokes[i]);
    s.drawn = target;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
      state.current = { strokes: buildStrokes(w, h), drawn: 0, w, h };
      paint(progress.get());
    };
    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [progress]);

  useMotionValueEvent(progress, "change", paint);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}