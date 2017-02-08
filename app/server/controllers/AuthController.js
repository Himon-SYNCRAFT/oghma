const User = require('../schemas').User

module.exports = {
    register: (req, res) => {
        const city = req.body.city
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const name = req.body.name
        const password = req.body.password
        const state = req.body.state

        let user = User.build({
            city,
            firstName,
            lastName,
            name,
            state,
            passwordHash: User.generateHash(passwod)
        })

        user.save()
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                res.json(err)
            })
    },

    login: (req, res) => {
        res.json(req.user)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.end()
    },
}
