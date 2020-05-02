/** @format */

import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

app.initializeApp(config);

export const auth = app.auth();
class Firebase {
	constructor(auths) {
		this.auth = auths;
	}

	// Sign Up function
	doCreateUserWithEmailAndPassword(email, password) {
		this.auth.createUserWithEmailAndPassword(email, password);
	}

	// Sign In function
	doSignInWithEmailAndPassword(email, password) {
		this.auth.signInWithEmailAndPassword(email, password);
	}

	// Sign Out function
	doSignOut() {
		this.auth.signOut();
	}

	// Reset Password function
	doResetPassword(email) {
		this.auth.sendPasswordResetEmail(email);
	}

	// Change Password function
	doChangePassword(password) {
		this.auth.currentUser.updatePassword(password);
	}
}

export default Firebase;
