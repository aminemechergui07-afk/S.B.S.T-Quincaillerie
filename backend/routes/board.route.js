const express = require("express");
const router = express.Router();

const { createBoard, list, byId, update } = require("../controllers/board.controller");
const { verifyToken } = require("../config/auth/middleware");

router.post("/ajout", verifyToken, createBoard);
router.get("/list", list);
router.get("/byId/:id", byId);
router.put("/update/:id", verifyToken, update);

module.exports = router;
