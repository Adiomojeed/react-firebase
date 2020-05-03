/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/index";
import { auth, db, Firebase, FirebaseContext } from "./components/Firebase/index";

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase(auth, db)}>
		<App />
	</FirebaseContext.Provider>,
	document.querySelector("#root")
);
