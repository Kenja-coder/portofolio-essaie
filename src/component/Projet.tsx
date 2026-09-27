import { ArrowRight, CodeXml, ExternalLink } from "lucide-react";
import { useState, useRef, useLayoutEffect, useCallback, type MouseEvent, useEffect } from "react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  img: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "ChronoQuest",
    description: "Application web full-stack de modération de questions et vote en direct pour conférences.",
    img: "src/assets/projects/1.png",
    tags: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/votre-user/chronoquest",
    demoUrl: "https://chronoquest.demo.com",
  },
  {
    id: 2,
    title: "Portfolio YBVLAD",
    description: "Site portfolio interactif avec système de thème dynamique, animations fluides et masques graphiques.",
    img: "src/assets/projects/2.png",
    tags: ["React", "Tailwind CSS", "DaisyUI", "Framer Motion"],
    githubUrl: "https://github.com/votre-user/portfolio",
    demoUrl: "https://chronoquest.demo.com",
  },
  {
    id: 3,
    title: "LOADA SHOES ACADEMY",
    description: "Identité visuelle complète, charte graphique et mockups promotionnels pour une académie de cordonnerie.",
    img: "src/assets/projects/3.png",
    tags: ["Photoshop", "Illustrator", "Branding"],
    githubUrl: "https://github.com/votre-user/chronoquest",
    demoUrl: "https://chronoquest.demo.com",
  },
  {
    id: 4,
    title: "Application Mobile UI",
    description: "Concept UI/UX moderne pour le suivi de tâches quotidiennes et productivité.",
    img: "src/assets/projects/4.png",
    tags: ["Figma", "UI/UX", "React Native"],
    githubUrl: "https://github.com/votre-user/chronoquest",
    demoUrl: "https://chronoquest.demo.com",
  },
];

type Rect = { left: number; top: number; width: number; height: number };

