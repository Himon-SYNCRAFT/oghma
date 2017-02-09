const passport = require('passport')
const BooksController = require('./controllers/BooksController')
const TradesController = require('./controllers/TradesController')
const AuthController = require('./controllers/AuthController')
const ProfileController = require('./controllers/ProfileController')
const { User, Book, Trade, CopyOfBook, Schema } = require('./schemas.js')


module.exports = (app) => {
    app.get('/createdb', (req, res) => {
        Schema.sync({ force: true })
            .then(() => {
                let user = User.build({
                    name: 'danzaw',
                    firstName: 'Daniel',
                    lastName: 'Zawlocki',
                    city: 'Czestochowa',
                    state: 'Silesia',
                    passwordHash: User.generateHash('danzaw')
                })

                let user2 = User.build({
                    name: 'himon',
                    firstName: 'Daniel',
                    lastName: 'Zawlocki',
                    city: 'Czestochowa',
                    state: 'Silesia',
                    passwordHash: User.generateHash('himon')
                })

                let book = Book.build({
                    name: 'Python',
                })

                let book2 = Book.build({
                    name: 'Python2',
                })

                Promise.all([user.save(), book.save(), user2.save(), book2.save()])
                    .then(([user, book]) => {
                        let copy = CopyOfBook.build({
                            userId: user.id,
                            bookId: book.id
                        })

                        let copy2 = CopyOfBook.build({
                            userId: user2.id,
                            bookId: book2.id
                        })

                        Promise.all([copy.save(), copy2.save()])
                            .then(([copy, copy2]) => {
                                Trade.create({
                                    idCopyOfBookOfferer: copy.id,
                                })
                            })
                    })

                res.end()
            })
    })

    app.route('/api/books')
        .all(isAuthenticated)
        .get(BooksController.getAllBooks)
        .post(BooksController.createBook)

    app.route('/api/book/:id')
        .all(isAuthenticated)
        .get(BooksController.getBook)

    app.route('/api/trades')
        .all(isAuthenticated)
        .get(TradesController.getAllTrades)
        .post(TradesController.createTrade)

    app.get('/api/trade/:id', isAuthenticated, TradesController.getTrade)
    app.get('/api/trade/:id/accept', isAuthenticated, TradesController.acceptTrade)
    app.get('/api/trade/:id/done', isAuthenticated, TradesController.doneTrade)
    app.put('/api/trade/:id/offerbook', isAuthenticated, TradesController.addBookToTrade)

    app.post('/api/auth/register', AuthController.register)
    app.post('/api/auth/login', passport.authenticate('local'), AuthController.login)
    app.get('/api/auth/logout', AuthController.logout)

    app.route('/api/profile')
        .all(isAuthenticated)
        .get(ProfileController.getProfile)
        .put(ProfileController.updateProfile)

    app.route('/api/profile/books')
        .all(isAuthenticated)
        .get(ProfileController.getBooks)
        .post(ProfileController.addBook)

    app.delete('/api/profile/books/:id', isAuthenticated, ProfileController.removeBook)

    app.route('/api*')
        .get(abort404)

    app.route('*')
        .get((req, res) => {
            res.sendFile(process.cwd() + '/public/index.html')
        })
}

const isAuthenticated = (req, res, next) => {
    // return next()
    if (req.isAuthenticated()) return next()
    res.status(401).end()
}

const abort404 = (req, res, next) => {
    res.status(404).end()
}
