const Product = require("../models/product.model");

const normalizePriceInput = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  let normalized = value.trim().replace(/\s/g, "");

  if (!normalized) {
    return null;
  }

  const dotCount = (normalized.match(/\./g) || []).length;
  const commaCount = (normalized.match(/,/g) || []).length;

  if (dotCount > 1) {
    normalized = normalized.replace(/\.(?=.*\.)/g, "");
  } else if (commaCount > 1) {
    normalized = normalized.replace(/,(?=.*,)/g, "");
  }

  if (normalized.includes(",") && normalized.includes(".")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  } else if (normalized.includes(",")) {
    normalized = normalized.replace(",", ".");
  }

  const parsedValue = Number(normalized);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return null;
  }

  return parsedValue;
};

const calculateCartSubtotal = (items = []) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const getCurrentProductPrice = async (productId) => {
  const product = await Product.findById(productId).select("prix");

  if (!product) {
    return { product: null, price: null };
  }

  const price = normalizePriceInput(product.prix);
  return { product, price };
};

const syncCartPrices = async (cart) => {
  if (!cart) {
    return cart;
  }

  if (!Array.isArray(cart.items) || cart.items.length === 0) {
    cart.totalPrice = 0;
    return cart;
  }

  const productIds = cart.items.map((item) => item.productId.toString());
  const products = await Product.find({ _id: { $in: productIds } }).select("prix");

  const priceMap = new Map();

  for (const product of products) {
    const normalizedPrice = normalizePriceInput(product.prix);

    if (normalizedPrice !== null) {
      priceMap.set(product._id.toString(), normalizedPrice);
    }
  }

  cart.items = cart.items.filter((item) => priceMap.has(item.productId.toString()));

  for (const item of cart.items) {
    item.price = priceMap.get(item.productId.toString());
  }

  cart.totalPrice = calculateCartSubtotal(cart.items);
  return cart;
};

module.exports = {
  normalizePriceInput,
  calculateCartSubtotal,
  getCurrentProductPrice,
  syncCartPrices,
};
