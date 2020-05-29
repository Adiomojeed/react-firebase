/** @format */

import React, { Component } from "react";
import { navigate } from "@reach/router";
import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase/index";

class HomeBaseForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: "",
			nick: "",
			error: null,
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { userName, nick } = this.state;
		const { firebase } = this.props;

		firebase.auth.onAuthStateChanged((authUser) => {
			firebase
				.user(`users/${authUser.uid}`)
				.set({ userName, nick, email: authUser.email })
				.then(() => navigate("/home"))
				.catch((error) => this.setState({ error }));
		});
		e.preventDefault();
	}

	render() {
		const { userName, nick, error } = this.state;
		return (
			<div>
				<h1>You are one step away</h1>
				<form onSubmit={this.onHandleSubmit}>
					<input
						type="text"
						name="userName"
						value={userName}
						onChange={this.onHandleChange}
						placeholder="User Name"
					/>
					<input
						type="text"
						name="nick"
						value={nick}
						onChange={this.onHandleChange}
						placeholder="Nick Name"
					/>
					{error && <p>{error.message}</p>}
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

const HomeBase = withFirebase(HomeBaseForm);

const condition = (authUser) => authUser != null;

export default withEmailVerification(withAuthorization(condition)(HomeBase));
