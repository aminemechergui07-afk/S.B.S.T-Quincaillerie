const express = require("express");
const router = express.Router();
const { createUploader } = require("../config/upload");
const {
  create,
  all,
  byId,
  deleteBlog,
  update,
} = require("../controllers/blog.controller");
const { verifyToken, requireRole } = require("../config/auth/middleware");

const upload = createUploader();

router.post("/ajout", verifyToken, requireRole("admin"), upload.single("image"), create);
router.get("/list", all);
router.get("/byId/:id", verifyToken, requireRole("admin"), byId);
router.delete("/delete/:id", verifyToken, requireRole("admin"), deleteBlog);
router.put("/update/:id", verifyToken, requireRole("admin"), upload.single("image"), update);

module.exports = router;
