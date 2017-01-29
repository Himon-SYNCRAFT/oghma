const React = require('react')
const Link = require('react-router').Link
const UserProfileStore = require('../stores/UserProfileStore')
const UserProfileActions = require('../actions/UserProfileActions')
const browserHistory = require('react-router').browserHistory


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user:  {},
            isLogged: false
        }

        this.onLogIn = this.onLogIn.bind(this)
        this.onLogOut = this.onLogOut.bind(this)
    }

    componentDidMount() {
        UserProfileStore.addLogInListener(this.onLogIn)
        UserProfileStore.addLogOutListener(this.onLogOut)

        const isLogged = UserProfileStore.isLogged()

        if (isLogged) {
            this.setState({
                user: UserProfileStore.get(),
                isLogged
            })
        }
    }

    componentWillUnmount() {
        UserProfileStore.removeLogInListener(this.onLogIn)
        UserProfileStore.removeLogOutListener(this.onLogOut)
    }

    onLogIn() {
        const user = UserProfileStore.get()
        this.setState({ user, isLogged: true })
    }

    onLogOut() {
        this.setState({ user: {}, isLogged: false })
    }


    render() {
        return (
            <div>
                <TopMenu isLogged={ this.state.isLogged } user={ this.state.user } />
                { this.props.children }
            </div>
        )
    }
}

class TopMenu extends React.Component {
    constructor(props) {
        super(props)

        this.onClickLogOut = this.onClickLogOut.bind(this)
    }

    onClickLogOut(event) {
        event.preventDefault()
        UserProfileActions.logOut()
        browserHistory.push('/')
    }

    render() {
        const isLogged = this.props.isLogged
        const user = this.props.user
        const navbar = isLogged
            ? (
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/books/add">Add New Book</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#" onClick={ this.onClickLogOut }>Log Out</a></li>
                        <li><Link to="/profile">{ user.name }</Link></li>
                    </ul>
                </div>
            )
            : (
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/auth/login">Login</Link></li>
                        <li><Link to="/auth/register">Register</Link></li>
                    </ul>
                </div>
            )
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Oghma</Link>
                    </div>
                    { navbar }
                </div>
            </nav>
        )
    }
}

module.exports = App
