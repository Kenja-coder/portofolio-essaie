import { useState } from "react";
import { MailPlus,Code2 } from "lucide-react";

function Home() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const imageSrc = "/src/assets/img.png";

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center ">
      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16 p-5 rounded-md border-accent border-b-5 border-l-5">
        
        {/* Colonne de gauche : Présentation & Appel à l'action */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          
          {/* Badge de disponibilité */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Disponible pour vos projets
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-base-content leading-tight">
            Bonjour, je suis <br />
            <span className="text-accent bg-clip-text">YBVLAD</span>
          </h1>
          
          {/* Paragraphe descriptif */}
          <p className="text-base sm:text-lg text-base-content/80 max-w-xl leading-relaxed">
            Développeur passionné & étudiant en <span className="text-base-content font-semibold">Génie Logiciel</span>. Je conçois des applications web modernes, fluides et performantes.
          </p>

          {/* Badges de technologies clés */}
          <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start">
            <span className="badge badge-outline gap-1 text-xs py-2 px-3">
              <Code2 className="w-3.5 h-3.5" /> Full-Stack
            </span>
            <span className="badge badge-outline text-xs py-2 px-3">React / Tailwind</span>
            <span className="badge badge-outline text-xs py-2 px-3">PHP / MySQL</span>
          </div>

          {/* Bouton d'action */}
          <div className="pt-2 w-full sm:w-auto">
            <a 
              href="#contact" 
              className="btn btn-accent btn-lg w-full sm:w-fit gap-3 shadow-lg shadow-accent/20 hover:scale-105 transition-all duration-300"
            >
              <MailPlus className="w-5 h-5" />
              Contactez-moi
            </a>
          </div>

        </div>

        {/* Colonne de droite : Image interactive grande taille */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-full max-w-md lg:max-w-lg aspect-4/5">
            <figure 
              className="relative w-full h-full overflow-hidden cursor-pointer rounded-3xl"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                WebkitMaskImage: "radial-gradient(ellipse at center, black 55%, transparent 75%)",
                maskImage: "radial-gradient(ellipse at center, black 55%, transparent 75%)"
              }}
            >
              {/* 1. Image en Noir & Blanc */}
              <img 
                src={imageSrc} 
                alt="Portrait YBVLAD"
                className="w-full h-full object-cover grayscale block"
              />

              {/* 2. Image en couleur avec expansion dynamique */}
              <img 
                src={imageSrc} 
                alt="Portrait YBVLAD Couleur"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-[clip-path] duration-1000 ease-out"
                style={{
                  clipPath: isHovered 
                    ? `circle(150% at ${mousePos.x}% ${mousePos.y}%)` 
                    : `circle(0% at ${mousePos.x}% ${mousePos.y}%)`
                }}
              />
            </figure>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Home;