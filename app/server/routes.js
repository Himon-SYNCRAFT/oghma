const User = require('./schemas').User
const Book = require('./schemas').Book


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World')
    })
}
