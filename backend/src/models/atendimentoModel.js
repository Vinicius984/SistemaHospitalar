const db = require("../config/db");

const listarAtendimentos = async () => {
    const [rows] = await db.query(`
        SELECT 
            atendimentos.*,
            pacientes.nome_completo AS paciente_nome,
            profissionais.nome AS profissional_nome
        FROM atendimentos
        INNER JOIN pacientes 
            ON atendimentos.paciente_id = pacientes.id
        INNER JOIN profissionais 
            ON atendimentos.profissional_id = profissionais.id
    `);

    return rows;
};

const buscarAtendimentoPorId = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM atendimentos WHERE id = ?",
        [id]
    );

    return rows[0];
};

const criarAtendimento = async (atendimento) => {
    const {
        paciente_id,
        profissional_id,
        data_hora,
        tipo,
        status,
        diagnostico,
        observacoes,
        valor
    } = atendimento;

    const [result] = await db.query(
        `INSERT INTO atendimentos
        (paciente_id, profissional_id, data_hora, tipo, status, diagnostico, observacoes, valor)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [paciente_id, profissional_id, data_hora, tipo, status, diagnostico, observacoes, valor]
    );

    return result.insertId;
};

const atualizarAtendimento = async (id, atendimento) => {
    const {
        paciente_id,
        profissional_id,
        data_hora,
        tipo,
        status,
        diagnostico,
        observacoes,
        valor
    } = atendimento;

    const [result] = await db.query(
        `UPDATE atendimentos SET
        paciente_id = ?, profissional_id = ?, data_hora = ?, tipo = ?, status = ?,
        diagnostico = ?, observacoes = ?, valor = ?
        WHERE id = ?`,
        [paciente_id, profissional_id, data_hora, tipo, status, diagnostico, observacoes, valor, id]
    );

    return result.affectedRows;
};

const excluirAtendimento = async (id) => {
    const [result] = await db.query(
        "DELETE FROM atendimentos WHERE id = ?",
        [id]
    );

    return result.affectedRows;
};

module.exports = {
    listarAtendimentos,
    buscarAtendimentoPorId,
    criarAtendimento,
    atualizarAtendimento,
    excluirAtendimento
};