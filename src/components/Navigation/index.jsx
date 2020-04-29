/** @format */

import React from "react";
import { Link } from "react-router-dom";
import SignOut from '../SignOut/index'
import * as ROUTES from "../../constants/routes";

const Navigation = () => {
	return (
		<ul>
			<li>
				<Link to={ROUTES.SIGN_IN}>Sign In</Link>
			</li>
			<li>
				<Link to={ROUTES.SIGN_UP}>Sign Up</Link>
			</li>
			<li>
				<Link to={ROUTES.HOME}>Home</Link>
			</li>
			<li>
				<Link to={ROUTES.ACCOUNT}>Account</Link>
			</li>
			<li>
				<Link to={ROUTES.ADMIN}>Admin</Link>
			</li>
			<li>
				<SignOut />
			</li>
		</ul>
	);
};

export default Navigation;
