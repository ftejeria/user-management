import express from 'express'
import { addNote } from '../controllers/noteController.js'
import { userAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.post('/add-note', userAuth, addNote)

export { router as noteRouter }
