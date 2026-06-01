const New = require("../models/new.model");

const pickNewsData = (body) => {
  const allowedFields = ["title", "description", "blockquote"];
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
    let data = new New(pickNewsData(req.body));

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
    let all = await New.find();
    res.status(200).send(all);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const byId = async (req, res) => {
  try {
    let id = await New.findById(req.params.id);

    if (!id) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).send(id);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    let id = await New.findByIdAndDelete(req.params.id);

    if (!id) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).send(id);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    let data = pickNewsData(req.body);

    if (req.file) {
      data.image = req.file.filename;
    }

    let updatedNews = await New.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).send(updatedNews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { create, all, byId, deleteNews, update };
