import { NOTIFY_USER,CLEAR_NOTIFY } from "../actions/types";

const initialState = {
    message:null,
    messageType:null
}

const notifyReducer = (state = initialState,action) =>{
    switch(action.type){
        case NOTIFY_USER:
            return{
                ...state,
                message:action.message,
                messageType:action.messageType
            }
        case CLEAR_NOTIFY:
            return {
                ...state,
                message:null,
                messageType:null
            }
        default:
            return state
    }

}

export default notifyReducer