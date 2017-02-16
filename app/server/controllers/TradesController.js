const { Trade, User, Book, CopyOfBook } = require('../schemas')
const Sequelize = require('sequelize')


module.exports = {
    getAllTrades: (req, res) => {
        const userId = req.user.id

        Trade.scope({ method: ['userTrades', userId] })
            .findAll()
            .then(trades => {
                res.json(trades)
            })
            .catch(err => {
                res.status(500).end()
                throw err
            })
    },

    createTrade: (req, res) => {
        const userId = req.user.id
        const bookId = req.body.bookId
        const receiverId = req.body.offerReceiverId

        CopyOfBook
            .findOne({
                where: {
                    userId: receiverId,
                    bookId
                }
            })
            .then(copy => {
                if (!copy) {
                    return res.status(400).json({ errors: ["Book not found"] })
                }

                Trade
                    .create({
                        idOfferer: userId,
                        idReceiver: receiverId,
                        idCopyOfBookReceiver: copy.id
                    })
                    .then(trade => {
                        res.json(trade)
                    })
                    .catch(err => {
                        res.status(400).json(err)
                    })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    getTrade: (req, res) => {
        const userId = req.user.id
        const tradeId = req.params.id

        Trade.scope({ method: ['userTradeById', tradeId, userId] })
            .findOne()
            .then(trade => {
                if(trade) {
                    res.json(trade)
                } else {
                    res.status(404).end()
                }
            })
            .catch(err => {
                res.status(500).end()
                throw err
            })
    },

    acceptTrade: (req, res) => {
        const userId = req.user.id
        const tradeId = req.params.id

        Trade.scope({ method: ['userTradeById', tradeId, userId] })
            .findOne()
            .then(trade => {
                if (!trade) {
                    res.status(404).end()
                } else {
                    if (trade.offererBook.userId == userId) {
                        trade.offererAccept = true
                    }
                    if (trade.receiverBook.userId == userId) {
                        trade.receiverAccept = true
                    }

                    trade.save()
                        .then(trade => {
                            res.json(trade)
                        })
                        .catch(err => {
                            res.status(400).json(err)
                        })
                }
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    doneTrade: (req, res) => {
        const userId = req.user.id
        const tradeId = req.params.id

        Trade.scope({ method: ['userTradeById', tradeId, userId] })
            .findOne()
            .then(trade => {
                if (!trade) {
                    res.status(404).end()
                } else {
                    if (trade.offererBook.userId == userId) {
                        trade.offererDone = true
                    }
                    if (trade.receiverBook.userId == userId) {
                        trade.receiverDone = true
                    }

                    trade.save()
                        .then(trade => {
                            res.json(trade)
                        })
                        .catch(err => {
                            res.status(400).json(err)
                        })
                }
            })
    },

    addBookToTrade: (req, res) => {
        const userId = req.user.id
        const tradeId = req.params.id
        const bookId = req.body.bookId

        Trade.scope({ method: ['userTradeById', tradeId, userId] })
            .findOne()
            .then(trade => {
                if (!trade) {
                    res.status(404).end()
                } else {
                    if (trade.offererBook.userId == userId) {
                        trade.idCopyOfBookReceiver = bookId
                    }
                    if (trade.receiverBook.userId == userId) {
                        trade.idCopyOfBookOfferer = bookId
                    }

                    trade.save()
                        .then(trade => {
                            res.json(trade)
                        })
                        .catch(err => {
                            res.status(400).json(err)
                        })
                }
            })
    },
}
