const React = require('react')
const BooksStore = require('../stores/BooksStore')
const BooksShelfStore = require('../stores/BooksShelfStore')
const AuthStore = require('../stores/AuthStore')
const BooksActions = require('../actions/BooksActions')
const TradesActions = require('../actions/TradesActions')


class BookDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            book: null
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
        if (this.state.book === null) {
            return null
        }

        const name = this.state.book.name
        const frontCover = this.state.book.frontCoverImg
        const isbn = this.state.book.isbn
        const description = this.state.book.description
        const owners = this.state.book.owners
        const userId = this.state.userId
        const bookId = this.props.params.id

        const isBookInUserShelf = (owners && owners.findIndex(user => user.id == userId) === -1) ? false : true

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
                <h3>{name} <button className={ buttonClass } onClick={ buttonOnClick }>{ buttonText }</button></h3>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Details
                    </div>
                    <div className="panel-body">
                        <p style={{maxWidth: 200}}>
                            <img className="img-responsive" src={ frontCover } />
                        </p>
                        <p>ISBN: { isbn }</p>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Description
                    </div>
                    <div className="panel-body">
                        { description }
                    </div>
                </div>
                <OwnersList owners={owners} userId={this.state.userId} bookId={bookId} onClickOfferTrade={this.onClickOfferTrade} />
            </div>
        )
    }
}

class OwnersList extends React.Component {
    constructor(props) {
        super(props)
    }

    onClickOfferTrade(userId) {
        const bookId = this.props.bookId
        TradesActions.create(bookId, userId)
    }

    render() {
        const owners = this.props.owners
        const userId = this.props.userId

        if (!owners || !owners.length) {
            return null
        }

        const ownersList = owners.map(owner => {
            let button = ''
            if (owner.id != userId) {
                button = <button className="btn btn-default" onClick={this.onClickOfferTrade.bind(this, owner.id)}>Offer Trade</button>
            }
            return <li key={owner.id} className="list-group-item">{owner.name} {button}</li>
        })


        return (
            <div className="panel panel-default">
                <div className="panel-heading">Owners</div>
                <div className="panel-body">
                    <ul className="list-group">
                        {ownersList}
                    </ul>
                </div>
            </div>
        )
    }
}


module.exports = BookDetails
