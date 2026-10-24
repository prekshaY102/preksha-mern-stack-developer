import Header from "./components/Header";
import Story from "./components/Story";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { profile } from "./data";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Story />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-line py-8 text-center font-mono text-xs text-muted">
        {profile.name}, {new Date().getFullYear()}
      </footer>
    </>
  );
}