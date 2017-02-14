const React = require('react')

class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }

        this.onClickToggle = this.onClickToggle.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
        this.onClickHide = this.onClickHide.bind(this)
    }

    onClickToggle(e) {
        e.preventDefault()
        const isOpen = !this.state.isOpen
        this.setState({ isOpen })
    }

    onMouseLeave() {
        this.setState({ isOpen: false })
    }

    onClickHide(e) {
        this.setState({ isOpen: false })
    }

    render() {
        const items = this.props.items.map((item, index) => <li onClick={this.onClickHide} key={index}>{item}</li>)
        const title = this.props.title
        let className = 'dropdown'

        if (this.state.isOpen) {
            className += ' open'
        }

        return (
            <li className={className} onMouseLeave={this.onMouseLeave}>
                <a onClick={this.onClickToggle} href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded={this.state.isOpen}>
                    {title}<span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                    {items}
                </ul>
            </li>
        )
    }
}

module.exports = Dropdown
