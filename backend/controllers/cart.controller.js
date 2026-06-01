const Cart = require("../models/cart.model");
const { calculateCartSubtotal, getCurrentProductPrice, syncCartPrices } = require("../utils/pricing");

const ensureAuthenticatedUserMatch = (incomingUserId, authenticatedUserId) => {
  if (incomingUserId && incomingUserId !== authenticatedUserId) {
    return false;
  }

  return true;
};

const getCart = async (req, res) => {
  try {
    const authenticatedUserId = req.user._id;

    if (!ensureAuthenticatedUserMatch(req.params.userId, authenticatedUserId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const cart = await Cart.findOne({ userId: authenticatedUserId });

    if (!cart) {
      return res.status(200).json({
        userId: authenticatedUserId,
        items: [],
        totalPrice: 0,
      });
    }

    await syncCartPrices(cart);
    await cart.save();
    await cart.populate({
      path: "items.productId",
      model: "Product",
    });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};

const addToCart = async (req, res) => {
  const authenticatedUserId = req.user._id;
  const { userId, productId, quantity = 1 } = req.body;

  try {
    if (!ensureAuthenticatedUserMatch(userId, authenticatedUserId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!productId || quantity < 1) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const { product, price } = await getCurrentProductPrice(productId);

    if (!product || price === null) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: authenticatedUserId });

    if (!cart) {
      cart = new Cart({
        userId: authenticatedUserId,
        items: [],
      });
    }

    const item = cart.items.find((p) => p.productId.toString() === productId);

    if (item) {
      item.quantity += quantity;
      item.price = price;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    await syncCartPrices(cart);
    await cart.save();
    await cart.populate({
      path: "items.productId",
      model: "Product",
    });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

const updateQuantity = async (req, res) => {
  const authenticatedUserId = req.user._id;
  const { userId, productId, change } = req.body;

  try {
    if (!ensureAuthenticatedUserMatch(userId, authenticatedUserId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (![1, -1].includes(change)) {
      return res.status(400).json({ message: "change must be 1 or -1" });
    }

    const cart = await Cart.findOne({ userId: authenticatedUserId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((p) => p.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.quantity + change < 1) {
      return res.status(400).json({ message: "Minimum quantity is 1" });
    }

    item.quantity += change;
    await syncCartPrices(cart);

    await cart.save();
    await cart.populate({
      path: "items.productId",
      model: "Product",
    });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error updating quantity", error: err.message });
  }
};

const deleteItem = async (req, res) => {
  const authenticatedUserId = req.user._id;
  const { userId, productId } = req.params;

  try {
    if (!ensureAuthenticatedUserMatch(userId, authenticatedUserId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const cart = await Cart.findOne({ userId: authenticatedUserId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((p) => p.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    cart.items.splice(itemIndex, 1);
    cart.totalPrice = calculateCartSubtotal(cart.items);

    await cart.save();
    await cart.populate({
      path: "items.productId",
      model: "Product",
    });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
};

module.exports = { getCart, addToCart, updateQuantity, deleteItem };
