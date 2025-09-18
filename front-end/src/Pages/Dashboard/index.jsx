import { useEffect, useState } from "react";
import { FaUser, FaUserMd, FaCalendarCheck } from "react-icons/fa"; // ícones
import './style.css'
import api from "../../services/api";

export default function Dashboard() {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);

useEffect(() => {
  async function fetchData() {
    try {
      const [patientRes, doctorRes, appointmentRes] = await Promise.all([
        api.get("/patient/listAll"),
        api.get("/professional/listAll"),
        api.get("/appointment/listAll"),
      ]);

      setPatientCount(Array.isArray(patientRes.data) ? patientRes.data.length : 0);
      setDoctorCount(Array.isArray(doctorRes.data.professionalList) ? doctorRes.data.professionalList.length : 0);
      setAppointmentCount(Array.isArray(appointmentRes.data.listAppointments) ? appointmentRes.data.listAppointments.length : 0);

    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setPatientCount(0);
      setDoctorCount(0);
      setAppointmentCount(0);
    }
  }

  fetchData();
}, []);


  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Resumo do Sistema</h2>
      <div className="dashboard-cards">
        <div className="card card-pacientes">
          <FaUser className="card-icon" />
          <div className="card-number">{patientCount}</div>
          <div className="card-label">Pacientes</div>
        </div>

        <div className="card card-medicos">
          <FaUserMd className="card-icon" />
          <div className="card-number">{doctorCount}</div>
          <div className="card-label">Médicos</div>
        </div>

        <div className="card card-consultas">
          <FaCalendarCheck className="card-icon" />
          <div className="card-number">{appointmentCount}</div>
          <div className="card-label">Consultas</div>
        </div>
      </div>
    </div>
  );
}
