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
    },

    isCanceled: {
        type: BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true
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
