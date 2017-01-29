const React = require('react')
const AuthActions = require('../actions/AuthActions')
const AuthStore = require('../stores/AuthStore')


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: "",
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
    }

    onSubmit(event) {
        event.preventDefault()
        const credentials = {
            name: this.state.name,
            password: this.state.password
        }

        AuthActions.logIn(credentials)
    }

    handleName(event) {
        const name = event.target.value
        this.setState({ name })
    }

    handlePassword(event) {
        const password = event.target.value
        this.setState({ password })
    }

    render() {
        return (
            <form action="" method="post" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" className="form-control" value={this.state.name} onChange={this.handleName} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" className="form-control" type="password" value={this.state.password} onChange={this.handlePassword} />
                </div>
                <div className="form-group"><button className="btn btn-success" type="submit">Save</button></div>
            </form>
        )
    }
}


module.exports = LoginForm
