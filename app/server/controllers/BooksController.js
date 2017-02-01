const Book = require('../schemas').Book


module.exports = {
    getAllBooks: (req, res) => {
        Book.find({}, (err, books) => {
            if (err) throw err
            res.json(books)
        })
    },

    createBook: (req, res) => {
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
    },

    getBook: (req, res) => {
        Book.findById(req.params.id, (err, book) => {
            if (err) throw err
            else if (!book) {
                return res.status(404).end()
            } else {
                res.json(book)
            }
        })
    }
}

