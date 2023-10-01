import User from "../models/users.js";
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/AppError.js'

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