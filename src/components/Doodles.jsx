export function PaintFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <filter id="paint">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" />
      </filter>
    </svg>
  );
}

export function Sunflower({ className }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} style={{ filter: "url(#paint)" }} aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-30" rx="7" ry="16" fill="#f2c230" transform={`rotate(${(i * 360) / 14})`} />
      ))}
      <circle r="17" fill="#5a3a1a" />
    </svg>
  );
}

export function Palette({ className }) {
  const dots = [["#7fb2e5", 32, 34], ["#f2c230", 58, 24], ["#f4ead0", 84, 30], ["#2f5fc4", 94, 56]];
  return (
    <svg viewBox="0 0 120 90" className={className} style={{ filter: "url(#paint)" }} aria-hidden="true">
      <path d="M60 6C28 6 6 28 6 52c0 22 20 32 38 30 12-1 8-14 18-14 12 0 14 10 28 6 16-5 24-22 24-36C114 22 92 6 60 6z" fill="#e6d7a8" />
      {dots.map(([c, x, y]) => <circle key={c} cx={x} cy={y} r="7" fill={c} />)}
      <circle cx="40" cy="62" r="6" fill="#0b1530" />
    </svg>
  );
}