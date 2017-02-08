const TRADES_GET_ALL = require('../constants/Constants').TRADES_GET_ALL
const TRADES_GET_ONE = require('../constants/Constants').TRADES_GET_ONE
const TRADES_CREATE = require('../constants/Constants').TRADES_CREATE
const TRADES_ACCEPT = require('../constants/Constants').TRADES_ACCEPT
const TRADES_DONE = require('../constants/Constants').TRADES_DONE
const TRADES_OFFER_BOOK = require('../constants/Constants').TRADES_OFFER_BOOK
const UNAUTHORIZED = require('../constants/Constants').UNAUTHORIZED
const Api = require('../Api')
const Dispatcher = require('../Dispatcher')


module.exports = {
    all: () => {
        Api.trades.all()
            .then(res => {
                Dispatcher.dispatch({
                    actionType: TRADES_GET_ALL,
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
        Api.trades.one(id)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: TRADES_GET_ONE,
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

    create: (bookId, offerReceiverId) => {
        Api.trades.create(bookId, offerReceiverId)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: TRADES_CREATE,
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

    acceptTrade: (tradeId) => {
        Api.trades.accept(tradeId)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: TRADES_ACCEPT,
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

    doneTrade: (tradeId) => {
        Api.trades.done(tradeId)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: TRADES_DONE,
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

    offerBook: (tradeId, bookId) => {
        Api.trades.done(tradeId, bookId)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: TRADES_OFFER_BOOK,
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
