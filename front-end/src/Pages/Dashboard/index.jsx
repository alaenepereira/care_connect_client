import { useEffect, useState } from "react";
import api from "../../Services/api.js";
import { FaUser, FaUserMd, FaCalendarCheck } from "react-icons/fa"; // ícones
import './style.css'

export default function Dashboard() {
  const [pacientesCount, setPacientesCount] = useState(0);
  const [medicosCount, setMedicosCount] = useState(0);
  const [consultasCount, setConsultasCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const pacientesRes = await api.get("/patients");
        const medicosRes = await api.get("/professional");
        const consultasRes = await api.get("/appointments");

        setPacientesCount(pacientesRes.data.length);
        setMedicosCount(medicosRes.data.length);
        setConsultasCount(consultasRes.data.length);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
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
          <div className="card-number">{pacientesCount}</div>
          <div className="card-label">Pacientes</div>
        </div>

        <div className="card card-medicos">
          <FaUserMd className="card-icon" />
          <div className="card-number">{medicosCount}</div>
          <div className="card-label">Médicos</div>
        </div>

        <div className="card card-consultas">
          <FaCalendarCheck className="card-icon" />
          <div className="card-number">{consultasCount}</div>
          <div className="card-label">Consultas</div>
        </div>
      </div>
    </div>
  );
}
