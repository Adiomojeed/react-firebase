/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import * as ROUTES from "../../constants/routes";

const PasswordForget = () => (
	<div>
		<h1>PasswordForget</h1>
		<PasswordForgetForm />
	</div>
);

const INITIAL_STATE = {
	email: "",
	error: null,
};

class PasswordForgetFormBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...INITIAL_STATE,
		};
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onHandleSubmit(e) {
		const { email } = this.state;
		this.props.firebase.auth
			.sendPasswordResetEmail(email)
			.then(() => this.setState({ ...INITIAL_STATE }))
			.catch((error) => this.setState({ error }));

		e.preventDefault();
	}

	render() {
		const { email, error } = this.state;
		const isInvalid = email === "";
		return (
			<form onSubmit={this.onHandleSubmit}>
				<input
					name="email"
					value={this.state.email}
					onChange={this.onHandleChange}
					type="text"
					placeholder="Email Address"
				/>
				<button disabled={isInvalid} type="submit">
					Reset My Password
				</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const PassWordForgetLink = () => {
	return (
		<p>
			<Link to={ROUTES.PASSWORD_FORGET}>Password Forget</Link>
		</p>
	);
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForget;
export { PassWordForgetLink };
