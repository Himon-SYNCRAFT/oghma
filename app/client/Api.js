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

        create: (data) => {
            return instance.post('/books', data)
        },
    }
}
