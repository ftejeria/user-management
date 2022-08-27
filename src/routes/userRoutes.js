import express from 'express'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/get-users', async (req, res) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1

  })
  return res.send(users)
})

router.post('/add-user', async (req, res) => {
  const { username, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ username, passwordHash })
  await user.save()

  return res.status(201).send(user)
})

export { router as userRouter }
