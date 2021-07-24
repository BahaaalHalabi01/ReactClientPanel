import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider, useSelector } from 'react-redux'
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
import firebase from 'firebase/app'
import store from './store/store'
import 'firebase/firestore'

// Initialize Firebase
firebase.initializeApp(fbConfig)
firebase.firestore().settings({ timestampsInSnapshots: true, merge: true })

const rrfProps = {
	firebase: firebase,
	config: fbConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
}

const AuthIsLoaded = () => {
	const auth = useSelector(state => state.firebase.auth)
	if (!isLoaded(auth)) return null
	else return <App />
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<AuthIsLoaded />
			</ReactReduxFirebaseProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
