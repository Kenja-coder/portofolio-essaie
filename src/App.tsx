import { useState, useEffect } from "react";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import Skill from "./component/Skill";

function App() {
  // 1. Lit la session au démarrage. Si l'onglet vient d'être ouvert, renvoie null -> "dark" par défaut
  const [theme, setTheme] = useState(() => {
    return sessionStorage.getItem("theme") || "dark";
  });

  // 2. Sauvegarde le thème uniquement pour la session en cours
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300 flex flex-col gap-10">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Home />
      <Skill />
    </div>
  );
}

export default App;