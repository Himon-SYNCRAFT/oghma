const TRADES_GET_ALL = require('../constants/Constants').TRADES_GET_ALL
const TRADES_GET_ONE = require('../constants/Constants').TRADES_GET_ONE
const TRADES_CREATE = require('../constants/Constants').TRADES_CREATE
const TRADES_ACCEPT = require('../constants/Constants').TRADES_ACCEPT
const TRADES_DONE = require('../constants/Constants').TRADES_DONE
const TRADES_OFFER_BOOK = require('../constants/Constants').TRADES_OFFER_BOOK
const Dispatcher = require('../Dispatcher')
const EventEmitter = require('events').EventEmitter


const CHANGE = 'CHANGE'
let _trades = []

const TradesStore = Object.assign({}, EventEmitter.prototype, {
    all: () => {
        return _trades
    },

    one: (id) => {
        return _trades.find(trade => trade.id == id)
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
        case TRADES_GET_ALL:
            _trades = action.data.map(trade => apiDataToTrade(trade))

            TradesStore.emit(CHANGE)
            break;

        case TRADES_CREATE:
            TradesStore.emit(CHANGE)
            break;

        case TRADES_GET_ONE:
        case TRADES_ACCEPT:
        case TRADES_DONE:
            const trade = apiDataToTrade(action.data)
            const tradeIndex = _trades.findIndex(element => element.id == trade.id)

            if (tradeIndex === -1) {
                _trades.push(trade)
            } else {
                Object.assign(_trades[tradeIndex], trade)
            }

            TradesStore.emit(CHANGE)
            break;
    }
})

const apiDataToTrade = trade => {

    let offerer = {
        userId: null,
        idCopyOfBook: trade.idCopyOfBookOfferer,
        accept: trade.offererAccept,
        done: trade.offererDone,
        book: null
    }

    if (trade.offererBook) {
        offerer['book'] = {
            id: trade.offererBook.id,
            title: trade.offererBook.book.name,
            frontCoverImg: trade.offererBook.book.frontCoverImg,
            description: trade.offererBook.book.description,
            isbn: trade.offererBook.book.isbn,
        }

        offerer['userId'] = trade.offererBook.userId
    }

    let receiver = {
        userId: null,
        idCopyOfBook: trade.idCopyOfBookReceiver,
        accept: trade.receiverAccept,
        done: trade.receiverDone,
        book: null
    }

    if (trade.receiverBook) {
        receiver['book'] = {
            id: trade.receiverBook.id,
            title: trade.receiverBook.book.name,
            frontCoverImg: trade.receiverBook.book.frontCoverImg,
            description: trade.receiverBook.book.description,
            isbn: trade.receiverBook.book.isbn,
        }

        receiver['userId'] = trade.receiverBook.userId
    }

    return {
        offerer,
        receiver,
        id: trade.id,
        isCanceled: trade.isCanceled,
    }
}


module.exports = TradesStore
