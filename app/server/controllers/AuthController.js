const User = require('../schemas').User

module.exports = {
    register: (req, res) => {
        const name = req.body.name
        const password = req.body.password
        const city = req.body.city
        const state = req.body.state
        const first_name = req.body.first_name
        const last_name = req.body.last_name

        const user = new User({
            name,
            password,
            city,
            state,
            first_name,
            last_name
        })

        user.save(err => {
            if (err) {
                res.status(400).json(err)
                return
            }

            res.json(user)
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
