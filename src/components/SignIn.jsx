/** @format */

import React, { Component } from "react";
import { navigate } from "@reach/router";
import { withFirebase } from "./Firebase/index";

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			users: [],
			error: null,
			mounts: null,
		};

		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	componentDidMount() {
		this.ref = this.props.firebase.user("users").on("value", (snapshot) => {
			const usersObject = snapshot.val();
			let users;
			if (usersObject === null) {
				users = [];
			} else {
				users = Object.keys(usersObject).map(
					(user) => usersObject[user].email
				);
			}
			this.setState({ users });
		});
	}

	componentWillUnmount() {
		this.ref().off();
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { email, password, users } = this.state;
		const { firebase } = this.props;
		firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				if (users.includes(email)) {
					navigate("/home");
				} else {
					navigate("/create");
				}
			})
			.catch((error) => this.setState({ error }));
		e.preventDefault();
	}

	render() {
		const { email, password, error } = this.state;
		return (
			<div>
				<form onSubmit={this.onHandleSubmit}>
					<input
						type="text"
						name="email"
						value={email}
						onChange={this.onHandleChange}
					/>
					<input
						type="password"
						name="password"
						value={password}
						onChange={this.onHandleChange}
					/>
					{error && <p>{error.message}</p>}
					<button type="submit">SignIn</button>
				</form>
			</div>
		);
	}
}

export default withFirebase(SignIn);
