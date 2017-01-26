const React = require('react')
const Link = require('react-router').Link
const BooksActions = require('../actions/BooksActions')
const BooksStore = require('../stores/BooksStore')
const BookCreationForm = require('./BookCreationForm.jsx')


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
            const linkTo = "/book/" + item._id
            const img = item.frontCover ? item.frontCover : 'http://localhost:3000/public/img/book-cover-example.png'
            return (<div className="col-xs-4 col-md-2" key={ item._id }><Link to={ linkTo } className="thumbnail" href="#"><img src={img} alt={ item.name } style={{maxHeight: 163}}/><span>{ item.name }</span></Link></div>)
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


module.exports = Main
