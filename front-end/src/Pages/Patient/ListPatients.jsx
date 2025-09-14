import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importação do hook de navegação
import api from '../../services/api';
import './ListPatients.css';

function ListPatients() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook de navegação

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/patient/listAll');
        // Adiciona uma verificação para garantir que a resposta é um array
        if (response.data && Array.isArray(response.data)) {
          setPatients(response.data);
        } else {
          // Se a resposta não for um array válido, define a lista como vazia
          setPatients([]);
          console.error('Resposta da API não contém um array de pacientes.');
        }
      } catch (error) {
        // Loga o erro completo para depuração
        console.error('Erro ao buscar pacientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Garante que patients é um array antes de filtrar
  const filteredPatients = (patients || []).filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEdit = (id) => {
    // Redireciona para a rota de edição, passando o ID do paciente na URL
    navigate(`/edit-patient/${id}`);
  };

  const handleDelete = async (id) => {
    // Pede uma confirmação antes de deletar
    if (window.confirm('Tem certeza que deseja excluir este paciente? Esta ação não pode ser desfeita.')) {
      try {
        // Faz uma requisição DELETE para a rota do backend
        // Lembre-se que o seu backend usa '/delete'
        await api.delete(`/patient/delete/${id}`);
        
        // Atualiza o estado para remover o paciente deletado
        // Isso faz a lista no frontend ser atualizada sem recarregar a página
        setPatients(patients.filter(patient => patient.id !== id));
        
        alert('Paciente deletado com sucesso!');
  
      } catch (error) {
        console.error('Erro ao deletar o paciente:', error.response.data);
        alert('Erro ao deletar. Verifique o servidor.');
      }
    }
  };

  if (loading) {
    return <div>Carregando pacientes...</div>;
  }
  
  return (
    <div className="list-patients-container">
      <h1>Lista de Pacientes</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="patients-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Renderiza as linhas da tabela apenas se houver pacientes */}
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>
                  <button onClick={() => handleEdit(patient.id)} className="action-button edit">✏️</button>
                  <button onClick={() => handleDelete(patient.id)} className="action-button delete">🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Nenhum paciente encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListPatients;