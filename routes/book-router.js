const express = require("express");
const multer = require("multer");
const {protect, authorize }= require("../middleware/auth-middleware.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = require("path").extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/book-controllers");

// Create Book
router.post(
  "/books",
  protect,
  upload.single("image"),
  (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.path;
    }
    next();
  },
  createBook
);

// Get All Books
router.get("/books",protect, getBooks);

// Get Book By ID
router.get("/books/:id", getBookById);

// Update Book
router.patch(
  "/books/:id",
  protect,
  upload.single("image"),
  (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.path;
    }
    next();
  },
  updateBook
);

// Delete Book
router.delete("/books/:id",protect, deleteBook);

module.exports = router;