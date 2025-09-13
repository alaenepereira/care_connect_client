import React from "react";
import './style.css'


export default function Header() {

  const userName = localStorage.getItem("userName");

  return (
    <header className="header">
      <div className="header-left">
        <h2>Olá, {userName}!</h2>
        <button className="subscribe-btn">Seja Bem vindo!</button>
      </div>
      <div className="header-right">
        <img src="/src/assets/images/CareConnect.png" alt="Logo" />
      </div>
      
    </header>
  );
}


