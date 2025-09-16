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
import React, { Children, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/Login'
import ForgotPasswordPage from './Pages/Login/ForgotPassword'
import { Navigate } from 'react-router-dom'
import Register from './Components/Register'
import Header from './Components/Header'
import Home from './Pages/home'
import BottomNavbar from './Components/Button/BottomNav'
import Dashboard from './Pages/Dashboard'



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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () =>{
    setIsAuthenticated(true)
  };

  const PrivateRoute = ({children}) =>{
    return isAuthenticated ? children : <Navigate to="/login" />
  }
  return(
    <BrowserRouter>
    <BottomNavbar/>
    <Routes>
      <Route path='/' element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}></Route>
      <Route path='/login' element={<LoginPage onLogin={handleLogin}/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}></Route>
      <Route path='/home' element={<Home />}></Route>
       <Route path='/header' element={<Header/>}></Route>
         <Route path='/dashboard' element={<Dashboard/>}></Route>
       {/* <Route path='/professional' element={<ProfessionalPage/>}></Route> */}

    </Routes>
    </BrowserRouter>
  )
}

export default App;