const keymirror = require('key-mirror')

module.exports = keymirror({
    BOOKS_GET_ALL: null,
    BOOKS_CREATE: null,
    BOOKS_GET_BY_ID: null,
    BOOKS_ADD_TO_USER_SHELF: null,
    BOOKS_GET_USER_BOOKS: null,
    BOOKS_REMOVE_FROM_USER_SHELF: null,

    USER_LOG_IN: null,
    USER_LOG_OUT: null,
    USER_GET_PROFILE: null,
    USER_CREATE: null,
    USER_UPDATE: null,

    UNAUTHORIZED: null,
})
