import { getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'
import 'firebase/auth'
import 'firebase/database'

import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../store/reducers/rootReducer'

// check for settings in local storage

if (localStorage.getItem('settings') === null) {
	// Default settings
	const defaultSettings = {
		disableBalanceOnAdd: true,
		disableBalanceOnEdit: false,
		setAllowRegistration: false,
	}
	// set to local storage
	localStorage.setItem('settings', JSON.stringify(defaultSettings))
}
// store initial state

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))))

export default store
