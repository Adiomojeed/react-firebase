/** @format */

import React from "react";
import { withAuthorization, AuthUserContext } from "../Session/index";

const HomePage = () => {
	return (
		<AuthUserContext.Consumer>
			{(authUser) => (
				<div>
					<h1>Welcome {authUser.email}</h1>
				</div>
			)}
		</AuthUserContext.Consumer>
	);
};

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(HomePage);
