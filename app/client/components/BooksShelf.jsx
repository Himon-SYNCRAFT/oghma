const React = require('react')
const Link = require('react-router').Link
const BooksActions = require('../actions/BooksActions')
const BooksShelfStore = require('../stores/BooksShelfStore')


class BooksShelf extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            books: []
        }

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        BooksShelfStore.addChangeListener(this.onChange)
        BooksActions.getUserBooks()
    }

    componentWillUnmount() {
        BooksShelfStore.removeChangeListener(this.onChange)
    }

    onChange() {
        const books = BooksShelfStore.all()

        this.setState({
            books
        })
    }

    render() {
        let books = this.state.books.map(item => {
            return (<BooksListItem book={ item } key={ item._id } />)
        })

        return (
            <div>
                <div className="row">
                    { books }
                </div>
            </div>
        )
    }
}


class BooksListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const captionMaxLength = 17
        const id = this.props.book._id
        const name = this.props.book.name
        const caption = name.length > captionMaxLength ? name.substr(0, captionMaxLength - 4) + ' ...' : name
        const img = this.props.book.frontCover ? this.props.book.frontCover : 'http://localhost:3000/public/img/book-cover-example.png'
        const linkTo = "/book/" + id

        const imgStyle = {
            maxHeight: 163
        }
        const linkStyle = {
            textDecoration: "none"
        }
        const hStyle = {
            textAlign: "center"
        }

        return (
            <div className="col-xs-4 col-md-2" key={ id }>
                <Link to={ linkTo } className="thumbnail" style={ linkStyle } >
                    <img src={ img } alt={ name } style={ imgStyle } />
                    <div className="caption">
                        <h5 style={ hStyle }>{ caption }</h5>
                    </div>
                </Link>
            </div>
        )
    }
}


module.exports = BooksShelf

