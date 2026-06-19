import { useEffect, useState } from "react";
import api from "../services/api";
import Menu from "../componentes/Menu";

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    const [form, setForm] = useState({
        nome_completo: "",
        cpf: "",
        data_nascimento: "",
        sexo: "",
        telefone: "",
        email: "",
        endereco: "",
        convenio: "",
        numero_carteirinha: ""
    });

    async function carregarPacientes() {
        const resposta = await api.get("/pacientes");
        setPacientes(resposta.data);
    }

    useEffect(() => {
        carregarPacientes();
    }, []);

    function alterarCampo(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function editarPaciente(paciente) {
        setEditandoId(paciente.id);

        setForm({
            nome_completo: paciente.nome_completo || "",
            cpf: paciente.cpf || "",
            data_nascimento: paciente.data_nascimento
                ? paciente.data_nascimento.substring(0, 10)
                : "",
            sexo: paciente.sexo || "",
            telefone: paciente.telefone || "",
            email: paciente.email || "",
            endereco: paciente.endereco || "",
            convenio: paciente.convenio || "",
            numero_carteirinha: paciente.numero_carteirinha || ""
        });
    }

    async function salvarPaciente(e) {
        e.preventDefault();

        if (!form.nome_completo || !form.cpf || !form.data_nascimento) {
            alert("Nome completo, CPF e data de nascimento são obrigatórios");
            return;
        }

        if (editandoId) {
            await api.put(`/pacientes/${editandoId}`, form);
            alert("Paciente atualizado com sucesso!");
        } else {
            await api.post("/pacientes", form);
            alert("Paciente cadastrado com sucesso!");
        }

        setForm({
            nome_completo: "",
            cpf: "",
            data_nascimento: "",
            sexo: "",
            telefone: "",
            email: "",
            endereco: "",
            convenio: "",
            numero_carteirinha: ""
        });

        setEditandoId(null);
        carregarPacientes();
    }

    async function excluirPaciente(id) {
        const confirmar = window.confirm("Deseja excluir este paciente?");

        if (!confirmar) return;

        await api.delete(`/pacientes/${id}`);
        alert("Paciente excluído com sucesso!");
        carregarPacientes();
    }

    return (
        <div>
            <Menu />

            <h1>Pacientes</h1>

            <form onSubmit={salvarPaciente}>
                <input name="nome_completo" placeholder="Nome completo" value={form.nome_completo} onChange={alterarCampo} />
                <input name="cpf" placeholder="CPF" value={form.cpf} onChange={alterarCampo} />
                <input name="data_nascimento" type="date" value={form.data_nascimento} onChange={alterarCampo} />
                <input name="sexo" placeholder="Sexo" value={form.sexo} onChange={alterarCampo} />
                <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={alterarCampo} />
                <input name="email" placeholder="Email" value={form.email} onChange={alterarCampo} />
                <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={alterarCampo} />
                <input name="convenio" placeholder="Convênio" value={form.convenio} onChange={alterarCampo} />
                <input name="numero_carteirinha" placeholder="Número da carteirinha" value={form.numero_carteirinha} onChange={alterarCampo} />

                <button type="submit">
                    {editandoId ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            <h2>Lista de pacientes</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {pacientes.map((paciente) => (
                        <tr key={paciente.id}>
                            <td>{paciente.id}</td>
                            <td>{paciente.nome_completo}</td>
                            <td>{paciente.cpf}</td>
                            <td>{paciente.telefone}</td>
                            <td>{paciente.email}</td>
                            <td>
                                <button 
                                className="btn-editar"
                                onClick={() => editarPaciente(paciente)}>
                                    Editar
                                </button>

                                <button 
                                className="btn-excluir"
                                onClick={() => excluirPaciente(paciente.id)}>
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

export default Pacientes;