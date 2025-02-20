const express = require('express');
const { register, login, logout } = require('../controller/authcontroller');
const { isauthenticated } = require('../middleware/authmiddleware');
const router = express.Router();
 router.route('/register').post(register)
 router.route('/login').post(login)
 router.route('/logout').get(isauthenticated,logout)

 module.exports = router