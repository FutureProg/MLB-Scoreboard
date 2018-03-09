/**
 * Renders the score and initiates navigation to the detail page
 * Takes in the following properties:
 * - hometeam:
 * - - {score: integer, name: string}
 * - awayteam:
 * - - {score: integer, name: string}
 * - status: string
 */

import React from 'react';

const DefaultImage = require("../images/logos/mlb.png");

class ScoreItem extends React.Component{
	render(){		
		const homewins = this.props.hometeam.score > this.props.awayteam.score;
		const tie = this.props.hometeam.score === this.props.awayteam.score;
		var homeImage, awayImage;
		try{
			homeImage = require('../images/logos/'+this.props.hometeam.name+'.png');
			awayImage = require('../images/logos/'+this.props.awayteam.name+'.png');
		}catch(err){
			console.log("Unable to find images, using default");
		}
		var statusColour = "white";
		if(this.props.status === "In Progress"){
			statusColour = "#29EB81";
		}
		else if(this.props.status === "Postponed"){
			statusColour = "#FFEF3E";
		}
		else if(this.props.status === "Cancelled"){
			statusColour = "#FF3E3E";
		}
		return (
			<div className="score-item">
				<div className="score-bar">
					<div className="team-name" style={{background: homewins && !tie? "#29BDEB" :"initial" }}>
						<span>{this.props.hometeam.name}</span>
						<img src={homeImage?homeImage:DefaultImage} alt="logo" />
					</div>
					<div className="score">
						<span>{this.props.hometeam.score? this.props.hometeam.score : "TBD"}</span>
					</div>
					<div className="score">
						<span>{this.props.awayteam.score? this.props.awayteam.score : "TBD"}</span>
					</div>
					<div className="team-name" style={{background: !homewins && !tie? "#29BDEB" :"initial" }}>
						<img src={awayImage?awayImage:DefaultImage} alt="logo"/>
						<span>{this.props.awayteam.name}</span>
					</div>
				</div>			
				<div className="status-bar" style={{background:statusColour}}>
					<span>{this.props.status}</span>
				</div>
			</div>
		)
	}
}

export default ScoreItem;