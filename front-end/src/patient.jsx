import { useState } from 'react'
import axios from 'axios'

function Applist() {
  const [patient, setPatient] = useState([])

  async function Listpatient() {
    try{ const response = await axios.get('http://localhost:3000/patient/listAll')
    setPatient(response.data)
     console.log(response.data)
    }
    catch (error) {
    console.error('Erro ao buscar pacientes:', error)
  }
}

return(
  <div>
       <button onClick={Listpatient}>Buscar Pacientes</button>
    <ul>
      {patient.map((p,index)=>(
        <li key={index} > {p.name}</li>
      ))}
    </ul>
  </div>
)
      }

 function Appcreate()
   {
     const [newpatient, setNewpatient]=useState({
      name: '',
      email: '',
      phone: '',
      dateBirth: ''
    })
      async function Createpatient(){
        try{
          const response = await axios.post('http://localhost:3000/patient/create', {
          name:newpatient.name,
          email :newpatient.email,
          phone: newpatient.phone,
          dateBirth:new Date(dateBirth),
        })
        console.log('Paciente cadastrado com sucesso:', response.data)
          } catch(error){
            console.log("erro ao se cadastrar)")
          }
   }
   return(
      <div>
        <input type="text" placeholder="Nome"
          value={newPatient.name}
          onChange={e => setNewPatient({newPatient, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newPatient.email}
          onChange={e => setNewPatient({ newPatient, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={newPatient.phone}
          onChange={e => setNewPatient({newPatient, phone: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data de nascimento"
          value={newPatient.dateBirth}
          onChange={e => setNewPatient({newPatient, dateBirth: e.target.value })}
        />
        <button onClick={CreatePatient}>Cadastrar Paciente</button>
      </div>
   )
  }
  
export default Applist;Appcreate
