const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const { calculateCartSubtotal, syncCartPrices } = require("../utils/pricing");

const SHIPPING_FEE = 7;

const createOrder = async (req, res) => {
  const authenticatedUserId = req.user._id;
  const { userId, shippingDetails = {} } = req.body;

  try {
    if (userId && userId !== authenticatedUserId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const cart = await Cart.findOne({ userId: authenticatedUserId });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Panier vide" });
    }

    await syncCartPrices(cart);

    if (!cart.items.length) {
      await Cart.findOneAndDelete({ userId: authenticatedUserId });
      return res.status(400).json({ message: "Panier vide" });
    }

    cart.totalPrice = calculateCartSubtotal(cart.items);
    await cart.save();

    const items = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const sanitizedShippingDetails =
      shippingDetails && typeof shippingDetails === "object" ? shippingDetails : {};

    const order = new Order({
      userId: authenticatedUserId,
      items,
      totalAmount: cart.totalPrice + SHIPPING_FEE,
      shippingDetails: sanitizedShippingDetails,
      status: "En attente",
    });

    await order.save();
    await Cart.findOneAndDelete({ userId: authenticatedUserId });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Erreur creation commande", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name lastName email tel")
      .populate("items.productId", "name prix images")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la recuperation des commandes", error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    let deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.status(200).send(deletedOrder);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors Delete Order", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Erreur mise a jour statut", error: err.message });
  }
};

module.exports = { createOrder, getAllOrders, deleteOrder, updateOrderStatus };
