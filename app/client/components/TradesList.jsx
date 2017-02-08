const React = require('react')
const TradesActions = require('../actions/TradesActions')
const TradesStore = require('../stores/TradesStore')
const AuthStore = require('../stores/AuthStore')

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
        this.setState({ userId: user._id })
    }

    componentWillUnmount() {
        TradesStore.removeChangeListener(this.onChange)
    }

    onChange() {
        const trades = TradesStore.all()
        this.setState({ trades })
    }

    render() {
        const listItems = this.state.trades.map(trade => <TradeListItem trade={trade} userId={this.state.userId} />)

        return (
            <ul className="list-group">
                {listItems}
            </ul>
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
        const isUserOffer = userId == trade.participantFrom.user

        const text = isUserOffer ? trade.participantTo.book.name : trade.participantFrom.book.name

        return (
            <li className="list-group-item">{ text }</li>
        )
    }
}

module.exports = TradesList
