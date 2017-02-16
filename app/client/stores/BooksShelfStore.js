const BOOKS_ADD_TO_USER_SHELF = require('../constants/Constants').BOOKS_ADD_TO_USER_SHELF
const BOOKS_REMOVE_FROM_USER_SHELF = require('../constants/Constants').BOOKS_REMOVE_FROM_USER_SHELF
const BOOKS_GET_USER_BOOKS = require('../constants/Constants').BOOKS_GET_USER_BOOKS
const Dispatcher = require('../Dispatcher')
const EventEmitter = require('events').EventEmitter


const CHANGE = 'CHANGE BOOKS'
let _books = []

const BooksShelfStore = Object.assign({}, EventEmitter.prototype, {
    all: () => {
        return _books
    },

    one: (id) => {
        return _books.find(book => book.id == id)
    },

    addChangeListener: function(callback) {
        this.on(CHANGE, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback)
    }
})

Dispatcher.register(action => {
    let book
    let bookIndex
    switch (action.actionType) {
        case BOOKS_GET_USER_BOOKS:
            _books = action.data.map(copy => transformCopyToBook(copy))
            BooksShelfStore.emit(CHANGE)
            break;

        case BOOKS_ADD_TO_USER_SHELF:
            book = action.data
            bookIndex = _books.findIndex(element => element.id == book.id)

            if (bookIndex === -1) {
                _books.push(book)
            } else {
                Object.assign(_books[bookIndex], book)
            }

            BooksShelfStore.emit(CHANGE)
            break;

        case BOOKS_REMOVE_FROM_USER_SHELF:
            book = action.data
            bookIndex = _books.findIndex(element => element.id == book.id)

            if (bookIndex !== -1) {
                _books.splice(bookIndex, 1)
            }

            BooksShelfStore.emit(CHANGE)
            break;
    }
})

const transformCopyToBook = (copy) => {
    let book = copy.book
    book.owners = copy.owners

    return book
}

module.exports = BooksShelfStore

