import express from 'express'
import { createPost, getAllPost, getUserPost, delelePost } from '../controllers/posts.js'
import { protect } from '../controllers/auth.js'
const router = express.Router()

router.route('/').post(protect, createPost)
router.route('/').get(getAllPost)
router.route('/:id').get(protect, getUserPost)
router.route('/:id').delete(protect, delelePost)

export default router