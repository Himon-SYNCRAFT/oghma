const React = require('react')
const BooksStore = require('../stores/BooksStore')
const BooksActions = require('../actions/BooksActions')


class BookDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        BooksStore.addChangeListener(this.onChange)
        BooksActions.one(this.props.params.id)
    }

    componentWillUnmount() {
        BooksStore.removeChangeListener(this.onChange)
    }

    onChange() {
        const id = this.props.params.id
        const book = BooksStore.one(id)
        this.setState(book)
    }

    render() {
        const name = this.state.name
        const frontCover = this.state.frontCover
        const isbn = this.state.isbn
        const description = this.state.description

        return (
            <div>
                <h2>{ name }</h2>
                <img src={ frontCover } />
                <p>ISBN: { isbn }</p>
                <h3>Description</h3>
                <p>{ description }</p>
            </div>
        )
    }
}


module.exports = BookDetails
