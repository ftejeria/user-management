import express from 'express'
import { Note } from '../models/Note.js'

const router = express.Router()

router.post('/add-note', async (req, res) => {
  const { content, important } = req.body
  const note = new Note({ content, important })
  await note.save()
  return res.status(201).send(note)
})

export { router as noteRouter }
