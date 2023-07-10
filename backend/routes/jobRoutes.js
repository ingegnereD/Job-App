const express = require('express')
const authMiddleware = require("../middleware/authMiddleware")
const { getAllJob, getOneJob, createJob, updateJob, deleteJob } = require('../controllers/jobsController')

const router = express.Router()

router.route('/').post(authMiddleware, createJob).get(authMiddleware, getAllJob)

router.route('/:id').get(authMiddleware, getOneJob).patch(authMiddleware, updateJob).delete(authMiddleware, deleteJob)


module.exports = router