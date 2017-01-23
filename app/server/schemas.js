const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

// Users
const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: String,
    last_name: String,
    city: String,
    state: String
})

userSchema.pre('save', function(next) {
    let user = this

    if (!user.isModified('password')) return next()

    bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
        if (err) return next(err)

        user.password = hash
        next()
    })
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password)
}

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
