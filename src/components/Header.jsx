import { profile } from "../data";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-night/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-serif text-lg font-bold text-sun">{profile.name}</a>
        <nav aria-label="Main" className="flex gap-6 text-sm text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-paper">{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}