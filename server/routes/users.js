import express from 'express'
import { addFollower, removeFollower } from '../controllers/user.js'
import { protect } from '../controllers/auth.js'
const router = express.Router()

router.route('/follow/:id').put(protect, addFollower)
router.route('/unfollow/:id').put(protect, removeFollower)

export default router

