const React = require('react')
const ReactDOM = require('react-dom')
const Router = require('react-router').Router
const Route = require('react-router').Route
const IndexRoute = require('react-router').IndexRoute
const browserHistory = require('react-router').browserHistory
const UserProfileStore = require('./stores/UserProfileStore')

const App = require('./components/App.jsx')
const BooksList = require('./components/BooksList.jsx')
const BookCreationForm = require('./components/BookCreationForm.jsx')
const BookDetails = require('./components/BookDetails.jsx')
const LoginForm = require('./components/LoginForm.jsx')
const RegisterForm = require('./components/RegisterForm.jsx')

ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ BooksList } />
            <Route path="/book/:id" component={ BookDetails } />
            <Route path="/books/add" component={ BookCreationForm } />
            <Route path="/auth/register" component={ RegisterForm } onEnter={ userIsAlreadyLogged } />
            <Route path="/auth/login" component={ LoginForm } onEnter={ userIsAlreadyLogged } />
        </Route>
    </Router>
), document.getElementById('app-root'))


const userIsAlreadyLogged = (nextState, replace) => {
    if (UserProfileStore.isLogged()) {
        replace('/')
    }
}
