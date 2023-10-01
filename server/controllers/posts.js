import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/AppError.js'
import Post from '../models/posts.js'

// create post 
export const createPost = catchAsync(async (req, res, next) => {

    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        author: req.user._id
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