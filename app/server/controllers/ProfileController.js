const User = require('../schemas').User
const Book = require('../schemas').Book


module.exports = {
    getProfile: (req, res) => {
        User.findById(req.user.id, {
            attributes: { exclude: 'passwordHash' }
        })
            .then(user => {
                res.json(user)
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
            })
    },

    getBooks: (req, res) => {
        const userId = req.user.id
        Book.find({ owners: userId })
            .then(books => {
                res.json(books)
            })
    },

    addBook: (req, res) => {
        const bookId = req.body.id
        const userId = req.user.id

        Book.findById(bookId).then(book => {
            if (!book) {
                res.status(404).end()
            } else {
                book.owners.push(userId)

                book.save()
                    .then(book => {
                        res.json(book)
                    })
                    .catch(err => {
                        res.status(400).json(err)
                    })
            }
        })

    },

    removeBook: (req, res) => {
        const userId = req.user.id
        const bookId = req.params.id

        Book.findById(bookId, (err, book) => {
            if (err) throw err
            else if (!book) {
                res.status(404).end()
            } else {
                const indexToDelete = book.owners.indexOf(userId)

                if (indexToDelete !== -1) {
                    book.owners.splice(indexToDelete, 1)
                }

                book.save(err => {
                    if (err) {
                        res.status(400).json(err)
                    } else {
                        res.json(book)
                    }
                })
            }
        })
    },
}
