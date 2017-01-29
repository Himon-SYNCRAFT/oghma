const React = require('react')
const UserProfileActions = require('../actions/UserProfileActions')


class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: "",
            firstName: "",
            lastName: "",
            city: "",
            state: "",
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handleLastName = this.handleLastName.bind(this)
        this.handleCity = this.handleCity.bind(this)
        this.handleState = this.handleState.bind(this)
    }

    onSubmit(event) {
        event.preventDefault()
    }

    handleName(event) {
        const name = event.target.value
        this.setState({ name })
    }

    handlePassword(event) {
        const password = event.target.value
        this.setState({ password })
    }

    handleFirstName(event) {
        const firstName = event.target.value
        this.setState({ firstName })
    }

    handleLastName(event) {
        const lastName = event.target.value
        this.setState({ lastName })
    }

    handleCity(event) {
        const city = event.target.value
        this.setState({ city })
    }

    handleState(event) {
        const state = event.target.value
        this.setState({ state })
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
                <div className="form-group">
                    <label htmlFor="first_name">First name</label>
                    <input id="first_name" name="first_name" className="form-control" value={this.state.firstName} onChange={this.handleFirstName} />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last name</label>
                    <input id="last_name" name="last_name" className="form-control" value={this.state.lastName} onChange={this.handleLastName} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input id="city" name="city" className="form-control" value={this.state.city} onChange={this.handleCity} />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input id="state" name="state" className="form-control" value={this.state.state} onChange={this.handleState} />
                </div>
                <div className="form-group"><button className="btn btn-success" type="submit">Save</button></div>
            </form>
        )
    }
}


module.exports = RegisterForm
