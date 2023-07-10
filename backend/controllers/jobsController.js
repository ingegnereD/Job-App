const asyncHandler = require('express-async-handler')
const Job = require("../model/jobModel")
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotfoundError } = require('../error/index')

const createJob = asyncHandler(async(req, res) => {
    req.body.createdBy = req.fish.id
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
})

const getAllJob = asyncHandler(async(req, res) => {
    const job = await Job.find({ createdBy: req.fish.id }).sort('-createdAt')
    res.status(StatusCodes.OK).json({ nbHit: job.length, createdBy: req.fish.name, job })
})

const getOneJob = asyncHandler(async(req, res) => {
    const { id: jobId } = req.params
    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new NotfoundError(`Job created by ${req.fish.name} with ID ${jobId} was not found check ID`)
    }
    res.status(StatusCodes.OK).json({ createdBy: req.fish.name, job })
})

const updateJob = asyncHandler(async(req, res) => {
    const { id: jobId } = req.params
    const job = await Job.findOneAndUpdate({ _id: jobId }, req.body, { new: true, runValidators: true })
    if (!job) {
        throw new BadRequestError(`Job with ID ${jobId} not found, check ID again`)
    }
    res.status(StatusCodes.ACCEPTED).json({ 'created by ': req.fish.name, job })
})


const deleteJob = asyncHandler(async(req, res) => {
    const { id: jobId } = req.params
    const job = await Job.findOneAndDelete({ _id: jobId })
        // if (!job) {
        //     throw new BadRequestError(`Job with ID ${jobId} not found, check ID `)
        // }
    res.status(StatusCodes.OK).send(`Job with ID ${jobId} deleted`)
})


module.exports = { getAllJob, getOneJob, createJob, updateJob, deleteJob }



module.exports = { createJob, getAllJob, getOneJob, updateJob, deleteJob }