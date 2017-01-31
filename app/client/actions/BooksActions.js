const Dispatcher = require('../Dispatcher')
const UNAUTHORIZED = require('../constants/Constants').UNAUTHORIZED
const BOOKS_GET_ALL = require('../constants/Constants').BOOKS_GET_ALL
const BOOKS_GET_BY_ID = require('../constants/Constants').BOOKS_GET_BY_ID
const BOOKS_CREATE = require('../constants/Constants').BOOKS_CREATE
const BOOKS_ADD_TO_USER_SHELF = require('../constants/Constants').BOOKS_ADD_TO_USER_SHELF
const BOOKS_REMOVE_FROM_USER_SHELF = require('../constants/Constants').BOOKS_REMOVE_FROM_USER_SHELF
const BOOKS_GET_USER_BOOKS = require('../constants/Constants').BOOKS_GET_USER_BOOKS
const Api = require('../Api')


module.exports = {
    all: () => {
        Api.books.all()
            .then(res => {
                Dispatcher.dispatch({
                    actionType: BOOKS_GET_ALL,
                    data: res.data
                })
            })
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Dispatcher.dispatch({
                                actionType: UNAUTHORIZED,
                                data: err.response.data
                            })
                            break;

                        default:
                            console.log(err.response.data);
                    }
                } else {
                    console.log('Error', err.message)
                }
            })
    },

    one: (id) => {
        Api.books.one(id)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: BOOKS_GET_BY_ID,
                    data: res.data
                })
            })
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Dispatcher.dispatch({
                                actionType: UNAUTHORIZED,
                                data: err.response.data
                            })
                            break;

                        default:
                            console.log(err.response.data);
                    }
                } else {
                    console.log('Error', err.message)
                }
            })
    },

    create: (data) => {
        Api.books.create(data)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: BOOKS_CREATE,
                    data: res.data
                })
            })
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Dispatcher.dispatch({
                                actionType: UNAUTHORIZED,
                                data: err.response.data
                            })
                            break;

                        default:
                            console.log(err.response.data);
                    }
                } else {
                    console.log('Error', err.message)
                }
            })
    },

    addBookToShelf: (bookId) => {
        Api.books.addBookToShelf(bookId)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: BOOKS_ADD_TO_USER_SHELF,
                    data: res.data
                })
            })
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Dispatcher.dispatch({
                                actionType: UNAUTHORIZED,
                                data: err.response.data
                            })
                            break;

                        default:
                            console.log(err.response.data);
                    }
                } else {
                    console.log('Error', err.message)
                }
            })
    },

    removeBookFromShelf: (bookId) => {
        Api.books.removeBookFromShelf(bookId)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: BOOKS_REMOVE_FROM_USER_SHELF,
                    data: res.data
                })
            })
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Dispatcher.dispatch({
                                actionType: UNAUTHORIZED,
                                data: err.response.data
                            })
                            break;

                        default:
                            console.log(err.response.data);
                    }
                } else {
                    console.log('Error', err.message)
                }
            })
    },

    getUserBooks: () => {
        Api.books.getUserBooks()
            .then(res => {
                Dispatcher.dispatch({
                    actionType: BOOKS_GET_USER_BOOKS,
                    data: res.data
                })
            })
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Dispatcher.dispatch({
                                actionType: UNAUTHORIZED,
                                data: err.response.data
                            })
                            break;

                        default:
                            console.log(err.response.data);
                    }
                } else {
                    console.log('Error', err.message)
                }
            })
    },
};
