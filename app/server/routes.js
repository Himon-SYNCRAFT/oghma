const passport = require('passport')
const User = require('./schemas').User
const Book = require('./schemas').Book


module.exports = (app) => {
    app.route('/api/books')
        .all(isAuthenticated)
        .get((req, res) => {
            Book.find({}, (err, books) => {
                if (err) throw err
                res.json(books)
            })
        })
        .post((req, res) => {
            const book = new Book({
                name: req.body.name,
                frontCover: req.body.frontCover,
                isbn: req.body.isbn,
                description: req.body.description
            })

            book.save(err => {
                if (err) {
                    res.status(400).json(err)
                    return
                }

                res.json(book)
            })
        })

    app.route('/api/book/:id')
        .all(isAuthenticated)
        .get((req, res) => {
            Book.findById(req.params.id, (err, book) => {
                if (err) throw err
                else if (!book) {
                    return res.status(404).end()
                } else {
                    res.json(book)
                }
            })
        })

    app.post('/api/auth/register', (req, res) => {
        const name = req.body.name
        const password = req.body.password
        const city = req.body.city
        const state = req.body.state
        const first_name = req.body.first_name
        const last_name = req.body.last_name

        user = new User({
            name,
            password,
            city,
            state,
            first_name,
            last_name
        })

        user.save(err => {
            if (err) {
                res.status(400).json(err)
                return
            }

            res.json(user)
        })
    })

    app.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
        res.json(req.user)
    })

    app.get('/api/auth/logout', (req, res) => {
        req.session.destroy()
        res.end()
    })

    app.route('/api/profile')
        .all(isAuthenticated)
        .get((req, res) => {
            User.findById(req.user._id, (err, user) => {
                if (err) throw err
                res.json(user)
            })
        })
        .put((req, res) => {
            User.findById(req.user, (err, user) => {
                if (err) throw err

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

                res.json(user)
            })
        })

    app.route('/api/profile/books')
        .all(isAuthenticated)
        .get((req, res) => {
            const userId = req.user._id
            Book.find({ owners: userId }, (err, docs) => {
                if (err) throw err
                else {
                    res.json(docs)
                }
            })
        })
        .post((req, res) => {
            const bookId = req.body.id
            const userId = req.user._id

            Book.findById(bookId, (err, book) => {
                if (err) throw err
                else if (!book) {
                    res.status(404).end()
                } else {
                    book.owners.push(userId)

                    book.save(err => {
                        if (err) {
                            res.status(400).json(err)
                        } else {
                            res.json(book)
                        }
                    })
                }
            })

        })

    app.delete('/api/profile/books/:id', isAuthenticated, (req, res) => {
        const userId = req.user._id
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
    })

    app.route('/api*')
        .get(abort404)

    app.route('*')
        .get((req, res) => {
            res.sendFile(process.cwd() + '/public/index.html')
        })
}

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.status(401).end()
}

const abort404 = (req, res, next) => {
    res.status(404).end()
}
