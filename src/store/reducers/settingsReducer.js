import { DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION } from '../actions/types'


const settingsReducer = (state=null , action) => {
	switch (action.type) {
		case DISABLE_BALANCE_ON_ADD:
			return {
				...state,
				disableBalanceOnAdd: action.payload
			}
		case DISABLE_BALANCE_ON_EDIT:
			return {
				...state,
				disableBalanceOnEdit: action.payload,
			}
		case ALLOW_REGISTRATION:
			return {
				...state,
                setAllowRegistration: action.payload,

			}
		default:
			return state
	}
}

export default settingsReducer
