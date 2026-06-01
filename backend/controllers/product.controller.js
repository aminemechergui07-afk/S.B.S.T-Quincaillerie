const Product = require("../models/product.model");
const { normalizePriceInput } = require("../utils/pricing");

const getUploadedImages = (files = []) => files.map((file) => file.filename);

const pickProductData = (body) => {
  const allowedFields = ["name", "prix", "description", "status", "board"];
  const data = {};

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }
  }

  if (body.prix !== undefined) {
    const normalizedPrice = normalizePriceInput(body.prix);

    if (normalizedPrice === null) {
      throw new Error("Invalid product price");
    }

    data.prix = normalizedPrice;
  }

  return data;
};

const create = async (req, res) => {
  try {
    let data = new Product(pickProductData(req.body));
    data.images = getUploadedImages(req.files);
    data.date = new Date();

    let result = await data.save();
    res.status(200).send(result);
  } catch (error) {
    const statusCode = error.message === "Invalid product price" ? 400 : 500;
    res.status(statusCode).send({ message: error.message });
  }
};

const allProduct = async (req, res) => {
  try {
    let all = await Product.find();
    res.status(200).send(all);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const preview = async (req, res) => {
  try {
    let allPreview = await Product.findById({ _id: req.params.id }).populate({
      path: "board",
      modal: "Board",
    });

    res.status(200).send(allPreview);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const byId = async (req, res) => {
  try {
    let id = await Product.findById(req.params.id);

    if (!id) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).send(id);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let id = await Product.findByIdAndDelete(req.params.id);

    if (!id) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).send(id);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    let data = pickProductData(req.body);
    const uploadedImages = getUploadedImages(req.files);

    if (uploadedImages.length > 0) {
      data.images = uploadedImages;
    }

    const updateProduct = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).send(updateProduct);
  } catch (error) {
    const statusCode = error.message === "Invalid product price" ? 400 : 500;
    res.status(statusCode).send({ message: error.message });
  }
};

module.exports = { create, allProduct, preview, byId, deleteProduct, update };
