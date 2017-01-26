const React = require('react')
const ReactDOM = require('react-dom')
const Router = require('react-router').Router
const Route = require('react-router').Route
const IndexRoute = require('react-router').IndexRoute
const browserHistory = require('react-router').browserHistory
const App = require('./components/App.jsx')
const Main = require('./components/Main.jsx')
const BookCreationForm = require('./components/BookCreationForm.jsx')
const BookDetails = require('./components/BookDetails.jsx')

ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ Main } />
            <Route path="/book/:id" component={ BookDetails } />
            <Route path="/books/add" component={ BookCreationForm } />
        </Route>
    </Router>
), document.getElementById('app-root'))
