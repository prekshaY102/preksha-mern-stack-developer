import { skills } from "../data";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="bg-night">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <Reveal><h2 className="font-serif text-3xl font-bold">Skills</h2></Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <Reveal key={s.group}>
              <div className="h-full rounded-lg border border-line bg-deep p-5">
                <h3 className="font-mono text-sm text-sun">{s.group}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {s.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}