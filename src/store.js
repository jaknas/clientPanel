import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
// todo ^

const firebaseConfig = {
	apiKey: "AIzaSyCuBhpk55oERl6ohXLgkiMPZgMz_yCVKHQ",
	authDomain: "client-panel-react.firebaseapp.com",
	databaseURL: "https://client-panel-react.firebaseio.com",
	projectId: "client-panel-react",
	storageBucket: "client-panel-react.appspot.com",
	messagingSenderId: "497687887452"
};

// react-redux-firebase config

const rrfConfig = {
	userProfile: "users",
	useFirestoreForProfile: true
};

// initialize Firebase instance

firebase.initializeApp(firebaseConfig);

// initialize Firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
	reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
