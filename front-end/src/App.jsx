import './App.css'
import React, { Children, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/Login'
import ForgotPasswordPage from './Pages/Login/ForgotPassword'
import { Navigate } from 'react-router-dom'
import Register from './Components/Register'
import Header from './Components/Header'
import Home from './Pages/home/index.jsx'
import BottomNav from './Components/Button/BottomNav'
import Dashboard from './Pages/Dashboard'
import RegisterPatient from './Pages/Patient/RegisterPatient.jsx';
import ListPatients from './Pages/Patient/ListPatients.jsx'; 
import AppointmentsScreen from './AppointmentsScreen/AppointmentsScreen.jsx'
import {HeaderProfessional, AppCreate, ProfessionalList} from './personal/personal.jsx';
import BackButton from './utils/BackButton.jsx'




function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () =>{
    setIsAuthenticated(true)
  };

  const PrivateRoute = ({children}) =>{
    return isAuthenticated ? children : <Navigate to="/login" />
  }
  return(
    <BrowserRouter>
  
    <Routes>
        
      <Route path='/' element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}></Route>
      <Route path='/login' element={<LoginPage onLogin={handleLogin}/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/header' element={<Header/>}></Route>

      <Route path='/home' element={<PrivateRoute> <Home /> <BottomNav/></PrivateRoute>}></Route>
       <Route path="/patient/create" element={<PrivateRoute> <RegisterPatient /> <BottomNav/></PrivateRoute>} />
        <Route path="/patient/listAll" element={<PrivateRoute> <ListPatients /> <BottomNav/></PrivateRoute>} />
        <Route path="/edit-patient/:id" element={<RegisterPatient />} />
        <Route path="/professional/listAll" element={<PrivateRoute><HeaderProfessional/> <ProfessionalList /> <BottomNav/> </PrivateRoute> } />
         <Route path="/professional/create" element={<PrivateRoute><HeaderProfessional/> <AppCreate  /> <BottomNav/> </PrivateRoute>} />
         <Route path="/appointments" element={<PrivateRoute><AppointmentsScreen  /> <BottomNav></BottomNav></PrivateRoute>} />
         
          
      
    
      

    </Routes>
    </BrowserRouter>
  )
}

export default App;
