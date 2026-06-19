const express = require("express");
const router = express.Router();

const atendimentoController = require("../controllers/atendimentoController");

router.get("/", atendimentoController.listar);
router.get("/:id", atendimentoController.buscarPorId);
router.post("/", atendimentoController.criar);
router.put("/:id", atendimentoController.atualizar);
router.delete("/:id", atendimentoController.excluir);

module.exports = router;