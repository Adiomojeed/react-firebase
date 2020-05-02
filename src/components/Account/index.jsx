/** @format */

import React from "react";
import PasswordChangeForm from '../PasswordChange/index'
import PasswordForget from "../PasswordForget";

const AccountPage = () => (
	<div>
		<h1>Account Page</h1>
		<PasswordChangeForm />
		<PasswordForget />
	</div>
);

export default AccountPage;
