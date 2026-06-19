const db = require("../config/db");

const listarProfissionais = async () => {
    const [rows] = await db.query(`
        SELECT 
            profissionais.*,
            especialidades.nome AS especialidade_nome
        FROM profissionais
        INNER JOIN especialidades 
            ON profissionais.especialidade_id = especialidades.id
    `);

    return rows;
};

const buscarProfissionalPorId = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM profissionais WHERE id = ?",
        [id]
    );

    return rows[0];
};

const criarProfissional = async (profissional) => {
    const { nome, registro, especialidade_id, cargo, turno, telefone, email, ativo } = profissional;

    const [result] = await db.query(
        `INSERT INTO profissionais 
        (nome, registro, especialidade_id, cargo, turno, telefone, email, ativo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome, registro, especialidade_id, cargo, turno, telefone, email, ativo]
    );

    return result.insertId;
};

const atualizarProfissional = async (id, profissional) => {
    const { nome, registro, especialidade_id, cargo, turno, telefone, email, ativo } = profissional;

    const [result] = await db.query(
        `UPDATE profissionais SET
        nome = ?, registro = ?, especialidade_id = ?, cargo = ?, turno = ?, 
        telefone = ?, email = ?, ativo = ?
        WHERE id = ?`,
        [nome, registro, especialidade_id, cargo, turno, telefone, email, ativo, id]
    );

    return result.affectedRows;
};

const excluirProfissional = async (id) => {
    const [result] = await db.query(
        "DELETE FROM profissionais WHERE id = ?",
        [id]
    );

    return result.affectedRows;
};

module.exports = {
    listarProfissionais,
    buscarProfissionalPorId,
    criarProfissional,
    atualizarProfissional,
    excluirProfissional
};