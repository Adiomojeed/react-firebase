/** @format */

import React from "react";
import { AuthUserContext } from "./context";
import { withFireBase } from '../Firebase/index'

const withAuthentication = (Component) => {
	// eslint-disable-next-line no-shadow
	class withAuthentication extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				authUser: null,
			};
		}

		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(
				(authUser) => {
					authUser
						? this.setState({ authUser })
						: this.setState({ authUser: null });
				}
			);
		}

		componentWillUnmount() {
			this.listener();
		}

		render() {
			return (
				<AuthUserContext.Provider value={this.state.authUser}>
					<Component {...props} />
				</AuthUserContext.Provider>
			);
		}
	}

	return withFireBase(withAuthentication);
};

export default withAuthentication;
