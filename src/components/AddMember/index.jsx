/** @format */

import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext, withAuthorization } from "../Session/index";
import { Entropy } from "entropy-string";

const AddMemberPage = () => {
	return (
		<React.Fragment>
			<h1>Add Member</h1>
			<AddMemberForm />
		</React.Fragment>
	);
};

const INITIAL_STATE = {
	name: "",
	position: "",
	mail: "",
	phone: "",
	gender: '',
	error: null,
};

class AddMemberFormBase extends Component {
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
		const { name, position, mail, phone, gender } = this.state;
		const entropy = new Entropy();
		const memberID = entropy.string();
		console.log(memberID);
		this.props.firebase.auth.onAuthStateChanged((authUser) =>
			this.props.firebase.db
				.ref(`users/${authUser.uid}/members`)
				.child(memberID)
				.set({ name, position, mail, phone, gender })
		);
		this.setState({ ...INITIAL_STATE });

		e.preventDefault();
	}

	render() {
		const { name, position, mail, phone, gender } = this.state;
		return (
			<form onSubmit={this.onHandleSubmit}>
				<input
					type="text"
					value={name}
					name="name"
					onChange={this.onHandleChange}
					placeholder="name"
				/>
				<select
					name="position"
					id="position"
					value={position}
					onChange={this.onHandleChange}
					onBlur={this.onHandleChange}
				>
					<option value="..."></option>
					<option value="Web">Web</option>
					<option value="Design">Design</option>
					<option value="IOT">IOT</option>
				</select>
				<input
					type="email"
					value={mail}
					name="mail"
					onChange={this.onHandleChange}
					placeholder="mail"
				/>
				<select
					name="gender"
					id="gender"
					value={gender}
					onChange={this.onHandleChange}
					onBlur={this.onHandleChange}
				>
					
					<option value="M">M</option>
					<option value="F">F</option>
					
				</select>
				<input
					type="tel"
					value={phone}
					name="phone"
					onChange={this.onHandleChange}
					placeholder="phone"
				/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

const AddMemberForm = withFirebase(AddMemberFormBase);

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(AddMemberPage);
