/** @format */

import React, { Component } from "react";
import SignOut from "./SignOut";
import {
	AuthUserContext,
	withAuthorization,
	withEmailVerification,
} from "../Session";

const Home = () => (
	<AuthUserContext.Consumer>
		{(authUser) =>
			authUser ? <HomeBaseForm user={authUser} /> : <h1>Loading...</h1>
		}
	</AuthUserContext.Consumer>
);

class HomeBaseForm extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { user } = this.props;
		return (
			<div>
				Welcome Home {user.uid}
				<SignOut />
			</div>
		);
	}
}

const condition = (authUser) => authUser != null;

export default withEmailVerification(withAuthorization(condition)(Home));
