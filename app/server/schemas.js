const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

const tradeStates = {
    OFFERED: 'offered',
    ACCEPTED: 'accepted',
    COMPLETED: 'completed',
    CANCELED: 'canceled',
}

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

userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password
        return ret
    }
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

// Books
const bookSchema = new Schema({
    name: { type: String, required: true },
    frontCover: String,
    description: String,
    isbn: { type: String, unique: true },
    owners: [String],
})

const Book = mongoose.model('Book', bookSchema)

// Trades
const tradeSchema = new Schema({
    participantFrom: {
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        book: { type: Schema.Types.ObjectId, ref: 'Book' },
        accepted: { type: Boolean, default: false },
        done: { type: Boolean, default: false },
    },
    participantTo: {
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        book: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
        accepted: { type: Boolean, default: false },
        done: { type: Boolean, default: false },
    },
    canceled: { type: Boolean, default: false }
})

tradeSchema.virtual('status').get(() => {
    let status = tradeStates.OFFERED

    if (this.participantFrom.accepted && this.participantTo.accepted) {
        status = tradeStates.ACCEPTED
    } else if (this.participantFrom.done && this.participantTo.done) {
        status = tradeStates.COMPLETED
    } else if (this.canceled) {
        status = tradeStates.CANCELED
    }

    return status
})

tradeSchema.set('toJSON', {
    virtuals: true,
})

const Trade = mongoose.model('Trade', tradeSchema)

module.exports = {
    User,
    Book,
    Trade
}
