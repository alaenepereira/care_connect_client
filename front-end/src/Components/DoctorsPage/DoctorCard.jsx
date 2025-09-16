import './Doctor.css'
import { useState } from 'react';

export default function Doctor({ 
  name, 
  specialty, 
  price, 
  photo, 
  availability = []
}) {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className='doctor-card'>
      <div className='doctor-header'>
        <span className='favorite'>🤍</span>
      </div>

      
      <div className="doctor-photo">
        <img src={photo} alt={name} />
      </div>

      <div className='doctor-info'>
        <h2>{name}</h2>
        <p className="specialty">{specialty}</p>
        <p className="price">Sessão R${price}</p>
      </div>

      <div className='availability'>
        <p>Disponibilidade • {availability.length} vagas</p>
        <div className='days'>
          {availability.map((day, i) => (
            <div
              key={i}
              className={`day ${selectedDay === day ? "selected" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
