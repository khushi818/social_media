import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

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
        required: [true, 'Please provide a password'],
        type: String,
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
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    console.log("hello@@@")
    this.password = await bcrypt.hash(this.password, 12)
    console.log(this.password)
    next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", userSchema)

export default User