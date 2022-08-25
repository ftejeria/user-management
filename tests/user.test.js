import mongoose from 'mongoose'
import supertest from 'supertest'
import { app, server } from '../src/app'
import { User } from '../src/models/User'
import { initialUsers, newUser } from './helper'

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  for (const user of initialUsers) {
    const userObject = new User(user)
    await userObject.save()
  }
})

describe('/add-users', () => {
  test('A user creation should return 201 and Content-Type json', async () => {
    await api.post('/users/add-user').send(newUser).expect(201).expect('Content-Type', /json/)
  })

  test('A user creation should return {id, username, notes []}', async () => {
    const response = await api.post('/users/add-user').send(newUser)
    const { id, username, notes } = response.body
    expect(id).not.toBeNull()
    expect(username).toBe(newUser.username)
    expect(notes).not.toBeNull()
    expect(notes.length).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
