/* eslint-disable no-restricted-globals */


import React from "react";
import { withFirebase } from "../Firebase";

const SignOut = ({ firebase }) => {
	return (
		<div>
			<button
				onClick={() => {
					firebase.doSignOut().then(() => location.reload());
				}}
			>
				Sign Out
			</button>
		</div>
	);
};

export default withFirebase(SignOut);
