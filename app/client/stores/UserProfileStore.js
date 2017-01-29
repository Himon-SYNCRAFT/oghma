const constants = require('../constants/Constants')
const EventEmitter = require('events').EventEmitter
const Dispatcher = require('../Dispatcher')

const UserProfileStore = Object.assign({}, EventEmitter.prototype, {
    addLogInListener: function(callback) {
        this.on(constants.USER_LOG_IN, callback)
    },

    removeLogInListener: function(callback) {
        this.removeListener(constants.USER_LOG_IN, callback)
    },

    addLogOutListener: function(callback) {
        this.on(constants.USER_LOG_OUT, callback)
    },

    removeLogOutListener: function(callback) {
        this.removeListener(constants.USER_LOG_OUT, callback)
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
        case constants.USER_LOG_IN:
            localStorage.setItem('userid', action.data._id)
            localStorage.setItem('username', action.data.name)
            UserProfileStore.emit(constants.USER_LOG_IN)
            break

        case constants.USER_LOG_OUT:
            localStorage.removeItem('userid')
            localStorage.removeItem('username')
            UserProfileStore.emit(constants.USER_LOG_OUT)
            break
    }
})


module.exports = UserProfileStore
