import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {constants} from '../Actions';

const scores = (
	state = {
		date:new Date(),
		games:[],
		fetching: false,
		error: false
	},
	action
)=>{
	switch(action.type){		
		case constants.DATE_CHANGED:
		return {
			...state,
			error: false,
			date: action.payload			
		}		
		case constants.REQUEST_SCORES:
		return {
			...state,
			error: false,
			fetching: true
		}
		case constants.SCORES_GET_SUCCESS:
		return {
			...state,
			fetching: false,
			error: false,
			games: action.payload
		}
		case constants.SCORES_GET_FAILURE:
		return {
			...state,
			error: true
		}
		default: 
		return state;
	}
}

export default combineReducers({scores, routing: routerReducer});