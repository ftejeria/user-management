import express, { json } from 'express'
import { connectDb } from './db/db.js'
import { userRouter } from './routes/userRoutes.js'

const app = express()

connectDb()

app.use(json())

app.use('/users', userRouter)

const server = app.listen(process.env.PORT, () => {
  console.log('Server on port 3000')
})

export { app, server }
