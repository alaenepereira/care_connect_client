import { useEffect, useState } from "react";
import api from "../../Services/api"; // seu axios configurado

export default function Dashboard() {
  const [pacientesCount, setPacientesCount] = useState(0);
  const [medicosCount, setMedicosCount] = useState(0);
  const [consultasCount, setConsultasCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const pacientesRes = await api.get("/pacientes");
        const medicosRes = await api.get("/medicos");
        const consultasRes = await api.get("/consultas");

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
    <div>
      <h2>Resumo do Sistema</h2>
      <div className="dashboard-cards">
        <div className="card">Pacientes: {pacientesCount}</div>
        <div className="card">Médicos: {medicosCount}</div>
        <div className="card">Consultas: {consultasCount}</div>
      </div>
    </div>
  );
}
