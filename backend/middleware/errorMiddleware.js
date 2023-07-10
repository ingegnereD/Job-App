const CustomAPIError = require('../error/custom-error')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMidware = (err, req, res, next) => {

    let customError = {
            // set default
            statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            msg: err.message || 'Somethine went wrong, try again later'

        }
        // if (err instanceof CustomAPIError) {
        //     return res.status(err.statusCode).json({ msg: err.message })
        // }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        customError.statusCode = 400
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
        err.keyValue
    )} field, please choose another value`
        customError.statusCode = 400
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return res.status(customError.statusCode).json({ msg: customError.msg })

}


module.exports = errorHandlerMidware