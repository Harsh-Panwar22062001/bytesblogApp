const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const { expressjwt: jwt } = require("express-jwt");

// Middleware
const requireSingIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// Register user
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Name, email, and password are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already registered with this email",
      });
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);
    // Create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({
      success: true,
      message: "Registration successful. Please log in.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// Login user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // Compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Generate JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Omit password from response
    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// Update user information
const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // Password validation
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }
    // Hash the password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;
    // Update user information
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          name: name || user.name,
          ...(hashedPassword && { password: hashedPassword }),
        },
      },
      { new: true }
    );
    // Omit password from response
    updatedUser.password = undefined;
    return res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error in updateUserController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  requireSingIn,
  registerController,
  loginController,
  updateUserController,
};
