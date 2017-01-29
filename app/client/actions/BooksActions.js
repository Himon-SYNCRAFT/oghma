const Dispatcher = require('../Dispatcher')
const constants = require('../constants/Constants')
const Api = require('../Api')


module.exports = {
    all: () => {
        Api.books.all()
            .then(res => {
                Dispatcher.dispatch({
                    actionType: constants.BOOKS_GET_ALL,
                    data: res.data
                })
            })
    },

    one: (id) => {
        Api.books.one(id)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: constants.BOOKS_GET_BY_ID,
                    data: res.data
                })
            })
    },

    create: (data) => {
        Api.books.create(data)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: constants.BOOKS_CREATE,
                    data: res.data
                })
            })
    },
};
