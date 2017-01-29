const EventEmitter = require('events').EventEmitter
const Dispatcher = require('../Dispatcher')
const UNAUTHORIZED = require('../constants/Constants').UNAUTHORIZED


const ErrorStore = Object.assign({}, EventEmitter.prototype, {
    addUnauthorizedListener: function(callback) {
        this.on(UNAUTHORIZED, callback)
    },

    removeUnauthorizedListener: function(callback) {
        this.removeListener(UNAUTHORIZED, callback)
    }
})

Dispatcher.register(action => {
    switch (action.actionType) {
        case UNAUTHORIZED:
            ErrorStore.emit(UNAUTHORIZED)
            break
    }
})


module.exports = ErrorStore
