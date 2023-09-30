import jwt from 'jsonwebtoken'
import User from '../models/users.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/AppError.js'
import { promisify } from 'util'

export const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

export const signUp = catchAsync(async (req, res, next) => {
    console.log("hello@@@")
    // anyone can sign up as different role  so define body explicitly
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })


    const token = signToken(newUser._id)

    console.log(process.env.JWT_COOKIE_EXPIRES_IN, process.env.JWT_EXPIRES_IN, process.env.JWT_SECRET)

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        // secure: true,
        httpOnly: true // send along with  
    }

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

    res.cookie('jwt', token, cookieOptions)

    res.status(201).json({
        status: 'success',
        token,
    })
})

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1) Check if the email and password exists
    if (!email || !password) {
        next(new AppError('Please provide email and password', 400))
    }
    //2) Check if user exists and password is correct
    // const user  = await User.findOne({ email }).select('+password')
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new AppError("user doesn't exist", 401))
    }
    const correct = await user.correctPassword(password, user.password)

    if (!correct) {
        return next(new AppError('Incorrect password', 401))
    }
    //3) If everything is ok, send token to client
    const token = signToken(user._id)
    res.status(200).json({
        status: 'success',
        token
    })
})

export const logout = catchAsync(async (req, res, next) => {
    res.cookie("jwt", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    return res.status(200).json({
        status: "success",
        message: "logged out",
    });
})

export const protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it s there
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log(token)
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access', 401))
    }
    //2)Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.log(decoded)
    //3) check id user exists
    const currentUser = await User.findById(decoded.id)

    if (!currentUser) {
        return next(new AppError('The user belonging to the token does no longer exists', 401))
    }
    //4) check if user change password if the token was issued

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again', 401)
        )
    }

    // Grant access to protected route
    req.user = currentUser
    next()
})