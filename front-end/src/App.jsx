import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// Corrigindo o caminho para a página Home
import Home from './Pages/Home.jsx';
// Corrigindo o caminho para a página de Cadastro de Paciente
import RegisterPatient from './Pages/Patient/RegisterPatient.jsx';
// Importando a nova página de listagem
import ListPatients from './Pages/Patient/ListPatients.jsx'; 
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/list-patient" element={<ListPatients />} />
        <Route path="edit-patient/:id" element={<RegisterPatient />} />
      </Routes>
    </Router>
  );
}

export default App;