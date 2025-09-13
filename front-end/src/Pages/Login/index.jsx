import { useState } from "react";
import { useNavigate, Link} from 'react-router-dom'
import validateEmail from "../../utils/validateEmail";
import './style.css'
import api from "../../Services/api";


export default function LoginPage({onLogin}){

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

 


  const handleSubmit = async (e) =>{
    e.preventDefault()

     validateEmail(email);

    if (!validateEmail(email)) {
      alert("Digite um e-mail válido")
      return;
    }

    try {
    const userData =  await api.post('/user/login', {
        email,
        password
      })
    localStorage.setItem("userName", userData.data.name);
      onLogin()
      navigate(`/home`)
    } catch (err) {
      console.log(err)
      alert("usuário não autenticado")
    }
    
  }

  return(
    <div className="login-container">
      <div className="login-box">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="input-field">
    <input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br /> <br />
    <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </div> <br />
      <Link to= "/forgot-password" className="password">Esqueceu a senha?</Link>
      <br /> <br />

      <button className="enter" type="submit">Entrar</button>

      <div className="signup-link">
        <p>
          Não tem uma conta? <br /> <br />
           <a href="/register">Registre-se</a>
        </p>
      </div>
    </form>
    </div>
    </div>
  )
  
}
