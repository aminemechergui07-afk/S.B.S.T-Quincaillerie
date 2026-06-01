const Carousel = require("../models/carousel.model");

const pickCarouselData = (body) => {
  const allowedFields = ["title", "text"];
  const data = {};

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }
  }

  return data;
};

const create = async (req, res) => {
  try {
    let data = new Carousel(pickCarouselData(req.body));

    if (req.file) {
      data.image = req.file.filename;
    }

    let result = await data.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const all = async (req, res) => {
  try {
    let all = await Carousel.find();
    res.status(200).send(all);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const byId = async (req, res) => {
  try {
    let id = await Carousel.findById(req.params.id);

    if (!id) {
      return res.status(404).json({ message: "Carousel not found" });
    }

    res.status(200).send(id);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteCarousel = async (req, res) => {
  try {
    let id = await Carousel.findByIdAndDelete(req.params.id);

    if (!id) {
      return res.status(404).json({ message: "Carousel not found" });
    }

    res.status(200).send(id);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    let data = pickCarouselData(req.body);

    if (req.file) {
      data.image = req.file.filename;
    }

    let updateCarousel = await Carousel.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updateCarousel) {
      return res.status(404).json({ message: "Carousel not found" });
    }

    res.status(200).send(updateCarousel);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { create, all, byId, deleteCarousel, update };
