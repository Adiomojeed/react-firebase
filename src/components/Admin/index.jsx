/** @format */

import React from "react";
import { withFirebase } from "../Firebase/index";
import { withAuthorization } from '../Session/index'

class AdminPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			users: [],
		};
	}

	componentDidMount() {
		this.setState({ loading: true });
		this.props.firebase.auth.onAuthStateChanged((authUser) =>
			this.props.firebase.db
				.ref(`users/${authUser.uid}/members`)
				.on("value", (snapshot) => {
					const usersObject = snapshot.val();
					console.log(usersObject);
					const usersList = Object.keys(usersObject).map(x => usersObject[x])
					console.log(usersList)
					this.setState({ users: usersList })
				})
		);
		//)
		//this.props.firebase.db.ref("users").on("value", (snapshot) => {
		//	const usersObject = snapshot.val();
		//	console.log((usersObject))
		//	const usersList = Object.keys(usersObject).map((key) => ({
		//		...usersObject[key],
		//		uid: key,
		//	}));
		//	this.setState({ users: usersList });
		//})
	}

	componentWillUnmount() {
		this.props.firebase.db.ref("users").off();
	}

	render() {
		return (
			<div>
				<h1>Admin</h1>
				<ul>
					{this.state.users.map((user) => (
						<li key={user.mail}>
							<span>
								<strong>ID:</strong> {user.name}
							</span>
							<span>
								<strong>E-Mail:</strong> {user.mail}
							</span>
							<span>
								<strong>Username:</strong> {user.phone}
							</span>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const condition = authUser => authUser != null

const NewPage = withFirebase(AdminPage)

export default withAuthorization(condition)(NewPage);
