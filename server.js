const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const connectionString = 'mongodb://tutorial:tutorial@ds151137.mlab.com:51137/clementine'

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log('App start at port ' + port)
})
