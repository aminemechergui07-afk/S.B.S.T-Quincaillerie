const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/order.controller");
const { verifyToken, requireRole } = require("../config/auth/middleware");

router.post("/create", verifyToken, createOrder);
router.get("/all", verifyToken, requireRole("admin"), getAllOrders);
router.delete("/delete/:id", verifyToken, requireRole("admin"), deleteOrder);
router.put("/update-status/:id", verifyToken, requireRole("admin"), updateOrderStatus);

module.exports = router;
