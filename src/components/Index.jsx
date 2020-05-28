/** @format */

import React from "react";
import { Router } from "@reach/router";
import SignUp from "./SignUp";
import Home from "./Dashboard.jsx/Home";
import SignIn from "./SignIn";
import { withAuthentication } from "./Session";

const Index = () => {
	return (
		<div>
			<Router>
				<SignUp path="/register" />
				<Home path="/home" />
                <SignIn path='/' />
			</Router>
		</div>
	);
};

export default withAuthentication(Index);
