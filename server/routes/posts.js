import express from 'express'
import { createPost, getAllPost, getUserPost, delelePost, likepost, addComment, deleteComment, getAllComment } from '../controllers/posts.js'
import { protect } from '../controllers/auth.js'
const router = express.Router()

router.route('/').post(protect, createPost)
router.route('/').get(getAllPost)
router.route('/:id').get(protect, getUserPost)
router.route('/:id').delete(protect, delelePost)
router.route('/like').post(protect, likepost)
router.route('/comment').post(protect, addComment)
router.route('/comment/:id').delete(protect, deleteComment)
router.route('/comment/:id').get(protect, getAllComment)

export default router