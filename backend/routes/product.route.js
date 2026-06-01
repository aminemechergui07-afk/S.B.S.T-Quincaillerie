const express = require("express");
const router = express.Router();
const { createUploader } = require("../config/upload");
const {
  create,
  allProduct,
  preview,
  byId,
  deleteProduct,
  update,
} = require("../controllers/product.controller");
const { verifyToken, requireRole } = require("../config/auth/middleware");

const upload = createUploader();

router.post("/ajout", verifyToken, requireRole("admin"), upload.array("images"), create);
router.get("/list", allProduct);
router.get("/byId/:id", verifyToken, requireRole("admin"), byId);
router.get("/preview/:id", preview);
router.delete("/delete/:id", verifyToken, requireRole("admin"), deleteProduct);
router.put("/update/:id", verifyToken, requireRole("admin"), upload.array("images"), update);

module.exports = router;
