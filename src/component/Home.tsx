import { useState } from "react";
import { MailPlus, Code2, BookOpen, Laptop } from "lucide-react";

function Home() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const imageSrc = "/src/assets/img.png";

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 p-6 md:p-10 rounded-3xl border-b-4 border-l-4 border-accent bg-base-100 overflow-hidden">
        
        {/* Blocs de Texte (Arrière-plan sur Mobile, Côtés sur Desktop) */}
        
        {/* 1. Bloc de gauche : DESIGNER */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left space-y-4 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-medium border border-accent/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Disponible pour vos projets
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-base-content uppercase">
            &lt;Coder&gt;
          </h1>

          <p className="text-sm sm:text-base text-base-content/80 max-w-xs leading-relaxed">
            Passionné de code, d'automatisation & systèmes visuels. Je conçois des interfaces élégantes et intuitives Bref j'aime le developpement.
          </p>

          <div className="hidden md:flex flex-wrap gap-2 pt-2">
            <span className="badge badge-outline text-xs py-2 px-3">UI / UX</span>
            <span className="badge badge-outline text-xs py-2 px-3">Branding</span>
            <span className="badge badge-outline gap-1 text-xs py-2 px-3">
              <Code2 className="w-3.5 h-3.5" /> Full-Stack
            </span>
            <span className="badge badge-outline text-xs py-2 px-3">React / Tailwind</span>
            <span className="badge badge-outline text-xs py-2 px-3">PHP / MySQL</span>
          </div>
        </div>

        {/* 2. Image Centrale Superposée (Au Premier Plan) */}
        <div className="w-full md:w-1/3 flex items-center justify-center z-20 -my-4 md:my-0">
          <div className="relative w-64 sm:w-72 md:w-full max-w-sm aspect-4/5">
            <figure 
              className="relative w-full h-full overflow-hidden cursor-pointer rounded-3xl"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
              onTouchMove={handleTouchMove}
              style={{
                WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 80%)",
                maskImage: "radial-gradient(ellipse at center, black 60%, transparent 80%)"
              }}
            >
              {/* Image Noir & Blanc */}
              <img 
                src={imageSrc} 
                alt="Portrait YBVLAD"
                className="w-full h-full object-cover grayscale block"
              />

              {/* Image Couleur au survol / touch */}
              <img 
                src={imageSrc} 
                alt="Portrait YBVLAD Couleur"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-[clip-path] duration-300 ease-out"
                style={{
                  clipPath: isHovered 
                    ? `circle(120% at ${mousePos.x}% ${mousePos.y}%)` 
                    : `circle(0% at ${mousePos.x}% ${mousePos.y}%)`
                }}
              />
            </figure>
          </div>
        </div>

        {/* 3. Bloc de droite : CODER */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right space-y-4 z-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-accent font-mono">
            <span className="flex flex-row justify-between"><BookOpen/> <Laptop/></span>
            Etudiant
          </h1>

          <p className="text-sm sm:text-base text-base-content/80 max-w-xs leading-relaxed">
            Étudiant en <span className="font-semibold text-base-content">Génie Logiciel</span>. Cycle ingenieur synonyme de serieux de logique er de dicipline.
          </p>

          <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-end">
            <span className="badge badge-outline gap-1 text-xs py-2 px-3">
               Full-Stack
            </span>
            <span className="badge badge-outline text-xs py-2 px-3">project scolaire</span>
            <span className="badge badge-outline text-xs py-2 px-3">Travail de groupe</span>
            <span className="badge badge-outline text-xs py-2 px-3">mathematique</span>
          </div>

          <div className="pt-3 w-full sm:w-auto">
            <a 
              href="#contact" 
              className="btn btn-accent btn-md md:btn-lg w-full sm:w-fit gap-2 shadow-lg shadow-accent/20 hover:scale-105 transition-all duration-300"
            >
              <MailPlus className="w-5 h-5" />
              Contactez-moi
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Home;