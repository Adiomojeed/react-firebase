/** @format */

import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut/index";
import * as ROUTES from "../../constants/routes";

const Navigation = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to={ROUTES.SIGN_IN}>Sign In</Link>
				</li>
				<li>
					<Link to={ROUTES.LANDING}>Landing</Link>
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
			</ul>
		</div>
	);
};

const NavigationAuth = () => {
	return (
		<ul>
			<li>
				<Link to={ROUTES.LANDING}>Landing</Link>
			</li>
			<li>
				<Link to={ROUTES.HOME}>Home</Link>
			</li>
			<li>
				<Link to={ROUTES.ACCOUNT}>Account</Link>
			</li>
			<li>
				<SignOut />
			</li>
		</ul>
	);
};

const NavigationNonAuth = () => {
	return (
		<ul>
			<li>
				<Link to={ROUTES.LANDING}>Landing</Link>
			</li>
			<li>
				<Link to={ROUTES.SIGN_IN}>Sign In</Link>
			</li>
		</ul>
	);
};

export default Navigation;
