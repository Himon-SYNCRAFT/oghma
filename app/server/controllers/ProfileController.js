const User = require('../schemas').User
const Book = require('../schemas').Book
const CopyOfBook = require('../schemas').CopyOfBook


module.exports = {
    getProfile: (req, res) => {
        User
            .findById(req.user.id, {
                attributes: { exclude: 'passwordHash' }
            })
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    updateProfile: (req, res) => {
        User.findById(req.user.id)
            .then(user => {
                if (req.body.name) {
                    user.name = req.body.name
                }

                if (req.body.password) {
                    user.password = req.body.password
                }

                if (req.body.city) {
                    user.city = req.body.city
                }

                if (req.body.state) {
                    user.state = req.body.state
                }

                if (req.body.first_name) {
                    user.first_name = req.body.first_name
                }

                if (req.body.last_name) {
                    user.last_name = req.body.last_name
                }

                user.save()
                    .then(user => {
                        res.json(user)
                    })
                    .catch(err => {
                        res.status(400).json(err)
                    })
            })
    },

    getBooks: (req, res) => {
        const userId = req.user.id

        CopyOfBook
            .findAll({
                where: { userId },
                include: [
                    { model: Book, as: 'book' }
                ]
            })
            .then(books => {
                res.json(books)
            })
            .catch(err => {
                res.status(400).end()
            })
    },

    addBook: (req, res) => {
        const bookId = req.body.id
        const userId = req.user.id

        CopyOfBook
            .findOrCreate({
                where: { userId, bookId },
                include: [
                    { model: Book, as: 'book' }
                ]
            })
            .then((book, created) => {
                let status = 200
                if (created) {
                    status = 201
                }

                res.status(status).json(book)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    removeBook: (req, res) => {
        const userId = req.user.id
        const bookId = req.params.id

        CopyOfBook
            .destroy({
                where: { userId, bookId }
            })
            .then(book => {
                res.json(book)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },
}
