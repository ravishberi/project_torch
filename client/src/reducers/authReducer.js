import {FETCH_USER} from '../actions/types';


export default (state = null,action) =>{
    switch(action.type){
        case FETCH_USER:
            console.log("reached fetch case")
            return action.payload || false;
        default:
            return state;
    }
}