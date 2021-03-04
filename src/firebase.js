import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
firebase.initializeApp({
	apiKey: "AIzaSyCjDCDnCi7PFNbgETCkXW7Xne11RaGJWg4",
	authDomain: "lpbd-team-3.firebaseapp.com",
	projectId: "lpbd-team-3",
	storageBucket: "lpbd-team-3.appspot.com",
	messagingSenderId: "1056081971438",
	appId: "1:1056081971438:web:1a43afa1145b21118b8bff",
	measurementId: "G-LKP4G972NK"
  })

  export default firebase;