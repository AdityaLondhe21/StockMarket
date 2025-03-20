import { login_sucess } from './AuthAction';
import { SET_ADMIN_STATUS } from './AuthAction';

const initialState = {
    custID: null,
    isAdmin: false,
}

const AuthReducer = (state=initialState, action) => {
    switch(action.type) {
        case login_sucess: return {
           ...state,
            custID: action.payload
        }
        case SET_ADMIN_STATUS: return {
            ...state,
            isAdmin: action.payload,
        };
        default: return state;
    }
}

export default AuthReducer;