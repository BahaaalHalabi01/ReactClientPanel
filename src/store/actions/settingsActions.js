import { DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION } from '../actions/types'

export const setDisableBalanceOnAdd = () => {
	//get settings from local storage

	let settings = JSON.parse(localStorage.getItem('settings'))
	// put back in local storage
	settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd
	localStorage.setItem('settings', JSON.stringify(settings))

	return {
		type: DISABLE_BALANCE_ON_ADD,
		payload: settings.disableBalanceOnAdd,
	}
	
}

export const setDisableBalanceOnEdit = () => {
	//get settings from local storage

	let settings = JSON.parse(localStorage.getItem('settings'))
	// put back in local storage
	settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit
	localStorage.setItem('settings', JSON.stringify(settings))

	return {
		type: DISABLE_BALANCE_ON_EDIT,
		payload: settings.disableBalanceOnEdit,
	}
}

export const allowRegistration = () => {
	//get settings from local storage

	let settings = JSON.parse(localStorage.getItem('settings'))
	// put back in local storage
	settings.setAllowRegistration = !settings.setAllowRegistration
	localStorage.setItem('settings', JSON.stringify(settings))

	return {
		type: ALLOW_REGISTRATION,
		payload: settings.setAllowRegistration,
	}
}
