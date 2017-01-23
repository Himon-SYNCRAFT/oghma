const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./app/server/schemas').User
const routes = require('./app/server/routes')

const app = express()
const port = process.env.PORT || 3000
const connectionString = 'mongodb://tutorial:tutorial@ds151137.mlab.com:51137/clementine'

mongoose.connect(connectionString)
mongoose.Promise = global.Promise
const db = mongoose.connection

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ name: username }, (err, user) => {
        if (err) { return done(err) }

        if (!user) {
            return done(null, false, { message: 'Incorrect name' })
        }
    })
}))

app.use(compression())
app.use(session({
    secret: '$2a$12$2Z.wdo.8ytoNn6b5faNAt.ywUFo5g2BmbS2FBJAUbg2iUWJc7li9q',
    resave: true,
    saveUninitialized: false
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/public', express.static(process.cwd() + '/public'))

routes(app)

app.listen(port, () => {
    console.log('App start at port ' + port)
})
