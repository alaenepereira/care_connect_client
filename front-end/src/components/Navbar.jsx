import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li className="dropdown">
          <Link to="#" className="dropbtn">
            Paciente
          </Link>
          <div className="dropdown-content">
            <Link to="/register-patient">Cadastro</Link>
            <Link to="/list-patient">Listar</Link>            
          </div>
        </li>

        <li className="dropdown">
          <Link to="#" className="dropbtn">
            Profissional
          </Link>
          <div className="dropdown-content">
            <Link to="/register-professional">Cadastro</Link>
            <Link to="/list-professional">Listar</Link>
            <Link to="/delete-professional">Deletar</Link>
          </div>
        </li>

        <li className="dropdown">
          <Link to="#" className="dropbtn">
            Consultas
          </Link>
          <div className="dropdown-content">
            <Link to="/create-appointment">Cadastro</Link>
            <Link to="/list-appointment">Listar</Link>
            <Link to="/delete-appointment">Deletar</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;