import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import SpecialReveal from "@/components/SpecialReveal";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import CodingDesk from "@/components/CodingDesk";
import GitHubSection from "@/components/GitHubSection";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#050505] text-white">
      {/* Hero Intro */}
      <Hero />

      {/* Profile & Biography (Stats embedded) */}
      <About />

      {/* Engineering Journey (Internships vertical timeline) */}
      <Experience />

      {/* Apple-style deep dive on LT Line grid fault hardware and ML system */}
      <SpecialReveal />

      {/* Featured Projects cards grid & info modal details */}
      <Projects />

      {/* Interactive skill matrix block */}
      <Skills />

      {/* Workspace coding editor and mock command console */}
      <CodingDesk />

      {/* Simulated premium GitHub metrics panel */}
      <GitHubSection />

      {/* Achievements and university credentials */}
      <Achievements />

      {/* Validated email submission gateway */}
      <Contact />

      {/* Tech reference credit footer */}
      <Footer />
    </div>
  );
}
