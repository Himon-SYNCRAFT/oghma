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
                frontCover: req.body.frontCover
            })

            book.save(err => {
                if (err) {
                    res.status(400).json(err)
                    return
                }

                res.json(book)
            })
        })

    app.post('/api/auth/register', (req, res) => {
        const username = req.body.name
        const password = req.body.password

        user = new User({
            name: username,
            password
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
        res.json({ message: 'Login successful' })
    })

    app.route('/api/profile')
        .all(isAuthenticated)
        .get((req, res) => {
            User.findById(req.user, (err, user) => {
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

    app.route('/api*')
        .get(abort404)

    app.route('*')
        .get((req, res) => {
            res.sendFile(process.cwd() + '/public/index.html')
        })
}

const isAuthenticated = (req, res, next) => {
    return next()
    if (req.isAuthenticated()) return next()
    res.status(401).end()
}

const abort404 = (req, res, next) => {
    res.status(404).end()
}
