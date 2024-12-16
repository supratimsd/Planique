// import { error } from "console";
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState={
    use:null,
    loading:false,
    error:null,
    jwt:null,
    projectSize:0,
}


export const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_USER_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return{
                ...state,
                loading:false,
                error:null,
                jwt:action.payload.jwt,
            }  
        case GET_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                error:null,
                user:action.payload,
            }
        case LOGOUT:
            return initialState;
            
        default:
            return state;
    }
}
