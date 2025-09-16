import { useState, useEffect, useRef } from "react";
import { Link} from "react-router-dom";
import { FaHome, FaUser, FaUserMd, FaCalendarCheck } from "react-icons/fa";
import "./BottomNav.css";

export default function BottomNavbar() {
  const [submenu, setSubmenu] = useState(null); 
  const submenuRef = useRef(null);



const routeMap = {
  pacientes: "patient",
  profissionais: "professional",
  consultas: "appointments",
};


  function toggleSubmenu(menu) {
    setSubmenu(submenu === menu ? null : menu);
  }

   useEffect(() => {
    function handleClickOutside(event) {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setSubmenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 

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
          to={`/${routeMap[submenu]}/update/:id`}
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
