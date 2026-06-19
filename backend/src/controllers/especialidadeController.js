const Especialidade = require("../models/especialidadeModel");

const listar = async (req, res) => {
    try {
        const especialidades = await Especialidade.listarEspecialidades();
        res.json(especialidades);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const especialidade = await Especialidade.buscarEspecialidadePorId(req.params.id);

        if (!especialidade) {
            return res.status(404).json({ mensagem: "Especialidade não encontrada" });
        }

        res.json(especialidade);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const criar = async (req, res) => {
    try {
        const { nome, descricao, area } = req.body;

        if (!nome) {
            return res.status(400).json({ mensagem: "O nome é obrigatório" });
        }

        const id = await Especialidade.criarEspecialidade(nome, descricao, area);

        res.status(201).json({
            mensagem: "Especialidade cadastrada com sucesso",
            id
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const { nome, descricao, area } = req.body;

        const resultado = await Especialidade.atualizarEspecialidade(
            req.params.id,
            nome,
            descricao,
            area
        );

        if (resultado === 0) {
            return res.status(404).json({
                mensagem: "Especialidade não encontrada"
            });
        }

        res.json({
            mensagem: "Especialidade atualizada com sucesso"
        });

    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

const excluir = async (req, res) => {
    try {

        const resultado = await Especialidade.excluirEspecialidade(
            req.params.id
        );

        if (resultado === 0) {
            return res.status(404).json({
                mensagem: "Especialidade não encontrada"
            });
        }

        res.json({
            mensagem: "Especialidade excluída com sucesso"
        });

    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};