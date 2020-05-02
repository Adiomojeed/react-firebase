/** @format */

import React from "react";
import { withRouter } from "react-router-dom";
import { SignUpLink } from "../SignUp/index";
import { withFirebase } from "../Firebase/index";
import * as ROUTES from "../../constants/routes";
import { PassWordForgetLink } from "../PasswordForget";


const SignInPage = () => {
	return (
		<div>
			<h1>SignIn</h1>
			<SignInForm />
			<PassWordForgetLink />
			<SignUpLink />
		</div>
	);
};

const INITIAL_STATE = {
	email: "",
	password: "",
	error: null,
};

class SignInFormBase extends React.Component {
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
		const { email, password } = this.state;
		this.props.firebase.auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
			})
			.catch((error) => this.setState({ error }));

		e.preventDefault();
	}

	render() {
		const { email, password, error } = this.state;
		const isInvalid = password === "" || email === "";

		return (
			<form method="POST" onSubmit={this.onHandleSubmit}>
				<input
					name="email"
					value={email}
					onChange={this.onHandleChange}
					type="text"
					placeholder="Email Address"
				/>
				<input
					name="password"
					value={password}
					onChange={this.onHandleChange}
					type="password"
					placeholder="Password"
				/>
				<button disabled={isInvalid} type="submit">
					Sign In
				</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
