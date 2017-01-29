const axios = require('axios')
let instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000
})

module.exports = {
    books: {
        all: () => {
            return instance.get('/books')
        },

        one: (id) => {
            return instance.get('/book/' + id)
        },

        create: (data) => {
            return instance.post('/books', data)
        },
    },

    userProfile: {
        logIn: (credentials) => {
            return instance.post('/auth/login', credentials)
        },

        logOut: () => {
            return instance.get('/auth/logout')
        },

        register: (credentials) => {
            return instance.post('/auth/register', credentials)
        },

        isLogged: () => {
            return instance.get('/auth/islogged')
        },

        getProfile: () => {
            return instance.get('/profile')
        },

        updateProfile: (data) => {
            return instance.put('/profile', data)
        }
    }
}
