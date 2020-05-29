/** @format */

import React, { Component } from "react";
import SignOut from "./SignOut";
import {
	AuthUserContext,
	withAuthorization,
	withEmailVerification,
} from "../Session";
import { withFirebase } from "../Firebase";

const Home = () => (
	<AuthUserContext.Consumer>
		{(authUser) =>
			authUser ? <HomeBase user={authUser} /> : <h1>Loading...</h1>
		}
	</AuthUserContext.Consumer>
);

class HomeBaseForm extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.props.firebase.auth.onAuthStateChanged(authUser => {
			this.props.firebase.user(`users/${authUser.uid}`).on('value', snapshot => {
				console.log(snapshot.val())
			})
		})
	}

	render() {
		const { user } = this.props;
		return (
			<div>
				Welcome Home {user.email}
				<SignOut />
			</div>
		);
	}
}

const HomeBase = withFirebase(HomeBaseForm)

const condition = (authUser) => authUser != null;

export default withEmailVerification(withAuthorization(condition)(Home));
