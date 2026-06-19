const express = require("express");
const router = express.Router();

const especialidadeController = require("../controllers/especialidadeController");

router.get("/", especialidadeController.listar);
router.get("/:id", especialidadeController.buscarPorId);
router.post("/", especialidadeController.criar);
router.put("/:id", especialidadeController.atualizar);
router.delete("/:id", especialidadeController.excluir);

module.exports = router;