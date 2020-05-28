import React from 'react';
import { navigate } from '@reach/router'
import { withFirebase } from '../Firebase';

const withAuthorization = condition => Component => {
    class withAuthorizations extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                if(!condition(authUser)) {
                    navigate('/')
                }
            })
        }

        componentWillUnmount() {
            this.listener()
        }

        render () {
            return (
                <div>
                    <Component {...this.props} />
                </div>
            )
        }
    }

    return withFirebase(withAuthorizations)
}

export default withAuthorization