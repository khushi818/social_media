import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const likeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
})


likeSchema.method('checkStatus', async function (status, likedBy, postId) {
    try {
        if (status === false) {
            const removeUserlike = await mongoose.model('likes').deleteOne({ likedBy, postId })
            if (!removeUserlike) {
                return new AppError("no data found", 404)
            }
        }
        return
    }
    catch (err) {
        console.log(err)
    }
})

const Likes = mongoose.model('likes', likeSchema)

export default Likes