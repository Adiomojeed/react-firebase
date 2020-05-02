import React from 'react';
import { withFirebase } from '../Firebase/context'

const SignOutButton = ({firebase}) => {
    return (
        <button onClick={() => {firebase.auth.signOut()}}>
            Sign Out
        </button>
    )
}

export default withFirebase(SignOutButton);