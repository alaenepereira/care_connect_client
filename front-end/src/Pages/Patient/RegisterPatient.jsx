import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './RegisterPatient.css'; // Importe seu arquivo CSS para manter a estilização

function RegisterPatient() {
  // `useParams` obtém o ID do paciente da URL, se ele existir.
  const { id } = useParams();
  // `useNavigate` é usado para redirecionar o usuário após salvar.
  const navigate = useNavigate();
  // `isEditing` é um booleano que determina se estamos editando ou cadastrando.
  const [isEditing, setIsEditing] = useState(!!id);
  // `formData` armazena os dados do formulário, inicializado com campos vazios.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateBirth: '',
  });

  // `useEffect` é usado para carregar os dados do paciente, mas apenas no modo de edição.
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // Modo de edição: faz uma requisição GET para buscar o paciente pelo ID.
        const response = await api.get(`/patient/listId/${id}`);
        // Carrega os dados do paciente no estado do formulário.
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          // Converte a data para o formato 'YYYY-MM-DD' para o input de data do HTML.
          dateBirth: new Date(response.data.dateBirth).toISOString().split('T')[0],
        });
      } catch (error) {
        console.error('Erro ao carregar os dados do paciente:', error);
        alert('Erro ao carregar paciente.');
        navigate('/list-patient');
      }
    };

    if (isEditing) {
      fetchPatient();
    }
  }, [id, isEditing, navigate]);

  // `handleChange` atualiza o estado do formulário em cada digitação do usuário.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // `handleSubmit` gerencia o envio do formulário, fazendo um POST para criar ou um PUT para editar.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Modo de edição: faz uma requisição PUT para atualizar o paciente.
        await api.put(`/patient/update/${id}`, formData);
        alert('Paciente atualizado com sucesso!');
      } else {
        // Modo de cadastro: faz uma requisição POST para criar um novo paciente.
        await api.post('/patient/create', formData);
        alert('Paciente cadastrado!');
      }
      navigate('/list-patient'); // Redireciona para a lista após o sucesso.
    } catch (error) {
      console.error('Erro ao processar:', error.response.data);
      alert('Erro ao salvar. Verifique os dados.');
    }
  };

  return (
    <div className="register-patient-container">
      <div className="register-patient-card">
        {/* O título muda dinamicamente baseado no modo (cadastro ou edição) */}
        <h1>{isEditing ? 'Editar Paciente' : 'Cadastro de Paciente'}</h1>
        <form onSubmit={handleSubmit}>
          {/* O formulário permanece com os mesmos inputs, ligados ao `formData`. */}
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dateBirth">Data de Nascimento:</label>
            <input type="date" id="dateBirth" name="dateBirth" value={formData.dateBirth} onChange={handleChange} required />
          </div>
          {/* O texto do botão muda dinamicamente. */}
          <button type="submit">{isEditing ? 'Salvar Edição' : 'Cadastrar'}</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPatient;