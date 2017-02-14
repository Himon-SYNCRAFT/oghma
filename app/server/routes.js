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
                    name: 'Clean Code',
                    isbn: '0132350882',
                    frontCoverImg: 'https://images-na.ssl-images-amazon.com/images/I/41TINACY3hL._SX384_BO1,204,203,200_.jpg',
                    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship . Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code “on the fly” into a book that will instill within you the values of a software craftsman and make you a better programmer—but only if you work at it. What kind of work will you be doing? You’ll be reading code—lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly, you will be challenged to reassess your professional values and your commitment to your craft.'
                })

                let book2 = Book.build({
                    name: 'Introduction to Algorithms, 3rd Edition',
                    isbn: '0262033844',
                    frontCoverImg: 'https://images-na.ssl-images-amazon.com/images/I/41-1VkO%2B1lL._SX359_BO1,204,203,200_.jpg',
                    description: 'Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can be used as a unit of study. The algorithms are described in English and in a pseudocode designed to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.'
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
