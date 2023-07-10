const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../error')
const { StatusCodes } = require("http-status-codes")

const authMiddleware = async(req, res, next) => {
    const authHeadaer = req.headers.authorization
    if (authHeadaer && authHeadaer.startsWith('Bearer')) {
        const token = authHeadaer.split(' ')[1]
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            const { id, email, name } = decode
            req.fish = { id, email, name }
            next()
        } catch (err) {
            // throw new UnauthenticatedError("No authorization to access route")
            res.status(StatusCodes.UNAUTHORIZED).send({ msg: "No authorization to access this route`" })
        }
    } else {
        // throw new Error("No token provided")
        res.status(StatusCodes.UNAUTHORIZED).send({ msg: "No token provided" })
    }
}


module.exports = authMiddleware