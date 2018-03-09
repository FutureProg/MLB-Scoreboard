import React from 'react';
import {connect} from 'react-redux';

import ScoreItem from '../Components/ScoreItem';
import ScoreBoard from '../Components/ScoreBoard';
import {getDetails,changeDate} from '../Actions';

var months = [
	'January','February','March','April','May',
	'June','July','August','September','October',
	'November','December'
];

class DetailPage extends React.Component{
	componentWillMount(){		
		var {year,month,day,dir} = this.props.match.params;		
		if(this.props.scores.storedDay === undefined){
			var ndate = new Date(year,parseInt(month,10)-1,day);
			this.props.changeDate(ndate);
		}		
		
		var url = "/components/game/mlb";
		url += "/year_" + year;
		url += "/month_" + (month < 10? "0" + month : month);
		url += "/day_" + (day < 10? "0" + day:day);
		url += "/" + dir;
		this.props.getDetails(url);				
	}

	render(){
		var {year,month,day,index} = this.props.match.params;		
		month = parseInt(month,10) -1; // retrieve the current month

		// Get the information for this game to give to the score item
		var item={};
		if(this.props.scores instanceof Array) item = this.props.scores[index];
		else item = this.props.scores;
		var itemProps = {};
		if(item){		
			itemProps = {
				awayteam: {
					name: item['away_team_name'],
					score: item['linescore']? item['linescore']['r']['away']:null
				},
				hometeam: {
					name: item['home_team_name'],
					score: item['linescore']? item['linescore']['r']['home']:null
				},
				status: item['status']? item['status']['status']:null,
				dataDirectory: item['game_data_directory']
			};			
		}	

		var content = (
			<React.Fragment>
				<ScoreItem {...itemProps} />
				<ScoreBoard/>
			</React.Fragment>
		)

		return (
			<div className="page" id="detail">
				<h1>MLB Scoreboard</h1>
				<div id="content-container">
					<div id="date-place">
						<span style={{fontSize:"1.4em",fontWeight:"500"}}>{months[month] + " " + day + ", " + year}</span><br/>
						<span>{this.props.details['venue_name']}</span>
					</div>
					<div className="content">
						{itemProps.dataDirectory?
							 content
							 :null}						
					</div>					
				</div>
			</div>
		)
	}
	
}

const mstp = state =>({
	scores: state.scores.games.game? state.scores.games.game: [],
	details: state.details.data,
	storedDay: state.scores.games.day
});

const mdtp = (dispatch)=>({
	getDetails:getDetails(dispatch),
	changeDate:changeDate(dispatch)
});

export default connect(mstp,mdtp)(DetailPage);