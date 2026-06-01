const mongoose = require("mongoose");
const Blog = mongoose.model("Blog", {
  title: {
    type: String,
  },

  image: {
    type: String,
  },

  description: {
    type: String,
  },

  blockquote:{
    type: String
  }
});

module.exports = Blog;
