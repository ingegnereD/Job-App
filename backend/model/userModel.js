const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: { type: String, require: [true, 'Please provide name'], minlength: 3, maxlength: 50 },
    email: { type: String, require: [true, 'Please provide email'], match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please provide a valid email address"], unique: true },
    password: { type: String, require: [true, 'Please provide password'], minlength: 5, maxlength: 14 },
    createdAt: { type: Date, default: Date.now }
})

// encrypting password
userSchema.pre('save', async function(next) {
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// matching password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema)