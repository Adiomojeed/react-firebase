/** @format */

import React from "react";
import PasswordChangeForm from "../PasswordChange/index";
import PasswordForget from "../PasswordForget";
import { withAuthorization, AuthUserContext } from "../Session/index";

const AccountPage = () => (
	<AuthUserContext.Consumer>
		{(authUser) => (
			<div>
				<h1>Account: {authUser.email}</h1>
				<PasswordForget />
				<PasswordChangeForm />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(AccountPage);
