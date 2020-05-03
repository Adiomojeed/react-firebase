/** @format */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase/index";

const SignUpPage = () => {
	return (
		<div>
			<h1>Sign Up</h1>
			<SignUpForm />
		</div>
	);
};

const INITIAL_STATE = {
	username: "",
	email: "",
	passwordOne: "",
	passwordTwo: "",
	error: null,
};

class SignUpFormBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	onHandleSubmit(e) {
		const { username, email, passwordOne } = this.state;

		this.props.firebase.auth
			.createUserWithEmailAndPassword(email, passwordOne)
			.then((authUser) => {
				this.props.firebase.db
					.ref(`users/${authUser.user.uid}`)
					.set({ username, email });
			})
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
			})
			.catch((error) => this.setState({ error }));
		e.preventDefault();
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state;

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === "" ||
			email === "" ||
			username === "";

		return (
			<form onSubmit={this.onHandleSubmit}>
				<input
					name="username"
					value={username}
					onChange={this.onHandleChange}
					type="text"
					placeholder="Full Name"
				/>
				<input
					name="email"
					value={email}
					onChange={this.onHandleChange}
					type="text"
					placeholder="Email Address"
				/>
				<input
					name="passwordOne"
					value={passwordOne}
					onChange={this.onHandleChange}
					type="password"
					placeholder="Password"
				/>
				<input
					name="passwordTwo"
					value={passwordTwo}
					onChange={this.onHandleChange}
					type="password"
					placeholder="Confirm Password"
				/>
				<button disabled={isInvalid} type="submit">
					Sign Up
				</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignUpLink = () => {
	return (
		<p>
			Do not have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
		</p>
	);
};

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
