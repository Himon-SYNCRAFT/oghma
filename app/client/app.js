const React = require('react')
const ReactDOM = require('react-dom')
const Router = require('react-router').Router
const Route = require('react-router').Route
const IndexRoute = require('react-router').IndexRoute
const browserHistory = require('react-router').browserHistory
const AuthStore = require('./stores/AuthStore')

const App = require('./components/App.jsx')
const BooksList = require('./components/BooksList.jsx')
const BookCreationForm = require('./components/BookCreationForm.jsx')
const BookDetails = require('./components/BookDetails.jsx')
const LoginForm = require('./components/LoginForm.jsx')
const RegisterForm = require('./components/RegisterForm.jsx')
const Profile = require('./components/Profile.jsx')
const ProfileEdit = require('./components/ProfileEdit.jsx')


ReactDOM.render((
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ BooksList } />
            <Route path="/book/:id" component={ BookDetails } />
            <Route path="/books/add" component={ BookCreationForm } onEnter={ requiredAuth } />
            <Route path="/profile" component={ Profile } onEnter={ requiredAuth } />
        <Route path="/profile/edit" component={ ProfileEdit } onEnter={ requiredAuth } />
            <Route path="/auth/register" component={ RegisterForm } onEnter={ isUserAlreadyLogged } />
            <Route path="/auth/login" component={ LoginForm } onEnter={ isUserAlreadyLogged } />
        </Route>
    </Router>
), document.getElementById('app-root'))


const isUserAlreadyLogged = (nextState, replace) => {
    if (AuthStore.isLogged()) {
        replace({ nextPathname: nextState.location.pathname }, '/')
    }
}

const requiredAuth = (nextState, replace) => {
    if (!AuthStore.isLogged()) {
        replace({ nextPathname: nextState.location.pathname }, '/auth/login')
    }
}
