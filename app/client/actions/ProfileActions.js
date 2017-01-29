const USER_GET_PROFILE = require('../constants/Constants').USER_GET_PROFILE
const USER_UPDATE = require('../constants/Constants').USER_UPDATE
const UNAUTHORIZED = require('../constants/Constants').UNAUTHORIZED
const Dispatcher = require('../Dispatcher')
const Api = require('../Api').userProfile


module.exports = {
    get: () => {
        Api.getProfile()
            .then(res => {
                Dispatcher.dispatch({
                    actionType: USER_GET_PROFILE,
                    data: res.data,
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

    update: (data) => {
        Api.updateProfile(data)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: USER_UPDATE,
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
    }
}

