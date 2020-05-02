/** @format */

import React, { Component } from "react";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
	passwordOne: "",
	passwordTwo: "",
	error: null,
};

class PasswordChangeForm extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
	}

	onHandleSubmit(e) {
		const { passwordOne } = this.state;

		this.props.firebase.auth.currentUser
			.updatePassword(passwordOne)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch((error) => {
				this.setState({ error });
			});

		e.preventDefault();
	}

	onHandleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { passwordOne, passwordTwo, error } = this.state;

		const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

		return (
			<form onSubmit={this.onHandleSubmit}>
				<input
					name="passwordOne"
					value={passwordOne}
					onChange={this.onHandleChange}
					type="password"
					placeholder="New Password"
				/>
				<input
					name="passwordTwo"
					value={passwordTwo}
					onChange={this.onHandleChange}
					type="password"
					placeholder="Confirm New Password"
				/>
				<button disabled={isInvalid} type="submit">
					Reset My Password
				</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

export default withFirebase(PasswordChangeForm);
