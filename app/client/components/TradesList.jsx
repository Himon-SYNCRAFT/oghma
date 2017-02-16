const React = require('react')
const TradesActions = require('../actions/TradesActions')
const TradesStore = require('../stores/TradesStore')
const AuthStore = require('../stores/AuthStore')
const { Link } = require('react-router')

class TradesList  extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            trades:  [],
            userId: ""
        }

        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        TradesStore.addChangeListener(this.onChange)
        TradesActions.all()

        const user = AuthStore.get()
        this.setState({ userId: user.id })
    }

    componentWillUnmount() {
        TradesStore.removeChangeListener(this.onChange)
    }

    onChange() {
        const trades = TradesStore.all()
        this.setState({ trades })
    }

    render() {
        const listItems = this.state.trades.map(trade => <TradesListItem key={trade.id} trade={trade} userId={this.state.userId} />)

        return (
            <div className="list-group">
                {listItems}
            </div>
        )
    }
}


class TradesListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const trade = this.props.trade
        const userId = this.props.userId
        const isUserOffer = userId == trade.offerer.id

        const offererBookTitle = trade.offerer.book ? trade.offerer.book.title : ''
        const receiverBookTitle = trade.receiver.book ? trade.receiver.book.title : ''

        const userBookTitle = isUserOffer ? offererBookTitle : receiverBookTitle
        const otherBookTitle = !isUserOffer ? offererBookTitle : receiverBookTitle

        const text = userBookTitle + ' for ' + otherBookTitle

        return (
            <Link className="list-group-item" to={'/trade/' + trade.id}>{ text }</Link>
        )
    }
}

module.exports = TradesList
