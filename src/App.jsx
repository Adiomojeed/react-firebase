/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/index";
import { auth, Firebase, FirebaseContext } from "./components/Firebase/index";

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase(auth)}>
		<App />
	</FirebaseContext.Provider>,
	document.querySelector("#root")
);
