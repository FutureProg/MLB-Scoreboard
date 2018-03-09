/**
 * Renders the list of scores as provided by the redux store
 */

import React from 'react';
import {connect} from 'react-redux';

import ScoreItem from './ScoreItem';

const LoadingSymbol = require("../images/loading.gif");

class ScoreList extends React.Component{

	render(){	
		const sortFavourite = (games)=>{			
			var faves = [];
			console.log(games);
			for(var i in games){				
				if(games[i]['away_team_name'] === 'Blue Jays' || games[i]['home_team_name'] === 'Blue Jays'){					
					console.log("Found jays at " + i);
					faves.push(games[i]);
					games[i] = null;
				}
			}												
			return ([...faves,...games]).filter((item)=>item !== null);
		}

		const getScores = (item,index)=>{
			var itemProps = {
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
			return <ScoreItem key={index} {...itemProps} />
		};
		var list;
		if(!this.props.fetching){
			if(this.props.scores instanceof Array){
				var sortedGames = sortFavourite(this.props.scores);
				list = sortedGames.map(getScores);
			}else{
				list = getScores(this.props.scores,0);
			}		
		}

		return (
			<React.Fragment>
				{
					this.props.fetching? 
						<div className="loading-zone">
							<img src={LoadingSymbol} alt="Loading"/>
						</div>:
						list.length === 0? 
							<h2>No games found for this date</h2>
							:list
				}
			</React.Fragment>
		)
	}
}

const mstp = state =>({
	scores: state.scores.games.game? state.scores.games.game: [],
	fetching: state.scores.fetching
})

export default connect(mstp)(ScoreList);