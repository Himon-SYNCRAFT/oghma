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

// Mongoose configuration
const connectionString = 'mongodb://tutorial:tutorial@ds151137.mlab.com:51137/clementine'
const options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
}
mongoose.connect(connectionString, options)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error:'))

// Passport configuration
passport.use(new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password'
    },

    (username, password, done) => {
        User.findOne({ name: username }, (err, user) => {
            if (err) { return done(err) }

            if (!user) {
                return done(null, false, { message: 'Incorrect name' })
            }

            user.comparePassword(password)
                .then(res => {
                    if (!res) {
                        return done(null, false, { message: 'Incorrect password' })
                    } else {
                        return done(null, user)
                    }
                })

        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

// App configuration
app.use(compression())
app.use(session({
    secret: '$2a$12$2Z.wdo.8ytoNn6b5faNAt.ywUFo5g2BmbS2FBJAUbg2iUWJc7li9q',
    resave: true,
    saveUninitialized: false
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/public', express.static(process.cwd() + '/public'))

app.use(passport.initialize())
app.use(passport.session())

routes(app)

db.once('open', () => {
    app.listen(port, () => {
        console.log('App start at port ' + port)
    })
})
