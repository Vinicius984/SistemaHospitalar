const db = require("../config/db");

const listarPacientes = async () => {
    const [rows] = await db.query("SELECT * FROM pacientes");
    return rows;
};

const buscarPacientePorId = async (id) => {
    const [rows] = await db.query("SELECT * FROM pacientes WHERE id = ?", [id]);
    return rows[0];
};

const criarPaciente = async (paciente) => {
    const {
        nome_completo,
        cpf,
        data_nascimento,
        sexo,
        telefone,
        email,
        endereco,
        convenio,
        numero_carteirinha
    } = paciente;

    const [result] = await db.query(
        `INSERT INTO pacientes 
        (nome_completo, cpf, data_nascimento, sexo, telefone, email, endereco, convenio, numero_carteirinha)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome_completo, cpf, data_nascimento, sexo, telefone, email, endereco, convenio, numero_carteirinha]
    );

    return result.insertId;
};

const atualizarPaciente = async (id, paciente) => {
    const {
        nome_completo,
        cpf,
        data_nascimento,
        sexo,
        telefone,
        email,
        endereco,
        convenio,
        numero_carteirinha
    } = paciente;

    const [result] = await db.query(
        `UPDATE pacientes SET 
        nome_completo = ?, cpf = ?, data_nascimento = ?, sexo = ?, telefone = ?, 
        email = ?, endereco = ?, convenio = ?, numero_carteirinha = ?
        WHERE id = ?`,
        [nome_completo, cpf, data_nascimento, sexo, telefone, email, endereco, convenio, numero_carteirinha, id]
    );

    return result.affectedRows;
};

const excluirPaciente = async (id) => {
    const [result] = await db.query("DELETE FROM pacientes WHERE id = ?", [id]);
    return result.affectedRows;
};

module.exports = {
    listarPacientes,
    buscarPacientePorId,
    criarPaciente,
    atualizarPaciente,
    excluirPaciente
};