import express from 'express'
import mongoose from 'mongoose'
import { Note } from '../models/Note.js'
import { User } from '../models/User.js'

const router = express.Router()

router.post('/add-note', async (req, res) => {
  const { content, important, userId } = req.body
  if (!userId) {
    return res.status(400).send({ message: 'Missing param user_id' })
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: 'Invalid param user_id' })
  }

  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }

  const note = new Note({ content, important, user: user._id })
  await note.save()

  user.notes = user.notes.concat(note._id)
  await user.save()

  return res.status(201).send(note)
})

export { router as noteRouter }
