import { useState } from 'react'
import axios from 'axios'
import React from 'react'
import './personal.css'

function Cabecalho(){
  return( <h2 className=" cabeçalho"> Área de Profissionais
 </h2>)
}

//PARA BUSCAR OS PROFISSIONAL
function Applist() {
 const [professional, setProfessional] = useState([])

 async function Listprofessional() {

   try{ const response = await axios.get('http://localhost:3000/professional/listAll')
   setProfessional(response.data.professionalList)
    console.log(response.data.professionalList)

   try{ 
    const response = await axios.get('http://localhost:3000/professional/listAll')
   setProfessional(response.data)
    console.log(response.data)
   }
   catch (error) {
   console.error('Erro ao buscar profissionais:', error)
 }
}

return(
 <div>
      <button onClick={Listprofessional}>Buscar Profissionais</button>
   <ul>
     {professional.map((p,index)=>(
       <li key={index} className="list"> {p.name}</li>
     ))}
   </ul>
 </div>
)
     }
  //FUNÇAO PARA CADASTRAR O PROFISSIONAL
    function Appcreate() {
       const [newprofessional, setNewprofessional] = useState({
         name: '',
         email: '',
         phone: '',
         specialty: ''
       });
       async function Createprofessional() {
         try {
           const response = await axios.post('http://localhost:3000/professional/create', {
             name: newprofessional.name,
             email: newprofessional.email,
             phone: newprofessional.phone,
             specialty: newprofessional.specialty,
           });
           console.log('Profissional cadastrado com sucesso:', response.data);
         } catch (error) {
           console.log("Erro ao se cadastrar");
         }
       }
     
       return (
         <div className="createlist">
           <label> Nome:</label>
           <input
             type="text"
             placeholder="Nome"
             value={newprofessional.name}
             onChange={e => setNewprofessional({ ...newprofessional, name: e.target.value })}
           />
         
           <label> Email:</label>
           <input
             type="email"
             placeholder="Email"
             value={newprofessional.email}
             onChange={e => setNewprofessional({ ...newprofessional, email: e.target.value })}
           />
           <label>Telefone:</label>
            <input
            type="text"
            placeholder="Telefone"
            value={newprofessional.phone}
            onChange={e => setNewprofessional({ ...newprofessional, phone: e.target.value })}
            />
          
           <label> Especialização:
           </label>
           <input
             type="text"
             placeholder="Especialização"
             value={newprofessional.specialty}
             onChange={e => setNewprofessional({ ...newprofessional, specialty: e.target.value })}/>
           <button type="submit" onClick={Createprofessional}>Cadastrar Profissional</button>
         </div>
       );
     }
     //FUNÇAO PARA  BUSCAR O PROFISSIONAL POR ID
     function Appid() {
      const [professionalid, setProfessionalid] = useState('');
      const [professionalData, setProfessionalData] = useState(null);
      const [error, setError] = useState('');
    
      async function Listprofessionalid() {
        try {
          const response = await axios.get(`http://localhost:3000/professional/listId/${professionalid.trim()}`);
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
            value={professionalid}
            onChange={(e) => setProfessionalid(e.target.value)}
          />
          <button  typ="submit" onClick={Listprofessionalid} className="botaoid">Buscar</button>
    
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

  
    function Appupdate() {
      const [personalid2, setPersonalid2] = useState('');
      const [newProfessional2, setNewProfessional2] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: ''
      });
      const [message, setMessage] = useState('');
    
      async function Updateprofissionais() {
        try {
          const response = await axios.put(
            `http://localhost:3000/professional/update/${personalid2}`,
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
            value={personalid2}
            onChange={(e) => setPersonalid2(e.target.value)}
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
  
    
          <button onClick={Updateprofissionais}>Atualizar Profissional</button>
    
          {message && <p>{message}</p>}
        </div>
      );
    }
    
    
    

    export { Appid,Appupdate };
     
export {Cabecalho,Applist,Appcreate};
