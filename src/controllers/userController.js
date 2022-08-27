import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

export const getUserController = async (req, res) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1

  })
  return res.send(users)
}

export const addUserController = async (req, res) => {
  const { name, username, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ name, username, passwordHash })
  await user.save()

  return res.status(201).send(user)
}
