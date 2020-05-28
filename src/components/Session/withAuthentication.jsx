/** @format */

import React from "react";
import { withFirebase } from "../Firebase";
import AuthUserContext from "./context";

const withAuthentication = (Component) => {
	class withAuthentications extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				authUSer: null,
			};
		}

		componentDidMount() {
			const { firebase } = this.props;
			this.listener = firebase.auth.onAuthStateChanged((authUSer) => {
				authUSer
					? this.setState({ authUSer })
					: this.setState({ authUSer: null });
			});
		}

		componentWillUnmount() {
			this.listener();
		}

		render() {
			return (
				<AuthUserContext.Provider value={this.state.authUSer}>
					<Component {...this.props} />
				</AuthUserContext.Provider>
			);
		}
	}
	return withFirebase(withAuthentications);
};

export default withAuthentication;
