import mongoose from 'mongoose'

// Everything in Mongoose starts with a Schema(the structure of a particular document).
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  passwordHash: String,
  notes: [{
    type: mongoose.Types.ObjectId,
    ref: 'Note'
  }]

})

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
    delete returnObject.__v
    delete returnObject.passwordHash
  }
})

// Model, interface for interacting with the database
export const User = mongoose.model('User', userSchema)
