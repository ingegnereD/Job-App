const express = require('express')
const dotenv = require('dotenv')
const color = require('colors')
const authRoutes = require('./routes/authRoutes')
const jobRoutes = require('./routes/jobRoutes')
const connectDB = require('./config/connect')
const errorHandlerMidware = require('./middleware/errorMiddleware')
const notFound = require('./middleware/notFoundMidware')

dotenv.config()
const app = express()
app.use(express.json())

// routes
app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)

// errorMiddlewares
app.use(notFound)
app.use(errorHandlerMidware)


PORT = process.env.PORT || 5500

const start = async() => {
    try {
        await connectDB()
        app.listen(PORT, console.log(`App running on port ${PORT}`.cyan.bold))
    } catch (err) {
        console.log(err);
    }
}

start()