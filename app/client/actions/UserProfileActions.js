const constants = require('../constants/Constants')
const Dispatcher = require('../Dispatcher')
const Api = require('../Api').userProfile


module.exports = {
    logIn: (credentials) => {
        Api.logIn(credentials)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: constants.USER_LOG_IN,
                    data: res.data,
                })
            })
    },

    logOut: () => {
        Api.logOut()
            .then(res => {
                Dispatcher.dispatch({
                    actionType: constants.USER_LOG_OUT,
                    data: res.data,
                })
            })
    },

    isLogged: () => {
        Api.logOut()
            .then(res => {
                Dispatcher.dispatch({
                    actionType: constants.USER_LOG_OUT,
                    data: res.data,
                })
            })
    }
}
