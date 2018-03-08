import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const scores = (
	state = {

	},
	action
)=>{
	switch(action.type){
		default: 
		return state;
	}
}

export default combineReducers({scores, routing: routerReducer});