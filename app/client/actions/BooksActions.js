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
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Dispatcher.dispatch({
                                actionType: constants.UNAUTHORIZED,
                                data: err.response.data
                            })
                            break;

                        default:
                            console.log(err.response.data);
                    }
                } else {
                    console.log('Error', error.message)
                }
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
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Dispatcher.dispatch({
                                actionType: constants.UNAUTHORIZED,
                                data: err.response.data
                            })
                            break;

                        default:
                            console.log(err.response.data);
                    }
                } else {
                    console.log('Error', error.message)
                }
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
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Dispatcher.dispatch({
                                actionType: constants.UNAUTHORIZED,
                                data: err.response.data
                            })
                            break;

                        default:
                            console.log(err.response.data);
                    }
                } else {
                    console.log('Error', error.message)
                }
            })
    },
};
