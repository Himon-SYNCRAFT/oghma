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
        return _trades.find(trade => trade._id == id)
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
            _trades = action.data
            TradesStore.emit(CHANGE)
            break;

        case TRADES_CREATE:
            TradesStore.emit(CHANGE)
            break;

        case TRADES_GET_ONE:
        case TRADES_ACCEPT:
        case TRADES_DONE:
            const trade = action.data
            const tradeIndex = _trades.findIndex(element => element._id == trade._id)

            if (tradeIndex === -1) {
                _trades.push(trade)
            } else {
                Object.assign(_trades[tradeIndex], trade)
            }

            TradesStore.emit(CHANGE)
            break;
    }
})


module.exports = TradesStore
