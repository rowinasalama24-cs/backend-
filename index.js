const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db-connect");
const bookRouter = require("./routes/book-router");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Online Book Store API is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});