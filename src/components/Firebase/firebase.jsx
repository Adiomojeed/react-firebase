/** @format */

import app from 'firebase/app'

const config = {
	apiKey: "AIzaSyCk1pr_Wkc4_pbFrBXkXyMTyQ2h80adlDY",
	authDomain: "react-firebase-id.firebaseapp.com",
	databaseURL: "https://react-firebase-id.firebaseio.com",
	projectId: "react-firebase-id",
	storageBucket: "react-firebase-id.appspot.com",
	messagingSenderId: "941660752565",
};

class Firebase {
	constructor () {
		app.initializeApp(config)
	}
}

export default Firebase;