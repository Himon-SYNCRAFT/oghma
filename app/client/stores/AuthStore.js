const USER_LOG_IN = require('../constants/Constants').USER_LOG_IN
const USER_LOG_OUT = require('../constants/Constants').USER_LOG_OUT
const USER_GET_PROFILE = require('../constants/Constants').USER_GET_PROFILE
const USER_CREATE = require('../constants/Constants').USER_CREATE
const EventEmitter = require('events').EventEmitter
const Dispatcher = require('../Dispatcher')

const AuthStore = Object.assign({}, EventEmitter.prototype, {
    addLogInListener: function(callback) {
        this.on(USER_LOG_IN, callback)
    },

    removeLogInListener: function(callback) {
        this.removeListener(USER_LOG_IN, callback)
    },

    addLogOutListener: function(callback) {
        this.on(USER_LOG_OUT, callback)
    },

    removeLogOutListener: function(callback) {
        this.removeListener(USER_LOG_OUT, callback)
    },

    get: function() {
        if (!this.isLogged()) {
            return {}
        }

        const userid = localStorage.getItem('userid')
        const username = localStorage.getItem('username')

        return {
            name: username,
            _id: userid
        }
    },

    isLogged: function() {
        return localStorage.getItem('userid') && localStorage.getItem('username')
    }
})


Dispatcher.register(action => {
    console.log(action.actionType)

    switch(action.actionType) {
        case USER_LOG_IN:
            localStorage.setItem('userid', action.data._id)
            localStorage.setItem('username', action.data.name)
            AuthStore.emit(USER_LOG_IN)
            break

        case USER_LOG_OUT:
            localStorage.removeItem('userid')
            localStorage.removeItem('username')
            AuthStore.emit(USER_LOG_OUT)
            break

        case USER_CREATE:
            AuthStore.emit(USER_CREATE)
            break
    }
})


module.exports = AuthStore
