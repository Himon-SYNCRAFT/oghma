const constants = require('../constants/Constants')
const Dispatcher = require('../dispatcher/Dispatcher')
const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')


const CHANGE = 'CHANGE BOOKS'
let _books = []

const BooksStore = assign({}, EventEmitter.prototype, {
    all: () => {
        return _books
    },

    one: (id) => {
        return _books.find(book => book._id = id)
    },

    addChangeListener: function(callback) {
        this.on(CHANGE, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback)
    }
})

Dispatcher.register(action => {
    switch (action.actionType) {
        case constants.BOOKS_GET_ALL:
            _books = action.data
            BooksStore.emit(CHANGE)
            break;

        case constants.BOOKS_CREATE:
            BooksStore.emit(CHANGE)
            break;
    }
})


module.exports = BooksStore
