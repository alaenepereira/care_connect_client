import { useState } from 'react'
import axios from 'axios'
import React from 'react'
import './personal.css'

function cabeçalho(){
  return( <h2 className=" cabeçalho"> Área de Profissionais
 </h2>)
}


function Applist() {
 const [professional, setProfessional] = useState([])

 async function Listprofessional() {
   try{ 
    const response = await axios.get('http://localhost:3000/professional/listAll')
   setProfessional(response.data)
    console.log(response.data)
   }
   catch (error) {
   console.error('Erro ao buscar profissionais:', error)
 }
}
<br></br>
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
<br></br>
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
           <br></br>
           <label> Email:</label>
           <input
             type="email"
             placeholder="Email"
             value={newprofessional.email}
             onChange={e => setNewprofessional({ ...newprofessional, email: e.target.value })}
           />
           <br></br>
           <label> Especialização:
           </label>
           <input
             type="text"
             placeholder="Especialização"
             value={newprofessional.specialty}
             onChange={e => setNewprofessional({ ...newprofessional, specialty: e.target.value })}/>
           <button onClick={Createprofessional}>Cadastrar Profissional</button>
         </div>
       );
     }
     function Appid() {
      const [professionalid, setProfessionalid] = useState('');
      const [professionalData, setProfessionalData] = useState(null);
      const [error, setError] = useState('');
    
      async function Listprofessionalid() {
        try {
          const response = await axios.get(`http://localhost:3000/professional/${professionalid}`);
          setProfessionalData(response.data);
          setError('');
        } catch (error) {
          console.error('Erro ao buscar profissional:', error);
          
        }
      }
    
      return (
        <div>
          <label>Qual profissional você quer? (</label>
          <input
            type="text"
            value={professionalid}
            onChange={(e) => setProfessionalid(e.target.value)}
          />
          <button onClick={Listprofessionalid} className="botaoid">Buscar</button>
    
          {error && <p style={{ color: 'red' }}>{error}</p>}
    
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
    
    export { Appid };
     
export {cabeçalho,Applist,Appcreate};
