/** @format */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import compose from "recompose";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase/index";

const SignUpPage = () => {
	return (
		<div>
			<h1>Sign Up Form</h1>
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

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { username, email, passwordOne } = this.state;
		this.props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then((authUser) => {
				this.setState({ email: authUser.email, passwordOne: authUser.passwordOne });
				this.props.history.push(ROUTES.HOME);
				// eslint-disable-next-line no-console
				console.log('success')
			})
			.catch((error) => {
				this.setState({ error });
				// eslint-disable-next-line no-console
				console.error(error)
			});

		e.preventDefault();
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

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUpPage;

export { SignUpForm, SignUpLink };
