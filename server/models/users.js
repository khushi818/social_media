const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

//name, email, password ,profileImage,bio, active 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name"]
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    profileImage: {
        type: String,
    },
    bio: {
        type: String
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    this.password = bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
    next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}