// import "./BottomNav.css";
// import { NavLink } from "react-router-dom";

// export default function BottomNav() {
//   return (
//     <nav className="bottom-nav">
//       <NavLink to="/login"><img src="/src/assets/images/icons-login.png"  alt="login" /></NavLink>
//       <NavLink to="/home" >🏠 Inicio</NavLink>
//       <NavLink to="/patient">🩺 Pacientes</NavLink>
//       <NavLink to="/professional">👤 Profissionais</NavLink>
//       <NavLink to="/appointment">📅 Consultas</NavLink>
//     </nav>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaUserMd, FaCalendarCheck } from "react-icons/fa";
import "./BottomNav.css";

export default function BottomNavbar() {
  const [submenu, setSubmenu] = useState(null); 


const routeMap = {
  pacientes: "patients",
  profissionais: "professional",
  consultas: "appointments",
};


  function toggleSubmenu(menu) {
    setSubmenu(submenu === menu ? null : menu);
  }

  return (
    <div className="navbar">
      <Link to="/" className="nav-item">
        <FaHome /> <span>Início</span>
      </Link>

      
      <div className="nav-item" onClick={() => toggleSubmenu("pacientes")}>
        <FaUser /> <span>Pacientes</span>
      </div>

     
      <div className="nav-item" onClick={() => toggleSubmenu("profissionais")}>
        <FaUserMd /> <span>Profissionais</span>
      </div>

     
      <div className="nav-item" onClick={() => toggleSubmenu("consultas")}>
        <FaCalendarCheck /> <span>Consultas</span>
      </div>

      
    
{submenu && (
  <div className="submenu">
    <h3>{submenu.toUpperCase()}</h3>
    <ul>
      <li>
        <Link
          to={`/${routeMap[submenu]}/listAll`}
          onClick={() => setSubmenu(null)}
        >
          Listar
        </Link>
      </li>
      <li>
        <Link
          to={`/${routeMap[submenu]}/create`}
          onClick={() => setSubmenu(null)}
        >
          Cadastrar
        </Link>
      </li>
      <li>
        <Link
          to={`/${routeMap[submenu]}/update`}
          onClick={() => setSubmenu(null)}
        >
          Editar
        </Link>
      </li>
      <li>
        <Link
          to={`/${routeMap[submenu]}/delete`}
          onClick={() => setSubmenu(null)}
        >
          Excluir
        </Link>
      </li>
    </ul>
  </div>
)}

    </div>
  );
}
