const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: { type: String, required: [true, "Please provide company name"], maxlength: 60 },
    postion: { type: String, required: [true, "Please provide postion"], maxlength: 300 },
    status: { type: String, enum: ['interview', 'pending', 'declined'], default: 'pending' },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: [true, "Please provide user"] }
}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema)