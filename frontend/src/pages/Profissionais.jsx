import { useEffect, useState } from "react";
import api from "../services/api";
import Menu from "../componentes/Menu";

function Profissionais() {
    const [profissionais, setProfissionais] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    const [form, setForm] = useState({
        nome: "",
        registro: "",
        especialidade_id: "",
        cargo: "",
        turno: "",
        telefone: "",
        email: "",
        ativo: "1"
    });

    async function carregarDados() {
        const respostaProfissionais = await api.get("/profissionais");
        const respostaEspecialidades = await api.get("/especialidades");

        setProfissionais(respostaProfissionais.data);
        setEspecialidades(respostaEspecialidades.data);
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

    function editarProfissional(profissional) {
        setEditandoId(profissional.id);

        setForm({
            nome: profissional.nome || "",
            registro: profissional.registro || "",
            especialidade_id: profissional.especialidade_id || "",
            cargo: profissional.cargo || "",
            turno: profissional.turno || "",
            telefone: profissional.telefone || "",
            email: profissional.email || "",
            ativo: String(profissional.ativo)
        });
    }

    async function salvarProfissional(e) {
        e.preventDefault();

        if (!form.nome || !form.registro || !form.especialidade_id) {
            alert("Nome, registro e especialidade são obrigatórios");
            return;
        }

        if (editandoId) {
            await api.put(`/profissionais/${editandoId}`, form);
            alert("Profissional atualizado com sucesso!");
        } else {
            await api.post("/profissionais", form);
            alert("Profissional cadastrado com sucesso!");
        }

        setForm({
            nome: "",
            registro: "",
            especialidade_id: "",
            cargo: "",
            turno: "",
            telefone: "",
            email: "",
            ativo: "1"
        });

        setEditandoId(null);
        carregarDados();
    }

    async function excluirProfissional(id) {
        if (!window.confirm("Deseja excluir este profissional?")) {
            return;
        }

        await api.delete(`/profissionais/${id}`);

        alert("Profissional excluído com sucesso!");

        carregarDados();
    }

    return (
        <div>
            <Menu />

            <h1>Profissionais</h1>

            <form onSubmit={salvarProfissional}>
                <input
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={alterarCampo}
                />

                <input
                    name="registro"
                    placeholder="CRM / COREN / CRF"
                    value={form.registro}
                    onChange={alterarCampo}
                />

                <select
                    name="especialidade_id"
                    value={form.especialidade_id}
                    onChange={alterarCampo}
                >
                    <option value="">Selecione a especialidade</option>

                    {especialidades.map((especialidade) => (
                        <option key={especialidade.id} value={especialidade.id}>
                            {especialidade.nome}
                        </option>
                    ))}
                </select>

                <input
                    name="cargo"
                    placeholder="Cargo"
                    value={form.cargo}
                    onChange={alterarCampo}
                />

                <input
                    name="turno"
                    placeholder="Turno"
                    value={form.turno}
                    onChange={alterarCampo}
                />

                <input
                    name="telefone"
                    placeholder="Telefone"
                    value={form.telefone}
                    onChange={alterarCampo}
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={alterarCampo}
                />

                <select name="ativo" value={form.ativo} onChange={alterarCampo}>
                    <option value="1">Ativo</option>
                    <option value="0">Inativo</option>
                </select>

                <button type="submit">
                    {editandoId ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            <h2>Lista de Profissionais</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Registro</th>
                        <th>Especialidade</th>
                        <th>Cargo</th>
                        <th>Turno</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Ativo</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {profissionais.map((profissional) => (
                        <tr key={profissional.id}>
                            <td>{profissional.id}</td>
                            <td>{profissional.nome}</td>
                            <td>{profissional.registro}</td>
                            <td>{profissional.especialidade_nome}</td>
                            <td>{profissional.cargo}</td>
                            <td>{profissional.turno}</td>
                            <td>{profissional.telefone}</td>
                            <td>{profissional.email}</td>
                            <td>{profissional.ativo ? "Sim" : "Não"}</td>
                            <td>
                                <button 
                                className="btn-editar"
                                onClick={() => editarProfissional(profissional)}>
                                    Editar
                                </button>

                                <button 
                                className="btn-excluir"
                                onClick={() => excluirProfissional(profissional.id)}>
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

export default Profissionais;