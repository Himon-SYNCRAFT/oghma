const React = require('react')
const TradesStore = require('../stores/TradesStore')
const TradesActions = require('../actions/TradesActions')


class TradeDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trade: null,
            userId: ""
        }

        this.onChange = this.onChange.bind(this)
        this.onClickAcceptTrade = this.onClickAcceptTrade.bind(this)
        this.onClickDoneTrade = this.onClickDoneTrade.bind(this)
        this.onClickCancelTrade = this.onClickCancelTrade.bind(this)
        this.onClickAddBook = this.onClickAddBook.bind(this)
    }

    componentDidMount() {
        const tradeId = this.props.params.id
        TradesStore.addChangeListener(this.onChange)
        TradesActions.one(tradeId)

        const user = AuthStore.get()
        this.setState({ userId: user.id })
    }

    componentWillUnmount() {
        TradesStore.removeChangeListener(this.onChange)
    }

    onChange() {
        const tradeId = this.props.params.id
        const trade = TradesStore.one(tradeId)
        this.setState({ trade })
    }

    onClickAcceptTrade() {

    }

    onClickDoneTrade() {

    }

    onClickCancelTrade() {

    }

    onClickAddBook() {

    }

    render() {
        const trade = this.state.trade

        if (trade === null) {
            return null
        }

        const offerer = trade.offerer
        const offererName = offerer.firstName + ' ' + offerer.lastName + ' (' + offerer.name + ')'
        const offererAccept = trade.offererAccept ? 'Yes' : 'No'
        const offererDone = trade.offererDone ? 'Yes' : 'No'
        const offererBookTitle = trade.offerer.book ? trade.offerer.book.title : '-'

        const receiver = trade.receiver
        const receiverName = receiver.firstName + ' ' + receiver.lastName + ' (' + receiver.name + ')'
        const receiverAccept = trade.receiverAccept ? 'Yes' : 'No'
        const receiverDone = trade.receiverDone ? 'Yes' : 'No'
        const receiverBookTitle = trade.receiver.book ? trade.receiver.book.title : '-'

        const isUserOffer = userId == trade.offerer.id

        const acceptButton = <button className="btn btn-success">Accept trade</button>
        const doneButton = <button className="btn btn-success">Mark trade as complete</button>
        const cancelButton = <button className="btn btn-danger">Cancel trade</button>
        const addBookButton = <button className="btn btn-primary">Choose book</button>

        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <p><strong>{offererName}</strong></p>
                            <p><strong>Book: </strong>{offererBookTitle}</p>
                            <p><strong>Will receive: </strong>{receiverBookTitle}</p>
                            <p><strong>Accepted trade: </strong>{offererAccept}</p>
                            <p><strong>Received book: </strong>{offererDone}</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <p><strong>{receiverName}</strong></p>
                            <p><strong>Book: </strong>{receiverBookTitle}</p>
                            <p><strong>Will receive: </strong>{offererBookTitle}</p>
                            <p><strong>Accepted trade: </strong>{receiverAccept}</p>
                            <p><strong>Received book: </strong>{receiverDone}</p>
                        </div>
                    </div>
                </div>
                <div className="btn-group col-sm-12">
                    {acceptButton}
                    {doneButton}
                    {cancelButton}
                    {addBookButton}
                </div>
            </div>
        )
    }
}


module.exports = TradeDetails
