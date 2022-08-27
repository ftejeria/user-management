import express, { json } from 'express'
import { connectDb } from './db/db.js'
import { loginRouter } from './routes/loginRoutes.js'
import { noteRouter } from './routes/noteRoutes.js'
import { userRouter } from './routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT

connectDb()

app.use(json())

app.use('/users', userRouter)
app.use('/notes', noteRouter)
app.use('/login', loginRouter)

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})

export { app, server }
