import {createAction} from 'redux-actions';
import * as Constants from './constants';

let modifyDate = createAction(Constants.DATE_CHANGED,(date)=>date);
let modifyScores = createAction(Constants.SCORES_GET_SUCCESS);
let requestScores = createAction(Constants.REQUEST_SCORES);
let requestScoresFailure = createAction(Constants.SCORES_GET_FAILURE);
export let changeDate = dispatch => (nDate) =>{	
	dispatch(modifyDate(nDate));

	var url = "http://gd2.mlb.com/components/game/mlb";
	url = url + "/year_" + nDate.getFullYear();
	url = url + "/month_" + (nDate.getMonth() + 1 < 10? "0" :"") + (nDate.getMonth() + 1);
	url = url + "/day_" + (nDate.getDate() < 10 ? "0" : "") + nDate.getDate();
	url += "/master_scoreboard.json";
	dispatch(requestScores());
	fetch(url)
	.then((response)=>response.json())
	.then((json)=>{
		dispatch(modifyScores(json.data.games));
	})
	.catch((error)=>{
		dispatch(requestScoresFailure());
		console.log(error);
	});
	
}

let requestDetails = createAction(Constants.REQUEST_DETAILS);
let requestDetailsSuccess = createAction(Constants.DETAILS_GET_SUCCESS);
let requestDetailsFailure = createAction(Constants.DETAILS_GET_FAILURE);
export let getDetails = dispatch => (dataDirectory)=>{
	dispatch(requestDetails());
	var url = "http://gd2.mlb.com" + dataDirectory + "/boxscore.json";
	fetch(url)
	.then((response)=>response.json())
	.then((json)=>{
		dispatch(requestDetailsSuccess(json.data.boxscore));
	})
	.catch((error)=>{
		dispatch(requestDetailsFailure());
		console.log(error);
	})
}

export let constants = Constants;