
import { addNotesToMongo, addUsersToMongo, api, closeConnections, newNote, authTestUser } from './helper'

beforeEach(async () => {
  await addUsersToMongo()
  await addNotesToMongo()
})

describe('/add-note', () => {
  test('An auth user should be able to create a note, return 201 and Content-type json', async () => {
    const token = await authTestUser()
    await api.post('/notes/add-note').send(newNote).set({ Authorization: `Bearer ${token}` }).expect(201).expect('Content-Type', /json/)
  })

  test('note creation should return {content,important}', async () => {
    const token = await authTestUser()
    const response = await api.post('/notes/add-note').send(newNote).set({ Authorization: `Bearer ${token}` })
    const { content, important } = response.body
    expect(content).toBe(newNote.content)
    expect(important).toBe(newNote.important)
  })

  test('An unAuth user should not be able to create a note', async () => {
    const response = await api.post('/notes/add-note').send(newNote).set({ Authorization: 'Bearer 1234' }).expect(401).expect('Content-Type', /json/)
    const { error } = response.body
    expect(error).toBe('Invalid token')
  })
})

afterAll(async () => {
  await closeConnections()
})
