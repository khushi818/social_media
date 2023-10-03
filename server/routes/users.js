import express from 'express'
import { addFollower, removeFollower, updateUser, getUserById, getSelf } from '../controllers/user.js'
import { protect } from '../controllers/auth.js'
import singleUpload from "../utils/multer.js";

const router = express.Router()

router.route('/:id').get(protect, getUserById)
router.route('/').patch(protect, singleUpload.single("profileImage"), updateUser)
router.route('/follow/:id').put(protect, addFollower)
router.route('/unfollow/:id').put(protect, removeFollower)
router.route('/').get(protect, getSelf)

export default router

