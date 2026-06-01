const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  lastName: user.lastName,
  tel: user.tel,
  email: user.email,
  image: user.image,
  date: user.date,
  role: user.role,
});

const createAdmin = async () => {
  try {
    if (!process.env.EMAIL || !process.env.PASS || !process.env.SECRET_KEY) {
      console.log("Admin bootstrap skipped: missing environment variables");
      return;
    }

    let existadmin = await User.find({ role: "admin" });
    if (existadmin.length === 0) {
      let data = {
        name: "Amine Admin",
        email: process.env.EMAIL,
        tel: process.env.TEL,
        password: process.env.PASS,
        image: "admin.jpg",
        role: "admin",
        date: new Date(),
      };
      let admin = new User(data);
      admin.password = bcrypt.hashSync(data.password, 10);

      await admin.save();
      console.log("Admin created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, lastName, tel, email, password } = req.body;

    let user = new User({ name, lastName, tel, email, password });
    user.password = bcrypt.hashSync(password, 10);
    user.role = "user";
    user.date = new Date();

    let result = await user.save();
    res.status(201).json(sanitizeUser(result));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "email or password invalid" });
    }

    let validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return res.status(401).send({ message: "email or password invalid" });
    }

    let payload = {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      tel: user.tel,
      email: user.email,
      date: user.date,
      role: user.role,
    };

    let token = jwt.sign(payload, process.env.SECRET_KEY);
    res.status(200).send({ myToken: token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const allowedFields = ["name", "lastName", "tel", "email", "password"];
    const data = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    }

    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    if (req.file) {
      data.image = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, createAdmin, login, getUserById, update };
