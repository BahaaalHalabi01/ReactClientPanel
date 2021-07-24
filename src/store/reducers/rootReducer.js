import {combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import notifyReducer from './notifyReducer'
import settingsReducer from './settingsReducer'

const rootReducer = combineReducers({
    notify:notifyReducer,
    settings:settingsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer