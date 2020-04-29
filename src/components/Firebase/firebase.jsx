/** @format */

import app from 'firebase/app';
import 'firebase/auth'

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
		this.auth = app.auth()
		this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(this)
		this.doSignInWithEmailAndPassword = this.doSignInWithEmailAndPassword.bind(this)
		this.doSignOut = this.doSignOut.bind(this)
		this.doResetPassword = this.doResetPassword.bind(this)
		this.doChangePassword = this.doResetPassword.bind(this)
	}

	// Sign Up function
	doCreateUserWithEmailAndPassword(email, password)  {
		this.auth.createUserWithEmailAndPassword(email, password)
	}

	// Sign In function
	doSignInWithEmailAndPassword(email, password)  {
		this.auth.signInWithEmailAndPassword(email, password)
	}

	// Sign Out function
	doSignOut() {
		this.auth.signOut()
	}

	// Reset Password function
	doResetPassword(email) {
		this.auth.sendPasswordResetEmail(email)
	}

	// Change Password function
	doChangePassword(password) {
		this.auth.currentUser.updatePassword(password)
	}
}

export default Firebase;