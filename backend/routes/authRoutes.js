const express = require('express')
const { login, register, getUser } = require('../controllers/authController')
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/').get(authMiddleware, getUser)

module.exports = router