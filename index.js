const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db-connect");
const bookRouter = require("./routes/book-router");
const authRouter = require("./routes/auth-routes");

dotenv.config();

const app = express();

app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api", bookRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Online Book Store API is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});