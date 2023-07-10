const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated-error')
const CustomAPIError = require('./custom-error')
const NotfoundError = require('./not-found')


module.exports = { BadRequestError, UnauthenticatedError, CustomAPIError, NotfoundError }