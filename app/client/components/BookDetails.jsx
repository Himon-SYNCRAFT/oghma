const React = require('react')
const BooksStore = require('../stores/BooksStore')
const AuthStore = require('../stores/AuthStore')
const BooksActions = require('../actions/BooksActions')


class BookDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            book: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onClickAddBookToShelf = this.onClickAddBookToShelf.bind(this)
        this.onClickRemoveBookFromShelf = this.onClickRemoveBookFromShelf.bind(this)
    }

    componentDidMount() {
        BooksStore.addChangeListener(this.onChange)
        BooksActions.one(this.props.params.id)

        const user = AuthStore.get()
        this.setState({ userId: user.id })
    }

    componentWillUnmount() {
        BooksStore.removeChangeListener(this.onChange)
    }

    onChange() {
        const id = this.props.params.id
        const book = BooksStore.one(id)
        this.setState({ book })
    }

    onClickAddBookToShelf() {
        const bookId = this.state.book.id
        BooksActions.addBookToShelf(bookId)
    }

    onClickRemoveBookFromShelf() {
        const bookId = this.state.book.id
        BooksActions.removeBookFromShelf(bookId)
    }

    render() {
        const name = this.state.book.name
        const frontCover = this.state.book.frontCover
        const isbn = this.state.book.isbn
        const description = this.state.book.description
        const owners = this.state.book.owners
        const userId = this.state.userId

        const isBookInUserShelf = (owners && owners.indexOf(userId) === -1) ? false : true

        let buttonText = 'Add to my shelf'
        let buttonOnClick  = this.onClickAddBookToShelf
        let buttonClass = "btn btn-success"

        if (isBookInUserShelf) {
            buttonText = 'Remove from my shelf'
            buttonOnClick = this.onClickRemoveBookFromShelf
            buttonClass = "btn btn-danger"
        }

        return (
            <div>
                <h2>{ name }</h2>
                <img src={ frontCover } />
                <p>ISBN: { isbn }</p>
                <h3>Description</h3>
                <p>{ description }</p>
                <button className={ buttonClass } onClick={ buttonOnClick }>{ buttonText }</button>
            </div>
        )
    }
}


module.exports = BookDetails
