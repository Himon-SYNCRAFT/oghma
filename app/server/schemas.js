const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Users
const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    city: { type: String, required: true },
    state: String
})

const User = mongoose.model('User', userSchema)

// Books
const bookSchema = new Schema({
    name: { type: String, required: true },
    frontCover: String,
})

const Book = mongoose.model('Book', bookSchema)

module.exports = {
    User,
    Book,
}
