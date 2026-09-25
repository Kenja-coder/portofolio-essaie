import { 
  Code2, 
  FileCode, 
  Database, 
  Layout, 
  Palette, 
  Terminal, 
  Cpu, 
  Boxes 
} from "lucide-react";
import {motion} from "framer-motion"

const SKILLS = [
  { name: "React", icon: Code2 },
  { name: "Tailwind CSS", icon: Layout },
  { name: "JavaScript", icon: FileCode },
  { name: "PHP", icon: Terminal },
  { name: "MySQL", icon: Database },
  { name: "HTML5 / CSS3", icon: Code2 },
  { name: "Adobe Photoshop", icon: Palette },
  { name: "Électronique Numérique", icon: Cpu },
  { name: "C / C++", icon: Boxes },
];

function Skill() {
  return (
    <section className="w-full py-12 bg-base-200/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
        <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">
          Savoir-faire
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-base-content">
          Mes Compétences & Technologies
        </h3>
      </div>

      {/* Conteneur avec masques de fondu sur les côtés */}
      <div
        className="relative w-full overflow-hidden flex bg-neutral/10 py-4 rotate-1 border-y border-base-content/5 cursor-pointer"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}
      >
        {/* Défilement infini nativement animé en Tailwind CSS + pause au survol */}
        <motion.div className="flex items-center gap-4 w-max animate-[scroll_25s_linear_infinite] hover:[animation-play-state:paused]">
          {[...SKILLS, ...SKILLS].map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm hover:border-accent/50 hover:scale-105 transition-all duration-200 whitespace-nowrap"
              >
                <Icon className="w-5 h-5 text-accent" />
                <span className="font-medium text-base-content">{skill.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Skill;