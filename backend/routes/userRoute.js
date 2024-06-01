const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const router = express.Router();
const auth = require('../middlewares/auth');

//  api/users/register
router.post('/register', registerUser)

//  api/users/login
router.post('/login', loginUser)

//  api/users/me
router.get('/me', auth.check, getMe)


module.exports = router;