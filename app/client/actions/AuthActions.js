const USER_LOG_IN = require('../constants/Constants').USER_LOG_IN
const USER_LOG_OUT = require('../constants/Constants').USER_LOG_OUT
const USER_GET_PROFILE = require('../constants/Constants').USER_GET_PROFILE
const USER_CREATE = require('../constants/Constants').USER_CREATE
const Dispatcher = require('../Dispatcher')
const Api = require('../Api').userProfile


module.exports = {
    logIn: (credentials) => {
        Api.logIn(credentials)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: USER_LOG_IN,
                    data: res.data,
                })
            })
    },

    logOut: () => {
        Api.logOut()
            .then(res => {
                Dispatcher.dispatch({
                    actionType: USER_LOG_OUT,
                    data: res.data,
                })
            })
    },

    isLogged: () => {
        Api.logOut()
            .then(res => {
                Dispatcher.dispatch({
                    actionType: USER_LOG_OUT,
                    data: res.data,
                })
            })
    },

    register: (data) => {
        Api.register(data)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: USER_CREATE,
                    data: res.data
                })
            })
    }
}
