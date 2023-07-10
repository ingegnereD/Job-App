const asyncHandler = require('express-async-handler')
const User = require("../model/userModel")
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../error')
const generateToken = require('../config/generateToken')

const register = asyncHandler(async(req, res, next) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).send({ user })
})

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError("Please enter email and password")
    }
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.status(StatusCodes.ACCEPTED).json({ name: user.name, email: user.email, token: generateToken(user._id, user.name, user.email) })
    } else {
        throw new UnauthenticatedError("Incorrect  Email or Password")
    }

})

const getUser = asyncHandler(async(req, res) => {
    const user = await User.find({})
    res.status(200).json({ nbHit: user.length, user })
})


module.exports = { register, login, getUser }