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

        one: (bookId) => {
            return instance.get('/book/' + bookId)
        },

        create: (data) => {
            return instance.post('/books', data)
        },

        addBookToShelf: (bookId) => {
            return instance.post('/profile/books/', { id: bookId })
        },

        removeBookFromShelf: (bookId) => {
            return instance.delete('/profile/books/' + bookId)
        },

        getUserBooks: () => {
            return instance.get('/profile/books')
        }
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
    },

    trades: {
        all: () => {
            return instance.get('/trades')
        },

        one: (tradeId) => {
            return instance.get('/trade/' + tradeId)
        },

        create: (bookId, offerReceiverId) => {
            return instance.post('/trades', {
                bookId,
                offerReceiverId
            })
        },

        accept: (tradeId) => {
            return instance.get('/trade/' + tradeId + '/accept')
        },

        done: (tradeId) => {
            return instance.get('/trade/' + tradeId + '/done')
        },

        offerBook: (tradeId, bookId) => {
            return instance.put('/trade/' + tradeId + '/offerbook', {
                bookId
            })
        }
    }
}
