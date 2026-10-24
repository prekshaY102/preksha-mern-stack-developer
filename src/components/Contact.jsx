import { profile } from "../data";
import Reveal from "./Reveal";

const btn = "rounded-md border border-line px-5 py-2.5 text-sm font-semibold transition hover:border-sun hover:text-sun";

export default function Contact() {
  return (
    <section id="contact" className="bg-deep">
      <Reveal>
        <div className="mx-auto max-w-5xl px-5 py-24">
          <h2 className="font-serif text-3xl font-bold">Contact</h2>
          <p className="mt-3 max-w-prose text-muted">I am looking for a full-stack developer role. Email is the best way to reach me.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="rounded-md bg-sun px-5 py-2.5 text-sm font-semibold text-night transition hover:brightness-110">Email me</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={btn}>GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={btn}>LinkedIn</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}