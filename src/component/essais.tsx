import { motion } from "framer-motion";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  img: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "ChronoQuest",
    description: "Application web full-stack de modération de questions et vote en direct pour conférences.",
    img: "src/assets/projects/1.png",
    tags: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: 2,
    title: "Portfolio YBVLAD",
    description: "Site portfolio interactif avec système de thème dynamique, animations fluides et masques graphiques.",
    img: "src/assets/projects/2.png",
    tags: ["React", "Tailwind CSS", "DaisyUI", "Framer Motion"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: 3,
    title: "LOADA SHOES ACADEMY",
    description: "Identité visuelle complète, charte graphique et mockups promotionnels pour une académie de cordonnerie.",
    img: "src/assets/projects/3.png",
    tags: ["Photoshop", "Illustrator", "Branding"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: 4,
    title: "Application Mobile UI",
    description: "Concept UI/UX moderne pour le suivi de tâches quotidiennes et productivité.",
    img: "src/assets/projects/4.png",
    tags: ["Figma", "UI/UX", "React Native"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
];

export default function Projet() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window && window.innerWidth < 768);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // On modifie l'état pour stocker directement les coordonnées finales calculées (restX, offsetY)
  const [animatedRects, setAnimatedRects] = useState<{ restX: number; offsetY: number }[]>([]);
  
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    // CHANGEMENT MAJEUR : On fait tous les calculs ici, en dehors du rendu
    const computedRects = slotRefs.current.map((el) => {
      if (!el) return { restX: 0, offsetY: 0 };
      
      const r = el.getBoundingClientRect();
      const relativeLeft = r.left - containerRect.left;
      const relativeTop = r.top - containerRect.top;

      // Soustractions géométriques pour trouver le centre exact
      const targetX = containerWidth / 2 - r.width / 2;
      const targetY = containerHeight / 2 - r.height / 2;

      return {
        restX: targetX - relativeLeft,
        offsetY: targetY - relativeTop,
      };
    });

    setAnimatedRects(computedRects);
  }, []); // [] s'exécute après le tout premier affichage, quand les éléments HTML existent enfin

  return (
    <div 
      ref={containerRef}
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 min-h-[400px] relative `}
      onMouseEnter={() => !isTouchDevice && setIsExpanded(true)}
      onMouseLeave={() => !isTouchDevice && setIsExpanded(false)}
      onClick={() => isTouchDevice && setIsExpanded(!isExpanded)}
    >
       

      {PROJECTS.map((project, index) => {
        // On récupère les valeurs pré-calculées en toute sécurité depuis l'état
        const currentAnim = animatedRects[index] || { restX: 0, offsetY: 0 };
        const restRotate = (index - (PROJECTS.length - 1) / 2) * 6;

        return (
          <motion.div
            key={project.id} 
            ref={(el) => { slotRefs.current[index] = el; }}
            className="border p-4 rounded-xl shadow bg-white cursor-pointer select-none" 
            animate={
              isExpanded
                ? { x: 0, y: 0, rotate: 0, zIndex: 10 } 
                : { x: currentAnim.restX, y: currentAnim.offsetY, rotate: restRotate, zIndex: PROJECTS.length - index } 
            }
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <h3 className="font-bold text-lg mb-2">{project.title}</h3>
            <img src={project.img} alt={project.title} className="w-full h-32 object-cover rounded-lg mb-2" />
            <p className="text-sm text-gray-600">{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
