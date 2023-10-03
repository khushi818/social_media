import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/AppError.js'
import Post from '../models/posts.js'
import Likes from '../models/likes.js'
import Comments from '../models/comments.js'

// create post 
export const createPost = catchAsync(async (req, res, next) => {

    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        author: req.user._id,
    })

    res.status(201).json({
        status: 'success',
        data: post
    })
})

// get all post
export const getAllPost = catchAsync(async (req, res, next) => {
    const allpost = await Post.find()

    if (!allpost) {
        return next(new AppError("posts not found", 404))
    }

    res.status(200).json({
        status: "success",
        data: allpost
    })
})

// get user posts
export const getUserPost = catchAsync(async (req, res, next) => {
    const allUserpost = await Post.findOne({ author: req.params.id })

    if (!allUserpost) {
        return next(new AppError("user has no post", 404))
    }

    res.status(200).json({
        status: 'success',
        allUserpost
    })
})


//delete post by id
export const delelePost = catchAsync(async (req, res, next) => {
    const deletePost = await Post.findByIdAndDelete(req.params.id)

    if (!deletePost) {
        next(new AppError('post not found', 400))
    }

    res.status(200).json({
        status: 'success',
        delelePost
    })
})

// Likes 
export const likepost = catchAsync(async (req, res, next) => {

    const existingLike = await Likes.findOne({ postId: req.body.postId, userId: req.body.userId, })

    if (existingLike) {
        existingLike.status = !existingLike.status
        await existingLike.save()
    }
    else {
        await Likes.create({
            postId: req.body.postId,
            userId: req.body.userId,
            likedBy: req.user._id,
            status: req.body.status
        })
    }

    const data = await Likes.findOne({ postId: req.body.postId, likedBy: req.user._id })
    console.log(data)

    // if status is false then delete the data 
    await data.checkStatus(data.status, data.likedBy, data.postId)

    res.status(200).json({
        status: 'sucess',
        data
    })
})

// add comments
export const addComment = catchAsync(async (req, res, next) => {
    const postComment = await Comments.create({
        postId: req.body.postId,
        userId: req.user._id,
        comment: req.body.comment
    })

    res.status(201).json({
        status: 'success',
        postComment
    })
})

export const deleteComment = catchAsync(async (req, res, next) => {
    const deleteComment = await Comments.findByIdAndDelete(req.params.id)

    if (!deleteComment) {
        return new AppError('comment not found', 404)
    }

    res.status(200).json({
        status: "success",
        deleteComment
    })
})

