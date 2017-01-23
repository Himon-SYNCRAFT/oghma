const passport = require('passport')
const User = require('./schemas').User
const Book = require('./schemas').Book


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World')
    })

    app.route('/api/books')
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
}
