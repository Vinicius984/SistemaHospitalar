const Atendimento = require("../models/atendimentoModel");

const listar = async (req, res) => {
    try {
        const atendimentos = await Atendimento.listarAtendimentos();
        res.json(atendimentos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const atendimento = await Atendimento.buscarAtendimentoPorId(req.params.id);

        if (!atendimento) {
            return res.status(404).json({ mensagem: "Atendimento não encontrado" });
        }

        res.json(atendimento);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const criar = async (req, res) => {
    try {
        const { paciente_id, profissional_id, data_hora, tipo, status } = req.body;

        if (!paciente_id || !profissional_id || !data_hora || !tipo || !status) {
            return res.status(400).json({
                mensagem: "Paciente, profissional, data/hora, tipo e status são obrigatórios"
            });
        }

        const id = await Atendimento.criarAtendimento(req.body);

        res.status(201).json({
            mensagem: "Atendimento cadastrado com sucesso",
            id
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const resultado = await Atendimento.atualizarAtendimento(req.params.id, req.body);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Atendimento não encontrado" });
        }

        res.json({ mensagem: "Atendimento atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const excluir = async (req, res) => {
    try {
        const resultado = await Atendimento.excluirAtendimento(req.params.id);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Atendimento não encontrado" });
        }

        res.json({ mensagem: "Atendimento excluído com sucesso" });
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