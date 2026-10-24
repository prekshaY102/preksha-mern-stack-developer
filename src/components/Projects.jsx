import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "motion/react";
import { projects } from "../data";
import PaintCanvas from "./PaintCanvas";

const btn = "rounded-md border border-line px-4 py-2 text-sm font-semibold transition hover:border-sun hover:text-sun";

function Scene({ project, index, total, p }) {
  const seg = 1 / total;
  const a = index * seg;
  const b = (index + 1) * seg;
  const first = index === 0;
  const last = index === total - 1;
  const range = [a, a + seg * 0.2, b - seg * 0.2, b];

  const opacity = useTransform(p, range, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(p, range, [first ? 0 : 60, 0, 0, last ? 0 : -60]);
  const frameX = useTransform(p, [a, a + seg * 0.25], [first ? 0 : 90, 0]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <motion.article style={{ opacity, y, pointerEvents }} className="absolute inset-0 flex items-center">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-5 pt-20 md:grid-cols-[1.05fr_1fr] md:gap-14">
        {/* Text side */}
        <div>
          <p className="hidden font-serif text-8xl font-bold leading-none text-transparent [-webkit-text-stroke:1px_#f2c230] md:block">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="font-serif text-3xl font-bold leading-tight md:mt-4 md:text-6xl">{project.name}</h3>
          <p className="mt-3 text-base text-sky md:text-xl">{project.tagline}</p>
          <p className="mt-3 hidden text-muted md:block">{project.role}</p>
          {project.image && (
            <ul className="mt-5 hidden space-y-1.5 text-sm text-muted md:block">
              {project.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          )}
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <li key={t} className="rounded-md border border-line bg-night/70 px-2 py-0.5 font-mono text-xs text-sky">{t}</li>
            ))}
          </ul>
          <div className="mt-5 flex gap-3">
            {project.live && <a href={project.live} target="_blank" rel="noreferrer" className={btn}>Live site</a>}
            {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className={btn}>Source code</a>}
          </div>
        </div>

        {/* Painted frame side */}
        <motion.div style={{ x: frameX }} className={`relative ${index % 2 ? "md:rotate-[1.5deg]" : "md:-rotate-[1.5deg]"}`}>
          <div className="pointer-events-none absolute -inset-2 border-[8px] border-sun/90 md:-inset-3 md:border-[10px]" style={{ filter: "url(#paint)" }} aria-hidden="true" />
          <div className="relative overflow-hidden bg-night shadow-2xl">
            {project.image ? (
              <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            ) : (
              <div className="font-mono text-xs md:text-sm">
                <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="ml-3 text-muted">features.js</span>
                </div>
                <ul className="space-y-2 p-4 md:space-y-3 md:p-6">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-paper">
                      <span className="text-sun">+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const total = projects.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const full = useMotionValue(1); // background painting, fully painted
  const [active, setActive] = useState(0);

  useMotionValueEvent(p, "change", (v) =>
    setActive(Math.min(total - 1, Math.max(0, Math.floor(v * total))))
  );

  return (
    <section id="projects" ref={ref} style={{ height: `${total * 120}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-deep">
        <PaintCanvas progress={full} className="absolute inset-0 h-full w-full opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/60 via-deep/40 to-deep/80" />

        <h2 className="sr-only">Projects</h2>
        <div className="absolute inset-x-0 top-[11vh] z-10 mx-auto flex max-w-6xl items-center justify-between px-5 font-mono text-xs text-muted md:top-[13vh]">
          <span className="text-sun">What I build</span>
          <span>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>

        {projects.map((project, i) => (
          <Scene key={project.name} project={project} index={i} total={total} p={p} />
        ))}
      </div>
    </section>
  );
}