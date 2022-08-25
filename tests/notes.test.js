import { Note } from '../src/models/Note'
import { addNotesToMongo, api, closeConnections, newNote } from './helper'

beforeEach(async () => {
  await Note.deleteMany({})
  await addNotesToMongo()
})

describe('/add-note', () => {
  test('note creation should return {content,important}', async () => {
    const response = await api.post('/notes/add-note').send(newNote)
    const { content, important } = response.body
    expect(content).toBe(newNote.content)
    expect(important).toBe(newNote.important)
  })
  test('note creation should return 201 and Content-type json', async () => {
    await api.post('/notes/add-note').send(newNote).expect(201).expect('Content-Type', /json/)
  })
})

afterAll(async () => {
  await closeConnections()
})
