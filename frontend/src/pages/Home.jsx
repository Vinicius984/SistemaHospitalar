import { useEffect, useState } from "react";
import api from "../services/api";
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

            <section className="painel-hospitalar">
                <div>
                    <h1>Dashboard Hospitalar</h1>
                    <p>Visão geral operacional do MedCore System</p>
                </div>

            </section>

            <div className="dashboard-cards">
                <div className="card">
                    <small>Total cadastrado</small>
                    <h3>Pacientes</h3>
                    <span>{totais.pacientes}</span>
                </div>

                <div className="card">
                    <small>Equipe cadastrada</small>
                    <h3>Profissionais</h3>
                    <span>{totais.profissionais}</span>
                </div>

                <div className="card">
                    <small>Áreas clínicas</small>
                    <h3>Especialidades</h3>
                    <span>{totais.especialidades}</span>
                </div>

                <div className="card">
                    <small>Registros clínicos</small>
                    <h3>Atendimentos</h3>
                    <span>{totais.atendimentos}</span>
                </div>
            </div>

            <section className="resumo-operacional">
                <h2>Resumo operacional</h2>

                <div className="linha-resumo">
                    <span>Pacientes cadastrados no sistema</span>
                    <strong>{totais.pacientes}</strong>
                </div>

                <div className="linha-resumo">
                    <span>Profissionais disponíveis para atendimento</span>
                    <strong>{totais.profissionais}</strong>
                </div>

                <div className="linha-resumo">
                    <span>Especialidades médicas cadastradas</span>
                    <strong>{totais.especialidades}</strong>
                </div>

                <div className="linha-resumo">
                    <span>Atendimentos registrados</span>
                    <strong>{totais.atendimentos}</strong>
                </div>
            </section>
        </div>
    );
}

export default Home;