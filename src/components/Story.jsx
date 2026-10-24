import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { profile, about } from "../data";
import { Sunflower, Palette, PaintFilter } from "./Doodles";
import PaintCanvas from "./PaintCanvas";
import useIsMobile from "../useIsMobile";

export default function Story() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  // Portrait: moves sideways on desktop, upward on phones, then shrinks away
  const xD = useTransform(p, [0, 0.3], ["20vw", "-26vw"]);
  const yM = useTransform(p, [0, 0.3], ["-6vh", "-24vh"]);
  const scaleD = useTransform(p, [0, 0.3, 0.62, 0.74], [1, 0.8, 0.8, 0.2]);
  const scaleM = useTransform(p, [0, 0.3, 0.62, 0.74], [1, 0.5, 0.5, 0.2]);
  const portraitOpacity = useTransform(p, [0.62, 0.74], [1, 0]);

  // Text blocks
  const heroOpacity = useTransform(p, [0, 0.14], [1, 0]);
  const heroY = useTransform(p, [0, 0.14], [0, -40]);
  const aboutOpacity = useTransform(p, [0.22, 0.34, 0.58, 0.68], [0, 1, 1, 0]);
  const aboutY = useTransform(p, [0.22, 0.34, 0.58, 0.68], [40, 0, 0, -40]);

  // Hand-off to Projects
  const full = useMotionValue(1); // background painting, always fully painted
  const paintP = useTransform(p, [0.6, 0.92], [0, 1]); // foreground painting, painted by scroll
  const flowerScale = useTransform(p, [0.7, 0.92], [0, 1]);
  const flowerRotate = useTransform(p, [0.7, 1], [0, 200]);
  const paletteOpacity = useTransform(p, [0.76, 0.9], [0, 1]);
  const paletteY = useTransform(p, [0.76, 0.9], [30, 0]);
  const titleOpacity = useTransform(p, [0.82, 0.94], [0, 1]);

  return (
    <section ref={ref} id="top" className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-night">
        <PaintFilter />

        {/* Faint night-sky painting behind everything */}
        <PaintCanvas progress={full} className="absolute inset-0 h-full w-full opacity-20" />

        {/* Portrait with a halo */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ x: isMobile ? 0 : xD, y: isMobile ? yM : 0, scale: isMobile ? scaleM : scaleD, opacity: portraitOpacity }}
            className="relative h-[min(78vw,52vh)] w-[min(78vw,52vh)] max-h-[460px] max-w-[460px]"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ filter: "url(#paint)" }} aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#f2c230" strokeWidth="1.6" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#7fb2e5" strokeWidth="1" opacity="0.7" />
              <circle cx="50" cy="50" r="34" fill="#14244f" />
            </svg>
            <img src="/preksha.png" alt="Portrait of Preksha" className="absolute inset-0 h-full w-full object-contain object-bottom" />
          </motion.div>
        </div>

        {/* Intro text */}
        <div className="absolute inset-x-6 bottom-[8vh] md:inset-x-auto md:bottom-auto md:left-[8vw] md:top-1/2 md:max-w-md md:-translate-y-1/2">
          <motion.div style={{ opacity: heroOpacity, y: heroY }}>
            <p className="font-mono text-sm text-sun">{profile.location}</p>
            <h1 className="mt-3 font-serif text-5xl font-bold leading-none md:text-7xl">{profile.name}</h1>
            <p className="mt-3 font-serif text-xl text-sky md:text-2xl">{profile.title}</p>
            <p className="mt-5 hidden text-muted md:block">I build web apps with the MERN stack and paint in my free time.</p>
            <p className="mt-6 font-mono text-xs text-muted">Scroll to begin</p>
          </motion.div>
        </div>

        {/* About text */}
        <div className="absolute inset-x-6 bottom-[5vh] md:inset-x-auto md:bottom-auto md:right-[8vw] md:top-1/2 md:w-[38vw] md:-translate-y-1/2">
          <motion.div style={{ opacity: aboutOpacity, y: aboutY }}>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">About me</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-muted md:text-base md:leading-7">
              {about.map((t) => <p key={t}>{t}</p>)}
            </div>
          </motion.div>
        </div>

        {/* Painting that fills the screen as you scroll into Projects */}
        <PaintCanvas progress={paintP} className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="canvas-grain pointer-events-none absolute inset-0" aria-hidden="true" />
        <motion.div
          style={{ opacity: paintP }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent to-deep"
        />

        <motion.div style={{ scale: flowerScale, rotate: flowerRotate }} className="absolute right-[8vw] top-[16vh] h-[22vh] w-[22vh]">
          <Sunflower className="h-full w-full" />
        </motion.div>
        <motion.div style={{ opacity: paletteOpacity, y: paletteY }} className="absolute bottom-[10vh] left-[8vw] h-[18vh] w-[24vh]">
          <Palette className="h-full w-full" />
        </motion.div>
        <motion.p
          style={{ opacity: titleOpacity }}
          className="absolute left-1/2 top-[12vh] -translate-x-1/2 whitespace-nowrap rounded-md border border-sun bg-night/90 px-6 py-3 font-serif text-3xl font-bold md:text-5xl"
        >
          What I build
        </motion.p>
      </div>
    </section>
  );
}