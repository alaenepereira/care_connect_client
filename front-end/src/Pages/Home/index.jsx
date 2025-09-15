import Header from '../../Components/Header/index'
import BottomNav from '../../Components/Button/BottomNav'
import './style.css'
import Doctor from '../../Components/DoctorsPage/DoctorCard'
import Dashboard from '../Dashboard'



export default function Home() {


  return(
    <div className='home'>
      <Header />
      <Dashboard/>

      <main className='content' >
      <h3 className='section-title'>Profissionais em destaque</h3>

       <div>
      <Doctor 
        name="Dr. Edson Morais"
        specialty="Neurologista"
        price="400.00"
        photo="/src/assets/images/user.png"
        availability={["Seg 12", "Ter 13", "Qua 14", "Qui 15", "Sex 16", "Sáb 17"]}
      />

      <Doctor 
        name="Dra. Ana Souza"
        specialty="Pediatra"
        price="120.00"
        rating="4.9"
        photo="/src/assets/images/medica.png"
        availability={["Seg 19", "Qua 21", "Sex 23","Sab 24", "Seg 26", "Ter 27"]}
      />
       <Doctor 
        name="Dra. Raissa albuquerque"
        specialty="Psicologa"
        price="100.00"
        rating="4.2"
        photo="/src/assets/images/loira-medica.jpg"
        availability={["Seg 18", "Ter 19", "Sex 22"]}
      />
        <Doctor 
        name="Dra. Jennifer Sales"
        specialty="Dentista"
        price="130.00"
        rating="4.0"
        photo="/src/assets/images/dentista.jpg"
        availability={["Seg 18", "Ter 19", "Sex 22"]}
      />
      
    </div>
      
     </main> 

     <BottomNav/>
    </div>
  )
};