const USER_GET_PROFILE = require('../constants/Constants').USER_GET_PROFILE
const USER_UPDATE = require('../constants/Constants').USER_UPDATE
const EventEmitter = require('events').EventEmitter
const Dispatcher = require('../Dispatcher')

const CHANGE = 'CHANGE'
let _profile = {}

const ProfileStore = Object.assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback)
    },

    get: function() {
        return _profile
    },
})


Dispatcher.register(action => {
    switch(action.actionType) {
        case USER_GET_PROFILE:
            _profile = action.data
            ProfileStore.emit(CHANGE)
            break

        case USER_UPDATE:
            _profile = action.data
            ProfileStore.emit(CHANGE)
            break
    }
})


module.exports = ProfileStore

