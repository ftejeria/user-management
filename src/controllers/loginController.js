import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const validPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && validPassword)) {
    return res.status(401).send({ error: 'Invalid user or password' })
  }

  const userToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
  return res.send({ name: user.name, username: user.username, token })
}
