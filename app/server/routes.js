const passport = require('passport')
const BooksController = require('./controllers/BooksController')
const TradesController = require('./controllers/TradesController')
const AuthController = require('./controllers/AuthController')
const ProfileController = require('./controllers/ProfileController')


module.exports = (app) => {
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
    if (req.isAuthenticated()) return next()
    res.status(401).end()
}

const abort404 = (req, res, next) => {
    res.status(404).end()
}
