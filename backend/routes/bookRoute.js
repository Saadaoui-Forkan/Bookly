const express = require('express');
const photoUpload = require('../middlewares/photoUpload');
const {
  createBook,
  getBooks,
  findBook,
  deleteBook,
  updateBook,
  updateBookImage,
  addReview,
  getReviews,
} = require("../controllers/bookController");
const router = express.Router();
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');

//  api/books
router.post('/',auth.check, admin.check, photoUpload.single("image"), createBook)

//  api/books
router.get('/', getBooks)

//  api/books/:id
router.get('/:id', auth.check, findBook)

//  api/books/:id
router.delete('/:id', auth.check, admin.check, deleteBook)

//  api/books/:id
router.put('/:id', auth.check, admin.check, updateBook)

//  api/books/update-image/:id
router.put(
  "/update-image/:id",
  auth.check,
  admin.check,
  photoUpload.single("image"),
  updateBookImage
);

//  api/books/:id/reviews
router.post('/:id/reviews', auth.check, addReview)

//  api/books/:id/reviews
router.get('/:id/reviews', getReviews)

module.exports = router;