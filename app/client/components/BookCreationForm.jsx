const React = require('react')
const BooksStore = require('../stores/BooksStore')
const BooksActions = require('../actions/BooksActions')


class BookCreationForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            imgUrl: "",
            isbn: "",
            description: "",
        }

        this.handleName = this.handleName.bind(this)
        this.handleImgUrl = this.handleImgUrl.bind(this)
        this.handleIsbn = this.handleIsbn.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleName(event) {
        const name = event.target.value
        this.setState({ name })
    }

    handleImgUrl(event) {
        const imgUrl = event.target.value
        this.setState({ imgUrl })
    }

    handleIsbn(event) {
        const isbn = event.target.value
        this.setState({ isbn })
    }

    handleDescription(event) {
        const description = event.target.value
        this.setState({ description })
    }

    handleSubmit(event) {
        event.preventDefault()

        const clear = {
            name: "",
            imgUrl: "",
            isbn: "",
            description: "",
        }

        this.setState(clear)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name" id="name" className="form-control" onChange={this.handleName} value={this.state.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="img-url">Img Url</label>
                    <input name="img-url" id="img-url" className="form-control" onChange={this.handleImgUrl} value={this.state.imgUrl} />
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input name="isbn" id="isbn" className="form-control" onChange={this.handleIsbn} value={this.state.isbn} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" cols="30" rows="10" onChange={this.handleDescription} value={this.state.description}></textarea>
                </div>
                <div className="from-group">
                    <button type="submit" className="btn btn-success" >Save</button>
                </div>
            </form>
        )
    }
}

module.exports = BookCreationForm
