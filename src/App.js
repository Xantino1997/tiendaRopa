import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import EnConst from "./componentes/EnConst"; 

function App() {
  const getCurrentSeason = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    if ((month === 12 && day >= 21) || month < 3 || (month === 3 && day <= 20)) return "verano";
    if ((month === 3 && day >= 21) || month < 6 || (month === 6 && day <= 20)) return "otoño";
    if ((month === 6 && day >= 21) || month < 9 || (month === 9 && day <= 20)) return "invierno";
    return "primavera";
  };

  const [seasonMode, setSeasonMode] = useState(getCurrentSeason());
  const [displayedSeason, setDisplayedSeason] = useState(getCurrentSeason());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const seasonStyles = {
    otoño: "theme-fall",
    invierno: "theme-winter",
    primavera: "theme-spring",
    verano: "theme-summer",
    liquidacion: "theme-liquidacion",
    todo: "theme-all",
  };

  const seasonContent = {
    otoño: {
      title: "Colección Otoño 2025 🍂",
      subtitle: "Viste el otoño con estilo",
      description: "Colores cálidos, tejidos suaves y la moda que más te abriga.",
      image: "/background-images/oton.png",
    },
    invierno: {
      title: "Colección Invierno 2025 ❄️",
      subtitle: "El frío nunca se sintió tan bien",
      description: "Tapados, bufandas, y todo lo que necesitás para combatir el frío.",
      image: "/background-images/invierno.png",
    },
    primavera: {
      title: "Colección Primavera 2025 🌸",
      subtitle: "Renová tu look",
      description: "Flores, frescura y colores vivos para florecer con estilo.",
      image: "/background-images/primavera.png",
    },
    verano: {
      title: "Colección Verano 2025 ☀️",
      subtitle: "Luce el verano",
      description: "Ropa liviana, colores vibrantes y outfits para el calor.",
      image: "/background-images/verano.png",
    },
    liquidacion: {
      title: "Liquidación Final 🔥",
      subtitle: "Descuentos irresistibles",
      description: "Stock limitado. ¡Últimas unidades a precios de locura!",
      image: null,
    },
    todo: {
      title: "Colección Anual 👗",
      subtitle: "Explorá todo el año en un solo lugar",
      description: "Estilos para cada estación rotando automáticamente.",
      image: null,
    },
  };

  useEffect(() => {
    if (seasonMode === "todo") {
      const estaciones = ["otoño", "invierno", "primavera", "verano"];
      let index = 0;
      setDisplayedSeason(estaciones[index]);

      const id = setInterval(() => {
        index = (index + 1) % estaciones.length;
        setDisplayedSeason(estaciones[index]);
      }, 4000);

      setIntervalId(id);

      return () => clearInterval(id);
    } else {
      setDisplayedSeason(seasonMode);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [seasonMode]);

  const ContentButtons = () => (
    <div className="button-group">
      <a href="https://wa.me/5493462529718?text=Hola%20estuve%20pispeando%20algo%20de%20la%20tienda%20y%20me%20gustaria%20saber%20algo%20mas%20sobre%20eso" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        Contactar por WhatsApp
      </a>
      <a href="/catalogo.pdf" className="catalog-button" target="_blank" rel="noopener noreferrer">
        Ver catálogo completo
      </a>
    </div>
  );

  const Home = () => {
    const content = seasonContent[displayedSeason] || {};
    return (
      <div className={`main-content ${seasonStyles[displayedSeason]}`} style={{
        backgroundImage: content.image ? `url(${content.image})` : "none",
      }}>
        <div className="content-box">
          <h1>{content.title}</h1>
          <h2>{content.subtitle}</h2>
          <p>{content.description}</p>
          <ContentButtons />
        </div>
      </div>
    );
  };

  const Tienda = () => (
    <div className={`main-content ${seasonStyles[displayedSeason]}`}>
      <div className="content-box">
        <h1>Catálogo de productos</h1>
        <p>Encontrá lo último en moda para {displayedSeason}</p>
        <ContentButtons />
      </div>
    </div>
  );
  const Venta = () => (
    <div className={`main-content ${seasonStyles[displayedSeason]}`}>
      <div className="content-box">
        <h1>Catálogo de productos</h1>
        <p>Encontrá lo último en moda para {displayedSeason}</p>
        <ContentButtons />
      </div>
    </div>
  );

  const Login = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
      if (user === "admin" && pass === "tienda2025") {
        setIsAuthenticated(true);
        navigate("/admin");
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    };

    return (
      <div className="login-form">
        <input placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button onClick={handleLogin}>Ingresar</button>
      </div>
    );
  };

  const Admin = () => {
    const navigate = useNavigate();

    if (!isAuthenticated) return <EnConst />;

    const handleLogout = () => {
      setIsAuthenticated(false);
      navigate("/");
    };

    return (
      <div className={`admin-panel ${seasonMode === "todo" ? "admin-all-theme" : ""}`}>
        <h2>Panel Admin</h2>
        <select value={seasonMode} onChange={(e) => setSeasonMode(e.target.value)}>
          <option value="otoño">Otoño</option>
          <option value="invierno">Invierno</option>
          <option value="primavera">Primavera</option>
          <option value="verano">Verano</option>
          <option value="todo">Todo el año</option>
          <option value="liquidacion">Liquidación</option>
        </select>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  };

  return (
    <Router>
      <nav className={`navbar ${seasonStyles[displayedSeason]}`}>
        <Link to="/">Tienda Online</Link>
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <Link to="/tienda" onClick={() => setIsMenuOpen(false)}>Tienda</Link>
          <Link to="/venta" onClick={() => setIsMenuOpen(false)}>Venta</Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
          {isAuthenticated && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>}
        </div>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/venta" element={<Venta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <EnConst />} />
        <Route path="/*" element={<EnConst />} />
      </Routes>
    </Router>
  );
}

export default App;
