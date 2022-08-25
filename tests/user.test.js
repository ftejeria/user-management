import { User } from '../src/models/User'
import { addUsersToMongo, api, closeConnections, newUser } from './helper'

beforeEach(async () => {
  await User.deleteMany({})
  await addUsersToMongo()
})

describe('/add-users', () => {
  test('A user creation should return 201 and Content-Type json', async () => {
    await api.post('/users/add-user').send(newUser).expect(201).expect('Content-Type', /json/)
  })

  test('A user creation should return {id, username, notes []} as response', async () => {
    const response = await api.post('/users/add-user').send(newUser)
    const { id, username, notes } = response.body
    expect(id).not.toBeNull()
    expect(username).toBe(newUser.username)
    expect(notes).not.toBeNull()
    expect(notes.length).toBe(0)
  })
})

describe('/get-users', () => {
  test('should return 200 and list of 2 users', async () => {
    const response = await api.get('/users/get-users').expect(200)
    expect(response.body.length).toBe(2)
  })
})

afterAll(async () => {
  await closeConnections()
})