export default function Projet() {
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rects, setRects] = useState<(Rect | null)[]>(projects.map(() => null));
  const [containerWidth, setContainerWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const [ready, setReady] = useState(false);

  // Détection dynamique tactile & petite résolution
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    const newRects = slotRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        left: r.left - containerRect.left,
        top: r.top - containerRect.top,
        width: r.width,
        height: r.height,
      };
    });

    setRects(newRects);
    setContainerWidth(containerRect.width);

    if (newRects.length > 0 && newRects[newRects.length - 1]) {
      const lastRect = newRects[newRects.length - 1]!;
      setGridHeight(lastRect.top + lastRect.height);
    }

    setReady(true);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    slotRefs.current.forEach((ref) => {
      if (ref) ro.observe(ref);
    });

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const anchorReady = ready && containerWidth > 0;
  const singleCardHeight = rects[0]?.height || 420;
  const expanded = isTouchDevice || isSectionHovered;

  return (
    <section className="isolate relative py-8 md:py-16 max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
      {/* SVG d'arrière-plan - Isolé au fond avec -z-10 */}
      <svg
        viewBox="0 0 450 250"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none p-1 sm:p-2"
        >
        <motion.rect
          className="stroke-accent stroke-[3] sm:stroke-[4] md:stroke-[5] [stroke-dasharray:5,4] [stroke-linecap:round]"
          // -36 est un multiple parfait de (5 + 4 = 9), l'animation bouclera à l'infini sans à-coups
          animate={{ strokeDashoffset: [0, -36] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          fill="none"
          x={2.5}
          y={2.5}
          width={445}
          height={245}
          rx={20} 
          ry={20} 
        />
        </svg>


      <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-12 text-center">
        Mes Projets
      </h2>

      <motion.div
        ref={containerRef}
        className="relative cursor-pointer overflow-visible z-10 p-17"
        animate={{
          height: expanded ? gridHeight : singleCardHeight + (isTouchDevice ? 20 : 120),
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        onMouseEnter={() => !isTouchDevice && setIsSectionHovered(true)}
        onMouseLeave={() => !isTouchDevice && setIsSectionHovered(false)}
      >
        {!isSectionHovered && !isTouchDevice && (
          <DivMessage message="Une partie de mes projets,Je vous invite a découvrir" />
        )}

        {/* Grille invisible de référence responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={`slot-${project.id}`}
              ref={(el: HTMLDivElement | null) => {
                slotRefs.current[index] = el;
              }}
              className="invisible"
              aria-hidden="true"
            >
              <SlotCardShape project={project} isTouchDevice={isTouchDevice} />
            </div>
          ))}
        </div>

        {/* Cartes animées */}
        {anchorReady &&
          projects.map((project, index) => {
            const rect = rects[index];
            if (!rect) return null;

            const targetLeft = containerWidth / 2 - rect.width / 2;
            const targetTop = 0;
            const offset = { x: targetLeft - rect.left, y: targetTop - rect.top };

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                isExpanded={expanded}
                isTouchDevice={isTouchDevice}
                rect={rect}
                offset={offset}
              />
            );
          })}
      </motion.div>
    </section>
  );
}

function SlotCardShape({ project, isTouchDevice }: { project: Project; isTouchDevice: boolean }) {
  return (
    <div className="card bg-base-100 border border-base-content/15 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between h-full min-h-[380px] sm:min-h-[420px]">
      <div className="h-36 sm:h-44 md:h-48 bg-base-200 shrink-0" />
      <div className="card-body p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="card-title text-base sm:text-lg font-bold">{project.title}</h3>
          <p className="text-xs sm:text-sm opacity-80 mt-1 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 my-2.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="badge badge-xs sm:badge-sm badge-outline font-medium opacity-75 bg-accent text-base-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {isTouchDevice && (
          <div className="flex gap-2 pt-2 mt-auto">
            <div className="btn btn-xs sm:btn-sm btn-accent flex-1">Démo</div>
            <div className="btn btn-xs sm:btn-sm btn-outline flex-1">Code</div>
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveArea({
  url,
  label,
  icon: Icon,
  isTouchDevice,
  className,
  children,
}: {
  url?: string;
  label: string;
  icon: React.ElementType;
  isTouchDevice: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    e.stopPropagation();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      className={`relative ${!isTouchDevice ? "cursor-pointer" : ""} ${className || ""}`}
    >
      {children}

      {!isTouchDevice && (
        <div
          className={`absolute bg-base-100/90 backdrop-blur-sm rounded-xl pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 flex flex-row items-center gap-2 text-xs sm:text-sm font-semibold p-2 z-30 shadow-xl border border-base-content/10 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        >
          <span>{label}</span>
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  total,
  isExpanded,
  isTouchDevice,
  rect,
  offset,
}: {
  project: Project;
  index: number;
  total: number;
  isExpanded: boolean;
  isTouchDevice: boolean;
  rect: Rect;
  offset: { x: number; y: number };
}) {
  const centerIndex = (total - 1) / 2;
  const cardOffset = index - centerIndex;
  const restRotate = cardOffset * (isTouchDevice ? 0 : 9);
  const restX = offset.x + cardOffset * (isTouchDevice ? 0 : 14);

  const handleOpen = (url?: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="card bg-base-100 border border-base-content/15 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between absolute"
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        transformOrigin: "bottom center",
      }}
      initial={false}
      animate={
        isExpanded
          ? { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 10 + index }
          : { x: restX, y: offset.y, rotate: restRotate, scale: 0.95, zIndex: index + 1 }
      }
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22,
        delay: isExpanded ? index * 0.03 : 0,
      }}
    >
      <InteractiveArea
        url={project.demoUrl}
        label="Voir démo"
        icon={ArrowRight}
        isTouchDevice={isTouchDevice}
        className="h-36 sm:h-44 md:h-48 overflow-hidden bg-base-200 group border-b border-base-content/10 shrink-0"
      >
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </InteractiveArea>

      <InteractiveArea
        url={project.githubUrl}
        label="Code source"
        icon={CodeXml}
        isTouchDevice={isTouchDevice}
        className="card-body p-3.5 sm:p-5 select-none flex-1 flex flex-col justify-between"
      >
        <div>
          <h3 className="card-title text-base sm:text-lg font-bold">{project.title}</h3>
          <p className="text-xs sm:text-sm opacity-80 mt-1 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 my-2.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="badge badge-xs sm:badge-sm badge-outline font-medium opacity-75 bg-accent text-base-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {isTouchDevice && (
          <div className="flex gap-2 pt-2 mt-auto z-20 relative">
            {project.demoUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen(project.demoUrl);
                }}
                className="btn btn-xs sm:btn-sm btn-accent flex-1 flex items-center justify-center gap-1 font-semibold"
              >
                <span>Démo</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            )}
            {project.githubUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen(project.githubUrl);
                }}
                className="btn btn-xs sm:btn-sm btn-outline flex-1 flex items-center justify-center gap-1 font-semibold"
              >
                <span>Code</span>
                <CodeXml className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            )}
          </div>
        )}
      </InteractiveArea>
    </motion.div>
  );
}

export function DivMessage({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 hidden lg:block select-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMinYMin slice"
        fill="none"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--a))" stopOpacity="0.8" />
            <stop offset="33%" stopColor="hsl(var(--a))" stopOpacity="0.5" />
            <stop offset="66%" stopColor="hsl(var(--a))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--a))" stopOpacity="0" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <path
            id="text-path-guide"
            d="M 28,15 V 190 Q 28,260 98,260 H 580"
            fill="none"
          />
        </defs>

        <path
          d="M 28,15 V 190 Q 28,260 98,260 H 580"
          stroke="hsl(var(--a))"
          strokeWidth="3"
          filter="url(#glow)"
          className="opacity-40"
        />

        <path
          d="M 28,15 V 190 Q 28,260 98,260 H 580"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        <circle cx="28" cy="15" r="4" fill="hsl(var(--a))" />
        <circle cx="28" cy="15" r="8" fill="hsl(var(--a))" className="animate-ping opacity-30" />

        <text
          className="font-mono text-xs uppercase tracking-[0.2em] font-black"
          fill="none"
          stroke="hsl(var(--b1))"
          strokeWidth="6"
          strokeLinejoin="round"
        >
          <textPath href="#text-path-guide" startOffset="10px">
            {message}
          </textPath>
        </text>

        <text className="font-mono text-xs uppercase tracking-[0.2em] font-bold drop-shadow-md text-accent fill-current">
          <textPath href="#text-path-guide" startOffset="10px">
            {message}
          </textPath>
        </text>
      </svg>
    </div>
  );
}