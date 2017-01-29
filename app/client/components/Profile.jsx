const React = require('react')
const ProfileActions = require('../actions/ProfileActions')
const ProfileStore = require('../stores/ProfileStore')
const browserHistory = require('react-router').browserHistory


class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onClickEdit = this.onClickEdit.bind(this)
    }

    componentDidMount() {
        ProfileStore.addChangeListener(this.onChange)
        ProfileActions.get()
    }

    componentWillUnmount() {
        ProfileStore.removeChangeListener(this.onChange)
    }

    onChange() {
        this.setState({ user: ProfileStore.get() })
    }

    onClickEdit(event) {
        event.preventDefault()
        browserHistory.push('/profile/edit')
    }

    render() {
        const user = this.state.user
        const name = user.name || ''
        const first_name = user.first_name || ''
        const last_name = user.last_name || ''
        const full_name = (first_name + ' ' +  last_name).trim() || ''
        const city = user.city || ''
        const state = user.state || ''

        return (
            <div>
                <h2>{ name }</h2>
                <p>Full name: { full_name }</p>
                <p>City: { city }</p>
                <p>State: { state }</p>
                <button className="btn btn-info" onClick={ this.onClickEdit }>Edit</button>
            </div>
        )
    }
}


module.exports = Profile
