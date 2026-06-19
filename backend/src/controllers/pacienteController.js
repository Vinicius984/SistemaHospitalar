const Paciente = require("../models/pacienteModel");

const listar = async (req, res) => {
    try {
        const pacientes = await Paciente.listarPacientes();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const paciente = await Paciente.buscarPacientePorId(req.params.id);

        if (!paciente) {
            return res.status(404).json({ mensagem: "Paciente não encontrado" });
        }

        res.json(paciente);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const criar = async (req, res) => {
    try {
        const { nome_completo, cpf, data_nascimento } = req.body;

        if (!nome_completo || !cpf || !data_nascimento) {
            return res.status(400).json({
                mensagem: "Nome completo, CPF e data de nascimento são obrigatórios"
            });
        }

        const id = await Paciente.criarPaciente(req.body);

        res.status(201).json({
            mensagem: "Paciente cadastrado com sucesso",
            id
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const resultado = await Paciente.atualizarPaciente(req.params.id, req.body);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Paciente não encontrado" });
        }

        res.json({ mensagem: "Paciente atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const excluir = async (req, res) => {
    try {
        const resultado = await Paciente.excluirPaciente(req.params.id);

        if (resultado === 0) {
            return res.status(404).json({ mensagem: "Paciente não encontrado" });
        }

        res.json({ mensagem: "Paciente excluído com sucesso" });
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