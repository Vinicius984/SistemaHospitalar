import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import Menu from "../componentes/Menu";

function Home() {
    const [totais, setTotais] = useState({
        pacientes: 0,
        profissionais: 0,
        especialidades: 0,
        atendimentos: 0
    });

    useEffect(() => {
        async function carregarDados() {
            const pacientes = await api.get("/pacientes");
            const profissionais = await api.get("/profissionais");
            const especialidades = await api.get("/especialidades");
            const atendimentos = await api.get("/atendimentos");

            setTotais({
                pacientes: pacientes.data.length,
                profissionais: profissionais.data.length,
                especialidades: especialidades.data.length,
                atendimentos: atendimentos.data.length
            });
        }

        carregarDados();
    }, []);

    return (
        <div>
            <Menu />

            <div className="titulo-home">
                <div className="icone-hospital">🏥</div>
                <h1>MedCore System</h1>
                <p>Sistema Integrado de Gestão Hospitalar</p>
            </div>

            <div className="dashboard-cards">
                <div className="card">
                    <div className="card-icone">👤</div>
                    <h3>Pacientes</h3>
                    <span>{totais.pacientes}</span>
                </div>

                <div className="card">
                    <div className="card-icone">🩺</div>
                    <h3>Profissionais</h3>
                    <span>{totais.profissionais}</span>
                </div>

                <div className="card">
                    <div className="card-icone">🏥</div>
                    <h3>Especialidades</h3>
                    <span>{totais.especialidades}</span>
                </div>

                <div className="card">
                    <div className="card-icone">📋</div>
                    <h3>Atendimentos</h3>
                    <span>{totais.atendimentos}</span>
                </div>
            </div>

            <hr />

        </div>
    );
}

export default Home;