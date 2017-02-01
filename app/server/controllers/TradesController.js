const Trade = require('../schemas').Trade

module.exports = {
    getAllTrades: (req, res) => {
        const userId = req.user._id

        Trade
            .find({
                $or: [{ 'participantFrom.user': userId }, { 'participantTo.user': userId }],
                canceled: false
            })
            .populate('participantFrom.user')
            .populate('participantFrom.book')
            .populate('participantTo.user')
            .populate('participantTo.book')
            .exec((err, trades) => {
                if (err) throw err
                res.json(trades)
            })
    },

    createTrade: (req, res) => {
        const participantFromUserId = req.user._id
        const participantToUserId = req.body.userId
        const bookId = req.body.bookId

        const trade = new Trade({
            participantFrom: {
                user: participantFromUserId
            },
            participantTo: {
                user: participantToUserId,
                book: bookId
            }
        })

        trade.save(err => {
            if (err) {
                res.status(400).json(err)
            } else {
                trade
                    .populate('participantFrom.user')
                    .populate('participantFrom.book')
                    .populate('participantTo.user')
                    .populate('participantTo.book')
                    .exec((err, trade) => {
                        if (err) throw err
                        res.json(trade)
                    })
            }
        })
    },

    getTrade: (req, res) => {
        const userId = req.user._id
        const tradeId = req.params.id

        Trade
            .findOne({
                _id: tradeId,
                $or: [{ 'participantFrom.user': userId }, { 'participantTo.user': userId }],
                canceled: false
            })
            .populate('participantFrom.user')
            .populate('participantFrom.book')
            .populate('participantTo.user')
            .populate('participantTo.book')
            .exec((err, trade) => {
                if (err) throw err
                else if (!trade) {
                    res.status(404).end()
                }
                else {
                    res.json(trade)
                }
            })
    },

    acceptTrade: (req, res) => {
        const userId = req.user._id
        const tradeId = req.params.id

        Trade.findOne({
            _id: tradeId,
            $or: [{ 'participantFrom.user': userId }, { 'participantTo.user': userId }],
            $and: [{ 'participantFrom.done': false }, { 'participantTo.done': false }],
            canceled: false
        }, (err, trade) => {
            if (err) throw err
            else if (!trade) {
                res.status(404).end()
            }
            else {
                if (trade.participantFrom.user == userId) {
                    if (!trade.participantTo.accepted) {
                        err = "You can't accept trade before other participant"
                        res.status(400).json({ errors: [err] })
                        return
                    } else {
                        trade.participantFrom.accepted = true
                    }
                } else {
                    if (!trade.participantFrom.book) {
                        err = "You can't accept trade before choosing book to trade"
                        res.status(400).json({ errors: [err] })
                        return
                    }
                    trade.participantTo.accepted = true
                }

                trade.save(err => {
                    if (err) {
                        res.status(400).json(err)
                    } else {
                        trade
                            .populate('participantFrom.user')
                            .populate('participantFrom.book')
                            .populate('participantTo.user')
                            .populate('participantTo.book')
                            .exec((err, trade) => {
                                if (err) throw err
                                else {
                                    res.json(trade)
                                }
                            })
                    }
                })
            }
        })
    },

    doneTrade: (req, res) => {
        const userId = req.user._id
        const tradeId = req.params.id

        Trade.findOne({
            _id: tradeId,
            $or: [{ 'participantFrom.user': userId }, { 'participantTo.user': userId }],
            $and: [{ 'participantFrom.accepted': true }, { 'participantTo.accepted': true }],
            canceled: false
        }, (err, trade) => {
            if (err) throw err
            else if (!trade) {
                res.status(404).end()
            }
            else {
                if (trade.participantFrom.user == userId) {
                    trade.participantFrom.done = true
                } else {
                    trade.participantTo.done = true
                }

                trade.save(err => {
                    if (err) {
                        res.status(400).json(err)
                    } else {
                        trade
                            .populate('participantFrom.user')
                            .populate('participantFrom.book')
                            .populate('participantTo.user')
                            .populate('participantTo.book')
                            .exec((err, trade) => {
                                if (err) throw err
                                else {
                                    res.json(trade)
                                }
                            })
                    }
                })
            }
        })
    },

    addBookToTrade: (req, res) => {
        const userId = req.user._id
        const tradeId = req.params.id
        const bookId = req.body.bookId

        Book.findOne({ _id: bookId, owners: userId }, (err, book) => {
            if (err) throw err
            else if (!book) {
                const err = 'Invalid book id'
                res.status(400).json({ errors: [err] })
                return
            }
        })

        Trade.findOne({
            _id: tradeId,
            'participantTo.user': userId,
            'participantFrom.accepted': false
        }, (err, trade) => {
            if (err) throw err
            else if (trade) {
                res.status(404).end()
            } else {
                trade.participantFrom.book = bookId
                trade.save(err => {
                    if (err) {
                        res.status(400).json(err)
                    } else {
                        trade
                            .populate('participantFrom.user')
                            .populate('participantFrom.book')
                            .populate('participantTo.user')
                            .populate('participantTo.book')
                            .exec((err, trade) => {
                                if (err) throw err
                                else {
                                    res.json(trade)
                                }
                            })
                    }
                })
            }
        })
    },
}
