const express = require('express');
const router = express.Router();
const {
  addToFavorites,
  deleteFromFavorites,
  getFavorites,
} = require("../controllers/favoritesController");
const auth = require('../middlewares/auth');

//  api/favoriteList
router.post('/', auth.check, addToFavorites)

//  api/favoriteList/:id
router.delete('/:id', auth.check, deleteFromFavorites)

//  api/favoriteList
router.get('/', auth.check, getFavorites)

module.exports = router;