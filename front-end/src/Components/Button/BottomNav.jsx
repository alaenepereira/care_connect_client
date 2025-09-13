import "./BottomNav.css";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/login"><img src="/src/assets/images/icons-login.png"  alt="login" /></NavLink>
      <NavLink to="/home">🏠 Inicio</NavLink>
      <NavLink to="/patient">🩺 Pacientes</NavLink>
      <NavLink to="/professional">👤 Profissionais</NavLink>
      <NavLink to="/appointment">📅 Consultas</NavLink>
    </nav>
  );
}
