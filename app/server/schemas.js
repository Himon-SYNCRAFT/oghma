const Sequelize = require('sequelize')
const { STRING, INTEGER, BOOLEAN, VIRTUAL } = require('sequelize')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

const Schema = new Sequelize('oghma', 'oghma', 'slonecznaTarcza', {
    host: '188.68.237.10',
    dialect: 'postgres',
    define: {
        timestamps: false,
        underscored: false,
    }
})

// Users
const User = Schema.define('users', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: STRING,
        allowNull: false,
        unique: true
    },

    firstName: {
        type: STRING,
    },

    lastName: {
        type: STRING,
    },

    city: {
        type: STRING,
    },

    state: {
        type: STRING
    },

    passwordHash: {
        type: STRING,
        allowNull: false,
    },
})

User.generateHash = plainText => bcrypt.hashSync(plainText, SALT_ROUNDS)
User.comparePassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash)

// Books
const Book = Schema.define('books', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: STRING,
        allowNull: false,
    },

    frontCoverImg: {
        type: STRING,
    },

    description: {
        type: STRING,
    },

    isbn: {
        type: STRING,
        unique: true
    },
})

// Copies of the Books
const CopyOfBook = Schema.define('copies_of_books', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    userId: {
        type: INTEGER,
        allowNull: false,
    },

    bookId: {
        type: INTEGER,
        allowNull: false,
    },
})

CopyOfBook.belongsTo(User, { foreignKey: 'userId' })
CopyOfBook.belongsTo(Book, { foreignKey: 'bookId' })

User.belongsToMany(Book, { through: 'copies_of_books', as: 'books' })
Book.belongsToMany(User, { through: 'copies_of_books', as: 'owners' })


// Trades
const Trade = Schema.define('trades', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    idCopyOfBookOfferer: {
        type: INTEGER,
    },

    idCopyOfBookReceiver: {
        type: INTEGER,
        required: true,
    },

    isCanceled: {
        type: BOOLEAN,
        defaultValue: false,
    },

    offererAccept: {
        type: BOOLEAN,
        defaultValue: false,
    },

    receiverAccept: {
        type: BOOLEAN,
        defaultValue: false,
    },

    offererDone: {
        type: BOOLEAN,
        defaultValue: false,
    },

    receiverDone: {
        type: BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
    scopes: {
        userTradeById: function(tradeId, userId) {
            const where = '"trades"."id" = '+ tradeId +' AND '
                + '("offererBook"."userId" = ' + userId
                + ' OR "receiverBook"."userId" = ' + userId + ')'

            return {
                where: [where],

                include: [
                    {
                        model: CopyOfBook,
                        as: 'offererBook',
                    },

                    {
                        model: CopyOfBook,
                        as: 'receiverBook',
                    },
                ]
            }
        },

        userTrades: function(userId) {
            const where = '"trades"."isCanceled" = false AND '
                + '("offererBook"."userId" = ' + userId
                + ' OR "receiverBook"."userId" = ' + userId + ')'

            return {
                where: [where],

                include: [
                    {
                        model: CopyOfBook,
                        as: 'offererBook',
                        include: [
                            {
                                model: Book,
                                as: 'book',
                            }
                        ]
                    },

                    {
                        model: CopyOfBook,
                        as: 'receiverBook',
                        include: [
                            {
                                model: Book,
                                as: 'book',
                            }
                        ]
                    },
                ]
            }
        }
    },
    validate: {
        canAccept: function() {
            if (this.offererAccept === true && this.idCopyOfBookReceiver === null) {
                throw new Error("You can't accept trade before choosing a book to trade")
            }

            if (this.offererAccept === true && this.receiverAccept === false) {
                throw new Error( "You can't accept trade before other participant")
            }

            if (this.receiverAccept === true && (this.idCopyOfBookOfferer === null || this.idCopyOfBookReceiver)) {
                throw new Error("You can't accept trade before both participant choose books to trade")
            }
        },

        canDone: function() {
            if (this.offererDone === false && this.receiverDone === false) {
                return
            }

            if (this.offererAccept !== true || this.receiverAccept !== true || this.idCopyOfBookOfferer === null || this.idCopyOfBookReceiver === null) {
                throw new Error("You can't complete trade in progress")
            }
        },
    }
})

Trade.belongsTo(CopyOfBook, { foreignKey: 'idCopyOfBookOfferer', as: 'offererBook' })
Trade.belongsTo(CopyOfBook, { foreignKey: 'idCopyOfBookReceiver', as: 'receiverBook' })

module.exports = {
    Book,
    User,
    Trade,
    CopyOfBook,
    Schema
}
