/** @format */

import React from "react";
import ReactDOM from "react-dom";
import Index from "./components/Index";
import { Firebase, FirebaseContext } from "./components/Firebase/index";

const firebase = new Firebase();

ReactDOM.render(
	<FirebaseContext.Provider value={firebase}>
		<Index />
	</FirebaseContext.Provider>,
	document.querySelector("#root")
);
