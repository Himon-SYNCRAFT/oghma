const BOOKS_GET_ALL = require('../constants/Constants').BOOKS_GET_ALL
const BOOKS_GET_BY_ID = require('../constants/Constants').BOOKS_GET_BY_ID
const BOOKS_CREATE = require('../constants/Constants').BOOKS_CREATE
const BOOKS_ADD_TO_USER_SHELF = require('../constants/Constants').BOOKS_ADD_TO_USER_SHELF
const BOOKS_REMOVE_FROM_USER_SHELF = require('../constants/Constants').BOOKS_REMOVE_FROM_USER_SHELF
const Dispatcher = require('../Dispatcher')
const EventEmitter = require('events').EventEmitter


const CHANGE = 'CHANGE'
let _books = []

const BooksStore = Object.assign({}, EventEmitter.prototype, {
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
        case BOOKS_GET_ALL:
            _books = action.data
            BooksStore.emit(CHANGE)
            break;

        case BOOKS_CREATE:
            BooksStore.emit(CHANGE)
            break;

        case BOOKS_GET_BY_ID:
            book = action.data
            bookIndex = _books.findIndex(element => element.id == book.id)

            if (bookIndex === -1) {
                _books.push(book)
            } else {
                Object.assign(_books[bookIndex], book)
            }

            BooksStore.emit(CHANGE)
            break;

        case BOOKS_ADD_TO_USER_SHELF:
        case BOOKS_REMOVE_FROM_USER_SHELF:
            book = action.data
            bookIndex = _books.findIndex(element => element.id == book.id)

            if (bookIndex === -1) {
                _books.push(book)
            } else {
                Object.assign(_books[bookIndex], book)
            }

            BooksStore.emit(CHANGE)
            break;
    }
})


module.exports = BooksStore
