import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './style.css';
import validateEmail from "../../utils/validateEmail";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

 validateEmail(email)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Digite um e-mail válido.");
      return;
    }

    setSent(true);
    setTimeout(() => navigate("/"), 3000); 
  };

  return (
    <div className="forgot-container">
        <div className="login-box-pass">
      <form onSubmit={handleSubmit}>
        <h2>Recuperar Senha</h2>

        {!sent ? (
          <>
            <div className="input-field">
              <input
                placeholder="Digite seu e-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div><br />

            <button type="submit">Enviar</button><br /><br />

            <Link to="/login">Voltar para o login</Link>
          </>
        ) : (
          <p>✅ Um link de recuperação foi enviado para seu e-mail.<br />Redirecionando para o login...</p>
        )}
      </form>
    </div>
    </div>
  
  );
}
