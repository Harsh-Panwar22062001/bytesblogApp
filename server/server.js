const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Configure CORS middleware
app.use(cors({
  origin: "http://localhost:8081", // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  preflightContinue: false, // Disable preflightContinue to allow CORS middleware to handle OPTIONS requests
  optionsSuccessStatus: 204 // Set the status code for successful OPTIONS requests to 204
}));

// Parse incoming JSON requests
app.use(express.json());

// Log HTTP requests
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", require("./routes/userRoutes"));

// Port
const PORT = process.env.PORT || 8089;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.white);
});
