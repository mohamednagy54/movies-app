import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import asyncHandler from '../middlewares/asyncHandler.js'

import createToken from '../utils/createToken.js'
import { log } from 'console'

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    throw new Error('Please fill in all fields')
  }

  const userExists = await User.findOne({ email: email })

  if (userExists) res.status(400).send('User already exists')

  // hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    const token = createToken(res, newUser._id)

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    })
  } catch (error) {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new Error('Please fill in all fields')
  }

  const existingUser = await User.findOne({ email: email })

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (isPasswordValid) {
      const token = createToken(res, existingUser._id)
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } else {
    res.status(401).json({ message: 'User not Found' })
  }
})

const logCurrentUserOut = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Logged out successfully' })
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id)

  console.log(currentUser)
  if (currentUser) {
    res.json({
      _id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(req.body.password, salt)
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  createUser,
  loginUser,
  logCurrentUserOut,
  getAllUsers,
  getCurrentUserProfile,
  updateUserProfile,
}
