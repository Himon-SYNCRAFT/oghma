const Dispatcher = require('../dispatcher/Dispatcher')
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
