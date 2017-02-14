const express = require('express')
const compression = require('compression')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./app/server/schemas').User
const routes = require('./app/server/routes')

const app = express()
const port = process.env.PORT || 3000


// Passport configuration
passport.use(new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password'
    },

    (username, password, done) => {
        User.find({ name: username })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username' })
                }

                const isValidPassword = User.comparePassword(password, user.passwordHash)

                if (isValidPassword) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Incorrect password' })
                }
            })
            .catch(err => {
                if (err) { return done(err) }
            })
    }
))

passport.serializeUser((user, done) => {
    // console.log('serializeUser', user.id);
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    // console.log('deserializeUser', id);
    User.findById(id)
        .then(user => {
            done(null, user)
        })
        .catch(err => {
            done(err)
        })
})

// App configuration
app.use(cors())
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

app.listen(port, () => {
    console.log('App start at port ' + port)
})
