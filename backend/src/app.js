const atendimentoRoutes = require("./routes/atendimentoRoutes");
const profissionalRoutes = require("./routes/profissionalRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes");
const especialidadeRoutes = require("./routes/especialidadeRoutes");
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensagem: "API MedCore System rodando!" });
});

app.get("/teste-db", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS teste");

        res.json({
            mensagem: "Banco conectado!",
            resultado: rows
        });

    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
});

app.use("/api/especialidades", especialidadeRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/profissionais", profissionalRoutes);
app.use("/api/atendimentos", atendimentoRoutes);
module.exports = app;