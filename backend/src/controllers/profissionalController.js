const Profissional = require("../models/profissionalModel");

const listar = async (req, res) => {
    try {
        const profissionais = await Profissional.listarProfissionais();
        res.json(profissionais);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const profissional = await Profissional.buscarProfissionalPorId(req.params.id);

        if (!profissional) {
            return res.status(404).json({ mensagem: "Profissional não encontrado" });
        }

        res.json(profissional);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const criar = async (req, res) => {
    try {
        const { nome, registro, especialidade_id } = req.body;

        if (!nome || !registro || !especialidade_id) {
            return res.status(400).json({
                mensagem: "Nome, registro e especialidade são obrigatórios"
            });
        }

        const id = await Profissional.criarProfissional(req.body);

        res.status(201).json({
            mensagem: "Profissional cadastrado com sucesso",
            id
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const resultado = await Profissional.atualizarProfissional(req.params.id, req.body);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Profissional não encontrado" });
        }

        res.json({ mensagem: "Profissional atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const excluir = async (req, res) => {
    try {
        const resultado = await Profissional.excluirProfissional(req.params.id);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Profissional não encontrado" });
        }

        res.json({ mensagem: "Profissional excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};