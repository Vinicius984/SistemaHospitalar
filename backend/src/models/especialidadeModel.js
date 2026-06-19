const db = require("../config/db");

const listarEspecialidades = async () => {
    const [rows] = await db.query("SELECT * FROM especialidades");
    return rows;
};

const buscarEspecialidadePorId = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM especialidades WHERE id = ?",
        [id]
    );
    return rows[0];
};

const criarEspecialidade = async (nome, descricao, area) => {
    const [result] = await db.query(
        "INSERT INTO especialidades (nome, descricao, area) VALUES (?, ?, ?)",
        [nome, descricao, area]
    );
    return result.insertId;
};

const atualizarEspecialidade = async (id, nome, descricao, area) => {
    const [result] = await db.query(
        "UPDATE especialidades SET nome = ?, descricao = ?, area = ? WHERE id = ?",
        [nome, descricao, area, id]
    );
    return result.affectedRows;
};

const excluirEspecialidade = async (id) => {
    const [result] = await db.query(
        "DELETE FROM especialidades WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    listarEspecialidades,
    buscarEspecialidadePorId,
    criarEspecialidade,
    atualizarEspecialidade,
    excluirEspecialidade
};