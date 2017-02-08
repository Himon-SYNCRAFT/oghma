const Book = require('../schemas.js').Book


module.exports = {
    getAllBooks: (req, res) => {
        Book.findAll()
            .then(books => {
                res.json(books)
            })
            .catch(err => {
                res.status(500).end()
                throw err
            })
    },

    createBook: (req, res) => {
        Book
            .create({
                name: req.body.name,
                frontCoverImg: req.body.frontCover,
                isbn: req.body.isbn,
                description: req.body.description
            })
            .then(book => {
                res.json(book)
            })
            .catch(err => {
                res.json(err)
            })
    },

    getBook: (req, res) => {
        Book.findById(req.params.id)
            .then(book => {
                if (!book) {
                    res.status(404).end()
                } else {
                    res.json(book)
                }
            })
            .catch(err => {
                res.json(err)
            })
    }
}

