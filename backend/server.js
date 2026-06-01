const express = require("express");
const cors = require("cors");
require("./config/connect");
require("dotenv").config();

const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const boardRoute = require("./routes/board.route");
const carouselRoute = require("./routes/carousel.route");
const blogRoute = require("./routes/blog.route");
const newsRoute = require ("./routes/news.route.js");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/board", boardRoute);
app.use("/carousel", carouselRoute);
app.use("/blog", blogRoute);
app.use("/news", newsRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.use("/images", express.static('./uploads'));

const { createAdmin } = require("./controllers/user.controller");

app.listen(5000, () => {
  console.log("server work :)");
  createAdmin();
});
