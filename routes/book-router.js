const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

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
router.get("/books", getBooks);

// Get Book By ID
router.get("/books/:id", getBookById);

// Update Book
router.patch(
  "/books/:id",
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
router.delete("/books/:id", deleteBook);

module.exports = router;