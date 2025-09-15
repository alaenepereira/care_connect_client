import { useState } from "react"; 
import './style.css'
import api from "../../Services/api";
 import { useNavigate } from "react-router-dom";



export default function Register() {

   const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ confirmPassword, setConfirmPassword] = useState('');
  const [ CPF, setCpf] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(  name,
        email,
        CPF,
        password)
    if (!name || !email || !CPF || !password || !confirmPassword ) {
       alert("Preencha todos os campos.");
      return;
    }

   
    if (password !== confirmPassword) {
       alert("As senhas não coincidem.");
      return;
    }

    try {
      await api.post('/user/register', {
        name,
        email,
        CPF,
        password
      })

      alert("Cadastro realizado com sucesso!")
      navigate("/login")

    } catch (error) {
      console.log(error)
      alert("Erro ao cadastrar o usuário")
    }
  };

  return(
    <div className="register-container">
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto"}}>

        <label>Nome
          <input type="text" value={name}
          onChange={(e) => setName(e.target.value)} />
        </label>

        <label> E-mail
          <input type="email" value={email}
           onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label> CPF
          <input type="text" value={CPF}
          onChange={(e) => setCpf(e.target.value)} />
        </label>

        <label>Senha 
          <input type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label> Confirmar senha
          <input type="password" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>

        <button type="submit" style={{marginTop: "10px"}}> Cadastre-se</button>
      </form>
    </div>
  )
  
}