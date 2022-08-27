import mongoose from 'mongoose'
import supertest from 'supertest'
import { app, server } from '../src/app'
import { Note } from '../src/models/Note'
import { User } from '../src/models/User'

export const api = supertest(app)

export const closeConnections = async () => {
  await mongoose.connection.close()
  server.close()
}

export const addUsersToMongo = async () => {
  for (const user of initialUsers) {
    const userObject = new User(user)
    await userObject.save()
  }
}
export const addNotesToMongo = async () => {
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
}

export const initialUsers = [{
  username: 'user_test_1',
  password: '123456'
},
{
  username: 'user_test_2',
  password: '123456'
}]

export const newUser = {
  username: 'user_test_3',
  password: '123456'
}

export const initialNotes = [{
  content: 'test content 1',
  important: true
},
{
  content: 'test content 2',
  important: false
}]

export const newNote = {
  content: 'new note content',
  important: true,
  userId: ''
}
