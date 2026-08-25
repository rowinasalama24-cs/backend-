const bcryptjs = require("bcryptjs");

const User = require("../models/user-model");
const generateToken = require("../utils/get-jwt");

const signup = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      role: "student",
      imageUrl: req.file?.filename,
    });

    const token = generateToken(user);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error in signup: ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and Password are required.",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const passwordCorrect = await bcryptjs.compare(
      password,
      user.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    user.password = undefined;

    const token = generateToken(user);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error in login: ${error.message}`,
    });
  }
};

module.exports = {
  signup,
  login,
};