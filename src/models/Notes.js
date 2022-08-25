import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  important: Boolean
})

export const Note = mongoose.model('Note', noteSchema)
