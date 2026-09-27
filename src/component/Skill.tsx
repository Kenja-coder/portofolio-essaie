import { useState, useEffect } from "react";
import {
  Code2,
  FileCode,
  Database,
  Layout,
  Palette,
  Terminal,
  Cpu,
  Boxes,
  X,
  CheckCircle2,
  FolderGit2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SKILLS = [
  { 
    name: "React", 
    icon: Code2, 
    description: "C'est mon outil principal pour créer des sites internet et des applications web modernes. Il me permet de concevoir des interfaces utilisateur ultra-rapides, interactives et agréables à utiliser au quotidien.",
    highlights: ["Applications fluides et instantanées", "Interfaces interactives dynamiques"],
    projectType: "Dashboards, plateformes web, applications sur-mesure"
  },
  { 
    name: "Tailwind CSS", 
    icon: Layout, 
    description: "Cet outil me permet de donner vie aux maquettes graphiques et de créer des designs uniques. Grâce à lui, je gère le rendu visuel avec précision pour que le site soit parfaitement adapté à tous les écrans (ordinateurs, tablettes et smartphones).",
    highlights: ["Design 100% sur-mesure", "Adaptation parfaite sur mobile"],
    projectType: "Sites vitrines esthétiques, interfaces modernes"
  },
  { 
    name: "JavaScript", 
    icon: FileCode, 
    description: "C'est le langage qui apporte de la vie et du mouvement dans mes projets. Je l'utilise pour créer des animations fluides, gérer les formulaires de contact, charger du contenu sans recharger la page et rendre le site totalement vivant.",
    highlights: ["Animations et transitions fluides", "Interactivité utilisateur en temps réel"],
    projectType: "Fonctionnalités dynamiques, calculatrices en ligne, filtres"
  },
  { 
    name: "PHP", 
    icon: Terminal, 
    description: "Il s'agit du moteur invisible qui tourne en arrière-plan de votre site. Je l'utilise pour concevoir toute la logique interne : gérer les comptes des utilisateurs, sécuriser l'envoi de formulaires et traiter les actions complexes de manière fiable.",
    highlights: ["Logique serveur sécurisée", "Gestion des espaces membres"],
    projectType: "E-commerce, systèmes d'inscription, portails clients"
  },
  { 
    name: "MySQL", 
    icon: Database, 
    description: "C'est le coffre-fort numérique où sont stockées proprement toutes les données importantes du site (textes, informations clients, produits). J'organise cette structure pour que les informations soient retrouvées et affichées en une fraction de seconde.",
    highlights: ["Stockage de données sécurisé", "Recherches et affichages ultra-rapides"],
    projectType: "Gestion de catalogues, historiques de commandes"
  },
  { 
    name: "HTML5 / CSS3", 
    icon: Code2, 
    description: "Ce sont les fondations indispensables de n'importe quel site web. Le premier sert à structurer le texte et les images pour qu'ils soient lisibles par Google (SEO), tandis que le second s'occupe des couleurs, de la mise en page et de l'habillage graphique.",
    highlights: ["Structure optimisée pour Google", "Mise en page propre et soignée"],
    projectType: "Structure de base de tous mes projets web"
  },
  { 
    name: "Adobe Photoshop", 
    icon: Palette, 
    description: "Je l'utilise pour préparer, retoucher et optimiser tous les visuels avant de les intégrer sur le web. Cela me permet de garantir que les images restent magnifiques tout en étant légères pour ne pas ralentir le chargement du site.",
    highlights: ["Optimisation du poids des images", "Retouche et montage graphique"],
    projectType: "Création de bannières, préparation d'illustrations"
  },
  { 
    name: "Électronique Numérique", 
    icon: Cpu, 
    description: "Cette compétence montre ma capacité à comprendre la logique des machines et à résoudre des problèmes complexes. Elle m'apporte une grande rigueur dans ma manière de penser et de construire mes programmes informatiques.",
    highlights: ["Logique de résolution de problèmes", "Esprit d'analyse et de précision"],
    projectType: "Programmation de composants, systèmes automatisés"
  },
  { 
    name: "C / C++", 
    icon: Boxes, 
    description: "Ces langages fondamentaux m'ont appris à écrire du code extrêmement rapide et économe en énergie. C'est une excellente école qui me permet aujourd'hui d'écrire un code propre et performant, peu importe la technologie utilisée.",
    highlights: ["Code optimisé pour la rapidité", "Compréhension profonde de l'informatique"],
    projectType: "Logiciels de calcul, algorithmes de haute performance"
  },
];

type SkillType = typeof SKILLS[number];

function Skill() {
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);

  // Fermeture de la modale avec la touche Echap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSkill(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full py-12 bg-gray-700 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
        <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">
          Savoir-faire
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-50">
          Mes Compétences & Technologies
        </h3>
      </div>

      {/* Bandeau de défilement */}
      <div
        className="relative w-full overflow-hidden flex bg-neutral/10 py-4 rotate-1 border-y border-base-content/5 cursor-pointer"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}
      >
        <motion.div className="flex items-center gap-4 w-max animate-[scroll_25s_linear_infinite] hover:[animation-play-state:paused]">
          {[...SKILLS, ...SKILLS].map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                onClick={() => setSelectedSkill(skill)}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm hover:border-accent/50 hover:scale-105 transition-all duration-200 whitespace-nowrap"
              >
                <Icon className="w-5 h-5 text-accent" />
                <span className="font-medium text-base-content">{skill.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Affichage des détails (Modale) */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-base-100 border border-base-content/10 w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative"
            >
              {/* Bouton de fermeture */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-5 right-5 text-base-content/50 hover:text-base-content bg-base-200 p-2 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* En-tête */}
              <div className="flex items-center gap-4 mb-6 mt-2">
                <div className="p-4 bg-accent/10 rounded-2xl">
                  <selectedSkill.icon className="w-10 h-10 text-accent" />
                </div>
                <h4 className="text-2xl md:text-3xl font-extrabold text-base-content">
                  {selectedSkill.name}
                </h4>
              </div>

              {/* Description */}
              <p className="text-base-content/90 leading-relaxed text-base md:text-lg mb-6">
                {selectedSkill.description}
              </p>

              <hr className="border-base-content/10 mb-5" />

              {/* Points clés & Projets */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                    Ce que cela vous apporte :
                  </h5>
                  <ul className="space-y-2">
                    {selectedSkill.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-base-content/80">
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-accent mb-1.5">
                    Idéal pour :
                  </h5>
                  <div className="flex items-start gap-2 text-sm md:text-base text-base-content/80 bg-neutral/5 p-3 rounded-xl border border-base-content/5">
                    <FolderGit2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="italic">{selectedSkill.projectType}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Skill;