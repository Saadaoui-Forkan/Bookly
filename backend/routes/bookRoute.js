const express = require('express');
const photoUpload = require('../middlewares/photoUpload');
const { createBook } = require('../controllers/bookController');
const router = express.Router();
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');

//  api/books
router.post('/',auth.check, admin.check, photoUpload.single("image"), createBook)

module.exports = router;