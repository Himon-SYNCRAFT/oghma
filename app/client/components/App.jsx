const React = require('react')
const Link = require('react-router').Link


class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <TopMenu />
                { this.props.children }
            </div>
        )
    }
}

class TopMenu extends React.Component {
    constructor() {
        super()
    }

    render() {
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

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/books/add">Add New Book</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="#">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

module.exports = App
