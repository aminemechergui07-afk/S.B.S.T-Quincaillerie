const Board = require("../models/board.model");

const REVIEW_POPULATE_FIELDS = "name lastName image";

const createBoard = async (req, res) => {
  try {
    let data = new Board({
      message: req.body.message,
      stars: req.body.stars,
      product: req.body.product,
      userId: req.user._id,
    });
    data.date = new Date();

    let result = await data.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    let all = await Board.find()
      .populate("userId", REVIEW_POPULATE_FIELDS)
      .sort({ date: -1 });

    res.status(200).send(all);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const byId = async (req, res) => {
  try {
    let productId = req.params.id;

    let reviews = await Board.find({ product: productId })
      .populate("userId", REVIEW_POPULATE_FIELDS)
      .sort({ date: -1 });

    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const review = await Board.findById(req.params.id);

    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }

    const isOwner = review.userId && review.userId.toString() === req.user._id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).send({ message: "Access denied" });
    }

    const updatePayload = {};

    if (req.body.message !== undefined) {
      updatePayload.message = req.body.message;
    }

    if (req.body.stars !== undefined) {
      updatePayload.stars = req.body.stars;
    }

    const updateBoard = await Board.findByIdAndUpdate(req.params.id, updatePayload, {
      new: true,
      runValidators: true,
    }).populate("userId", REVIEW_POPULATE_FIELDS);

    res.status(200).send(updateBoard);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { createBoard, list, byId, update };
