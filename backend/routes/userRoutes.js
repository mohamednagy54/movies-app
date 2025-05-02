import express from 'express'

// controllers
import {
  createUser,
  loginUser,
  logCurrentUserOut,
  getAllUsers,
  getCurrentUserProfile,
  updateUserProfile,
} from '../controllers/userController.js'

// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/authMiddlleware.js'

const router = express.Router()

router
  .route('/')
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post('/logout', logCurrentUserOut)

router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateUserProfile)

export default router
