import { useEffect, useState } from "react";
import api from "../services/api";
import Menu from "../componentes/Menu";

function Especialidades() {
    const [especialidades, setEspecialidades] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        area: ""
    });

    async function carregarEspecialidades() {
        const resposta = await api.get("/especialidades");
        setEspecialidades(resposta.data);
    }

    useEffect(() => {
        carregarEspecialidades();
    }, []);

    function alterarCampo(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function editarEspecialidade(especialidade) {
        setEditandoId(especialidade.id);

        setForm({
            nome: especialidade.nome,
            descricao: especialidade.descricao || "",
            area: especialidade.area || ""
        });
    }

    async function salvarEspecialidade(e) {
        e.preventDefault();

        if (!form.nome) {
            alert("Informe o nome da especialidade");
            return;
        }

        if (editandoId) {
            await api.put(`/especialidades/${editandoId}`, form);
            alert("Especialidade atualizada com sucesso!");
        } else {
            await api.post("/especialidades", form);
            alert("Especialidade cadastrada com sucesso!");
        }

        setForm({
            nome: "",
            descricao: "",
            area: ""
        });

        setEditandoId(null);

        carregarEspecialidades();
    }

    async function excluirEspecialidade(id) {
        if (!window.confirm("Deseja excluir esta especialidade?")) {
            return;
        }

        await api.delete(`/especialidades/${id}`);

        alert("Especialidade excluída com sucesso!");

        carregarEspecialidades();
    }

    return (
        <div>
            <Menu />

            <h1>Especialidades</h1>

            <form onSubmit={salvarEspecialidade}>
                <input
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={alterarCampo}
                />

                <input
                    name="descricao"
                    placeholder="Descrição"
                    value={form.descricao}
                    onChange={alterarCampo}
                />

                <input
                    name="area"
                    placeholder="Área"
                    value={form.area}
                    onChange={alterarCampo}
                />

                <button type="submit">
                    {editandoId ? "Atualizar" : "Cadastrar"}
                </button>
            </form>

            <h2>Lista de Especialidades</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Área</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {especialidades.map((especialidade) => (
                        <tr key={especialidade.id}>
                            <td>{especialidade.id}</td>
                            <td>{especialidade.nome}</td>
                            <td>{especialidade.descricao}</td>
                            <td>{especialidade.area}</td>

                            <td>
                                <button
                                    className="btn-editar"
                                    onClick={() => editarEspecialidade(especialidade)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn-excluir"
                                    onClick={() => excluirEspecialidade(especialidade.id)}
                                >
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

export default Especialidades;