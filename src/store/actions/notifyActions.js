import { NOTIFY_USER ,CLEAR_NOTIFY} from './types'



export const clearNotify = () =>{
	return {
		type:CLEAR_NOTIFY
	}
}


export const notifyUser = (message, messageType) => {
	return {
		type: NOTIFY_USER,
		message,
		messageType,
	}
}
