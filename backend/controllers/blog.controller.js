const Blog = require("../models/blog.model");

const pickBlogData = (body) => {
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
    let data = new Blog(pickBlogData(req.body));

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
    let all = await Blog.find();
    res.status(200).send(all);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const byId = async (req, res) => {
  try {
    let id = await Blog.findById(req.params.id);

    if (!id) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).send(id);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    let id = await Blog.findByIdAndDelete(req.params.id);

    if (!id) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).send(id);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    let data = pickBlogData(req.body);

    if (req.file) {
      data.image = req.file.filename;
    }

    let updatedBlog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).send(updatedBlog);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { create, all, byId, deleteBlog, update };
