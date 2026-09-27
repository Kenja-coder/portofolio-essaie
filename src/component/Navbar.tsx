import { useState } from "react";
import { Container, Menu, X, Sun, Moon } from "lucide-react";

interface NavProps {
  theme: string;
  toggleTheme: () => void;
}

function Navbar({ theme, toggleTheme }: NavProps) {
  // État pour ouvrir/fermer le menu mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between border-b-4 border-accent rounded-3xl bg-base-100 p-3 mx-4 md:mx-20 my-5 z-50">
      {/* 1. Logo */}
      <a href="#" className="flex items-center font-bold text-xl md:text-2xl">
        <Container className="mr-2 text-accent" />
        YBVLAD- <span className="text-accent ml-1">CODER</span>
      </a>

      {/* 2. Navigation Menu (Desktop + Dropdown Mobile) */}
      <nav
        className={`
          /* Style Mobile (Dropdown) */
          ${isOpen ? "flex" : "hidden"}
          flex-col absolute right-0 top-16 w-56 bg-base-100 p-4 rounded-2xl shadow-2xl border border-accent/20 gap-2
          
          /* Reset Style Desktop (md:) */
          md:flex md:flex-row md:static md:w-auto md:bg-transparent md:p-0 md:shadow-none md:border-none md:gap-2
        `}
      >
        <a href="#" className="btn btn-ghost btn-sm justify-start md:justify-center md:btn-accent">Accueil</a>
        <a href="#" className="btn btn-ghost btn-sm justify-start md:justify-center md:btn-accent">À propos</a>
        <a href="#" className="btn btn-ghost btn-sm justify-start md:justify-center md:btn-accent">Expériences</a>
        <a href="#" className="btn btn-ghost btn-sm justify-start md:justify-center md:btn-accent">Projets</a>
      </nav>

      {/* 3. Zone d'actions (Bouton Thème + Bouton Burger sur Mobile) */}
      <div className="flex items-center gap-2">
        {/* Toggle Dark/Light Mode */}
        <button
          onClick={toggleTheme}
          aria-label="Changer de thème"
          className="btn btn-ghost btn-circle text-base-content hover:bg-base-content/10 transition-all"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>

        {/* Bouton Burger (Visible uniquement sur mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden btn btn-soft btn-accent btn-square"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;