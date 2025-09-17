import { useState } from 'react'
import React from 'react'
import './personal.css'
import api from '../services/api'

function HeaderProfessional(){
  return( <h2 className=" header-pr"> Área de Profissionais
 </h2>)
}

//PARA BUSCAR OS PROFISSIONAL
function AppList() {
 const [professional, setProfessional] = useState([])

 async function ListProfessional() {

   try{ const response = await api.get('/professional/listAll')
   setProfessional(response.data.professionalList)
    console.log(response.data.professionalList)
   }
   catch (error) {
   console.error('Erro ao buscar profissionais:', error)
 }
}

return(
 <div>
      <button onClick={ListProfessional}>Buscar Profissionais</button>
   <ul>
     {professional.map((p,index)=>(
       <li key={index} className="list"> {p.name}</li>
     ))}
   </ul>
 </div>
)
     }
  //FUNÇAO PARA CADASTRAR O PROFISSIONAL
    function AppCreate() {
       const [newProfessional, setNewProfessional] = useState({
         name: '',
         email: '',
         phone: '',
         specialty: ''
       });
       async function CreateProfessional() {
         try {
           const response = await api.post('/professional/create', {
             name: newProfessional.name,
             email: newProfessional.email,
             phone: newProfessional.phone,
             specialty: newProfessional.specialty,
           });
           console.log('Profissional cadastrado com sucesso:', response.data);
         } catch (error) {
           console.log("Erro ao se cadastrar",error);
         }
       }
     
       return (
         <div className="createList">
           <label> Nome:</label>
           <input
             type="text"
             placeholder="Nome"
             value={newProfessional.name}
             onChange={e => setNewProfessional({ ...newProfessional, name: e.target.value })}
           />
         
           <label> Email:</label>
           <input
             type="email"
             placeholder="Email"
             value={newProfessional.email}
             onChange={e => setNewProfessional({ ...newProfessional, email: e.target.value })}
           />
           <label>Telefone:</label>
            <input
            type="text"
            placeholder="Telefone"
            value={newProfessional.phone}
            onChange={e => setNewProfessional({ ...newProfessional, phone: e.target.value })}
            />
          
           <label> Especialização:
           </label>
           <input
             type="text"
             placeholder="Especialização"
             value={newProfessional.specialty}
             onChange={e => setNewProfessional({ ...newProfessional, specialty: e.target.value })}/>
           <button type="submit" onClick={CreateProfessional}>Cadastrar Profissional</button>
         </div>
       );
     }
     //FUNÇAO PARA  BUSCAR O PROFISSIONAL POR ID
     function AppId() {
      const [professionalId, setProfessionalId] = useState('');
      const [professionalData, setProfessionalData] = useState(null);
      const [error, setError] = useState('');
    
      async function ListProfessionalId() {
        try {
          const response = await api.get(`/professional/listId/${professionalId.trim()}`);
          setProfessionalData(response.data);
          setError('');
        } catch (error) {
          console.error('Erro ao buscar profissional:', error);
          setError('Profissional não encontrado ou erro na requisição');
          setProfessionalData(null)
          
        }
      }
    
      return (
        <div>
          <label>Qual profissional você quer? </label>
          <input
            type="text"
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
          />
          <button  typ="submit" onClick={ListProfessionalId} className="botao-id">Buscar</button>
    
          {error && <p>{error}</p>}
    
          {professionalData && (
            <div style={{ marginTop: '10px' }}>
              <p><strong>Nome:</strong> {professionalData.name}</p>
              <p><strong>Email:</strong> {professionalData.email}</p>
              <p><strong>Telefone:</strong> {professionalData.phone}</p>
              <p><strong>Especialização:</strong> {professionalData.specialty}</p>
            </div>
          )}
        </div>
      );
    }

  
    function AppUpdate() {
      const [personalId2, setPersonalId2] = useState('');
      const [newProfessional2, setNewProfessional2] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: ''
      });
      const [message, setMessage] = useState('');
    
      async function UpdateProfissionais() {
        try {
          const response = await api.put(
            `/professional/update/${personalId2}`,
            {
              name: newProfessional2.name,
              email: newProfessional2.email,
              phone: newProfessional2.phone,
              specialty: newProfessional2.specialty
            }
          );
          console.log('Profissional atualizado:', response.data);
          setMessage('Profissional atualizado com sucesso!');
        } catch (error) {
          console.error('Erro ao atualizar os dados:', error);
          setMessage('Erro ao atualizar o profissional.');
        }
      }
    
      return (
        <div>
          <h3>Atualizar Profissional</h3>
    
          <label>ID do profissional: </label>
          <input
            type="text"
            value={personalId2}
            onChange={(e) => setPersonalId2(e.target.value)}
          />
    
    
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Nome"
            value={newProfessional2.name}
            onChange={(e) =>
              setNewProfessional2({ ...newProfessional2, name: e.target.value })
            }
          />
      
          <label>Email:</label>
          <input
            type="email"
            value={newProfessional2.email}
            onChange={(e) =>
              setNewProfessional2({ ...newProfessional2, email: e.target.value })
            }
          />
     
    
          <label>Telefone:</label>
          <input
            type="text"
            value={newProfessional2.phone}
            onChange={(e) =>
              setNewProfessional2({ ...newProfessional2, phone: e.target.value })
            }
          />
     
    
          <label>Especialização:</label>
          <input
            type="text"
            value={newProfessional2.specialty}
            onChange={(e) =>
              setNewProfessional2({
                ...newProfessional2,
                specialty: e.target.value
              })
            }
          />
  
    
          <button onClick={UpdateProfissionais}>Atualizar Profissional</button>
    
          {message && <p>{message}</p>}
        </div>
      );
    }
    
    
    

    export { AppId,AppUpdate };
     
export {HeaderProfessional,AppList,AppCreate};
