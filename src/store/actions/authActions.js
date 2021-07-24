import { notifyUser } from "./notifyActions"

export const loginClient = (clientDetails, history) => {
	return (dispatch, getState, { getFirebase }) => {

		return getFirebase()
			.login(clientDetails)
			.then(() => {
				history.push('/')
			})
			.catch(err => dispatch(notifyUser('Invalid Login Credentials','error')))
	}
}
export const registerClient = (clientDetails) =>{
	return (dispatch,getState,{getFirebase}) =>{
		return getFirebase().auth()
		.createUserWithEmailAndPassword(clientDetails.email,clientDetails.password)
		.then()
		.catch(err=>dispatch(notifyUser(err.message,'error')))
	}
}

export const logout = () => {
	return (dispatch, getState, { getFirebase }) => {
		return getFirebase()
			.logout()
			.then(() => {})
			.catch(err => console.log(err))
	}
}
