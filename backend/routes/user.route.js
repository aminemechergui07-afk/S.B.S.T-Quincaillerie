const express = require("express");
const router = express.Router();
const { createUploader } = require("../config/upload");
const { verifyToken, requireSelfOrAdmin } = require("../config/auth/middleware");
const { register, login, getUserById, update } = require("../controllers/user.controller");

const upload = createUploader();

router.post("/register", register);
router.post("/login", login);
router.get("/byId/:id", verifyToken, requireSelfOrAdmin("id"), getUserById);
router.put("/update/:id", verifyToken, requireSelfOrAdmin("id"), upload.single("image"), update);

module.exports = router;
