import mongoose from "mongoose";
import validator from 'validator';

const postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},
    { timestamps: true }
)

postSchema.pre('save', async function () {
    try {
        // Find the user document and update its posts array with the new post
        const user = await mongoose.model('User').findByIdAndUpdate(
            this.author,
            { $push: { posts: this._id } },
            { new: true }
        );
        console.log(user)
    } catch (err) {
        console.error(err);
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post