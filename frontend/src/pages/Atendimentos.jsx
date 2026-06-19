import { useEffect, useState } from "react";
import api from "../services/api";
import Menu from "../componentes/Menu";

function Atendimentos() {
    const [atendimentos, setAtendimentos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [profissionais, setProfissionais] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    const [form, setForm] = useState({
        paciente_id: "",
        profissional_id: "",
        data_hora: "",
        tipo: "",
        status: "",
        diagnostico: "",
        observacoes: "",
        valor: ""
    });

    async function carregarDados() {
        const respostaAtendimentos = await api.get("/atendimentos");
        const respostaPacientes = await api.get("/pacientes");
        const respostaProfissionais = await api.get("/profissionais");

        setAtendimentos(respostaAtendimentos.data);
        setPacientes(respostaPacientes.data);
        setProfissionais(respostaProfissionais.data);
    }

    useEffect(() => {
        carregarDados();
    }, []);

    function alterarCampo(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function formatarDataParaInput(data) {
        if (!data) return "";

        const dataObj = new Date(data);
        const ano = dataObj.getFullYear();
        const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
        const dia = String(dataObj.getDate()).padStart(2, "0");
        const hora = String(dataObj.getHours()).padStart(2, "0");
        const minuto = String(dataObj.getMinutes()).padStart(2, "0");

        return `${ano}-${mes}-${dia}T${hora}:${minuto}`;
    }

    function editarAtendimento(atendimento) {
        setEditandoId(atendimento.id);

        setForm({
            paciente_id: atendimento.paciente_id || "",
            profissional_id: atendimento.profissional_id || "",
            data_hora: formatarDataParaInput(atendimento.data_hora),
            tipo: atendimento.tipo || "",
            status: atendimento.status || "",
            diagnostico: atendimento.diagnostico || "",
            observacoes: atendimento.observacoes || "",
            valor: atendimento.valor || ""
        });
    }

    async function salvarAtendimento(e) {
        e.preventDefault();

        if (!form.paciente_id || !form.profissional_id || !form.data_hora || !form.tipo || !form.status) {
            alert("Paciente, profissional, data/hora, tipo e status são obrigatórios");
            return;
        }

        if (editandoId) {
            await api.put(`/atendimentos/${editandoId}`, form);
            alert("Atendimento atualizado com sucesso!");
        } else {
            await api.post("/atendimentos", form);
            alert("Atendimento cadastrado com sucesso!");
        }

        setForm({
            paciente_id: "",
            profissional_id: "",
            data_hora: "",
            tipo: "",
            status: "",
            diagnostico: "",
            observacoes: "",
            valor: ""
        });

        setEditandoId(null);
        carregarDados();
    }

    async function excluirAtendimento(id) {
        if (!window.confirm("Deseja excluir este atendimento?")) {
            return;
        }

        await api.delete(`/atendimentos/${id}`);

        alert("Atendimento excluído com sucesso!");

        carregarDados();
    }

    return (
        <div>
            <Menu />

            <h1>Atendimentos</h1>

            <form onSubmit={salvarAtendimento}>
                <select
                    name="paciente_id"
                    value={form.paciente_id}
                    onChange={alterarCampo}
                >
                    <option value="">Selecione o paciente</option>
                    {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                            {paciente.nome_completo}
                        </option>
                    ))}
                </select>

                <select
                    name="profissional_id"
                    value={form.profissional_id}
                    onChange={alterarCampo}
                >
                    <option value="">Selecione o profissional</option>
                    {profissionais.map((profissional) => (
                        <option key={profissional.id} value={profissional.id}>
                            {profissional.nome} - {profissional.especialidade_nome}
                        </option>
                    ))}
                </select>

                <input
                    name="data_hora"
                    type="datetime-local"
                    value={form.data_hora}
                    onChange={alterarCampo}
                />

                <select name="tipo" value={form.tipo} onChange={alterarCampo}>
                    <option value="">Tipo</option>
                    <option value="consulta">Consulta</option>
                    <option value="exame">Exame</option>
                    <option value="internacao">Internação</option>
                </select>

                <select name="status" value={form.status} onChange={alterarCampo}>
                    <option value="">Status</option>
                    <option value="agendado">Agendado</option>
                    <option value="em atendimento">Em atendimento</option>
                    <option value="concluido">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                </select>

                <input
                    name="diagnostico"
                    placeholder="Diagnóstico"
                    value={form.diagnostico}
                    onChange={alterarCampo}
                />

                <input
                    name="observacoes"
                    placeholder="Observações"
                    value={form.observacoes}
                    onChange={alterarCampo}
                />

                <input
                    name="valor"
                    type="number"
                    step="0.01"
                    placeholder="Valor"
                    value={form.valor}
                    onChange={alterarCampo}
                />

                <button type="submit">
                    {editandoId ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            <h2>Lista de Atendimentos</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Paciente</th>
                        <th>Profissional</th>
                        <th>Data/Hora</th>
                        <th>Tipo</th>
                        <th>Status</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {atendimentos.map((atendimento) => (
                        <tr key={atendimento.id}>
                            <td>{atendimento.id}</td>
                            <td>{atendimento.paciente_nome}</td>
                            <td>{atendimento.profissional_nome}</td>
                            <td>{new Date(atendimento.data_hora).toLocaleString("pt-BR")}</td>
                            <td>{atendimento.tipo}</td>
                            <td>{atendimento.status}</td>
                            <td>R$ {Number(atendimento.valor).toFixed(2)}</td>
                            <td>
                                <button 
                                className="btn-editar"
                                onClick={() => editarAtendimento(atendimento)}>
                                    Editar
                                </button>

                                <button 
                                className="btn-excluir"
                                onClick={() => excluirAtendimento(atendimento.id)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Atendimentos;