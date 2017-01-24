const React = require('react')
const BooksActions = require('../actions/BooksActions')
const BooksStore = require('../stores/BooksStore')


class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            books: []
        }

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        BooksStore.addChangeListener(this.onChange)
        BooksActions.all()
    }

    componentWillUnmount() {
        BooksStore.removeChangeListener(this.onChange)
    }

    onChange() {
        const books = BooksStore.all()
        console.log(books);

        this.setState({
            books
        })
    }

    render() {
        let books = this.state.books.map(item => {
            const img = item.frontCover ? item.frontCover : 'http://localhost:3000/public/img/book-cover-example.png'
            return (<div className="col-xs-6 col-md-3" key={ item._id }><a className="thumbnail" href="#"><img src={img} alt={ item.name } /></a></div>)
        })

        return (
            <div>
                <TopMenu />
                <div className="row">
                    { books }
                </div>
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
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                            <li><a href="#">Link</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">Link</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

        module.exports = Main
