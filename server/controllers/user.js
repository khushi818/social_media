import User from "../models/users.js";
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/AppError.js'
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

export const updateUser = catchAsync(async (req, res, next) => {
    const file = req.file;

    const fileUri = getDataUri(file);


    const result = await cloudinary.v2.uploader.upload(fileUri.content, {
        folder: "users",
    }, (err, result) => console.log(err));

    if (!result) {
        next(new AppError("image is not uploaded", 400))
    }

    const updateUser = await User.findByIdAndUpdate(req.user.id, {
        profileImage: {

            public_id: result.public_id,
            url: result.secure_url,
        },
        ...req.body
    }, { new: true })

    res.status(200).json({
        status: 'success',
        updateUser
    })
})

export const getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate({
        path: "posts",
        model: "Post",
    }).populate('followers')
        .populate('following')

    if (!user) {
        return next(new AppError('user not found', 404))
    }

    res.status(200).json({
        status: 'sucesss',
        user
    })
})

export const getSelf = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id }).populate({
        path: "posts",
        model: "Post",
    }).populate('followers')
        .populate('following')

    if (!user) {
        return next(new AppError('user not found', 404))
    }

    res.status(200).json({
        status: 'sucesss',
        user
    })
})


export const addFollower = catchAsync(async (req, res, next) => {
    const OtherUser = await User.findById(req.params.id)

    if (!OtherUser) {
        return new AppError("user not found", 404)
    }

    const UserToFollow = OtherUser.following.includes(req.user.id)

    if (UserToFollow) {
        return next(new AppError("user is already being followed", 400))
    }

    const followers = await User.findByIdAndUpdate(OtherUser._id, {
        $push: { followers: req.user._id }
    }, { new: true })

    const following = await User.findByIdAndUpdate(req.user.id, {
        $push: { following: OtherUser._id }
    }, { new: true })

    res.status(200).json({
        status: 'success',
        followers,
        following
    })
})

export const removeFollower = catchAsync(async (req, res, next) => {
    const OtherUser = await User.findById(req.params.id)

    if (!OtherUser) {
        return new AppError("user not found", 404)
    }

    const UserToUnFollow = req.user.following.includes(OtherUser._id)
    console.log(UserToUnFollow)
    if (!UserToUnFollow) {
        return next(new AppError("user is not being followed", 400))
    }

    const removefollowing = await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: OtherUser._id }
    }, { new: true })

    const removefollower = await User.findByIdAndUpdate(OtherUser._id, {
        $pull: { followers: req.user._id }
    }, { new: true })

    res.status(200).json({
        status: 'success',
        removefollower,
        removefollowing
    })
})