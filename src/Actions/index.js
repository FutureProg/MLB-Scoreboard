import {createAction} from 'redux-actions';
import * as Constants from './constants';

let modifyDate = createAction(Constants.DATE_CHANGED,(date)=>({date}));
let modifyScores = createAction(Constants.SCORES_GET_SUCCESS);
export let changeDate = dispatch => (nDate) =>{
	modifyDate(nDate);

	var url = "http://gd2.mlb.com/components/game/mlb";
	url = url + "/year_" + nDate.getFullYear();
	url = url + "/month_" + (nDate.getMonth() + 1);
	url = url + "/day_" + (nDate.getDay() < 10 ? "0" : "") + nDate.getDay();
	url += "master_scoreboard.json";
	fetch(url)
	.then((response)=>response.json())
	.then((json)=>{
		modifyScores(json.data.games);
	})
	.catch((error)=>{
		dispatch(Constants.SCORES_GET_FAILURE);
		console.log(error);
	});

	dispatch(Constants.REQUEST_SCORES);
}

export let constants = Constants;