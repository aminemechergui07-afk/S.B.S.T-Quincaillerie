const express = require("express");
const router = express.Router();

const { getCart, addToCart, updateQuantity, deleteItem } = require("../controllers/cart.controller");
const { verifyToken } = require("../config/auth/middleware");

router.get("/getCart/:userId", verifyToken, getCart);
router.post("/ajout", verifyToken, addToCart);
router.put("/update", verifyToken, updateQuantity);
router.delete("/delete/:userId/:productId", verifyToken, deleteItem);

module.exports = router;
