/**
 * Renders the score and initiates navigation to the detail page
 * Takes in the following properties:
 * - hometeam:
 * - - {score: integer, name: string}
 * - awayteam:
 * - - {score: integer, name: string}
 * - status: string
 * - dataDirectory: string
 */

import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

const DefaultImage = require("../images/logos/mlb.png");

class ScoreItem extends React.Component{

	constructor(props){
		super(props);
		this.navigate = this.navigate.bind(this);
	}

	navigate(){
		var url = "/details/" + this.props.date.getFullYear();		
		url += "/" + this.props.date.getMonth();
		url += "/" + this.props.date.getDate();
		url += "/" + this.props.dataDirectory.slice(47);
		this.props.nav(url);
	}

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
			<div className="score-item" onClick={this.navigate} tabIndex={0}>
				<div className="score-bar">
					<div className="team-name" style={{background: homewins && !tie? "rgba(41,189,235,0.5)" :"initial" }}>
						<span>{this.props.hometeam.name}</span>
						<img src={homeImage?homeImage:DefaultImage} alt="logo" />
					</div>
					<div className="score">
						<span>{this.props.hometeam.score? this.props.hometeam.score : "TBD"}</span>
					</div>
					<div className="score">
						<span>{this.props.awayteam.score? this.props.awayteam.score : "TBD"}</span>
					</div>
					<div className="team-name" style={{background: !homewins && !tie? "rgba(41,189,235,0.5)" :"initial" }}>
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

const mstp = state =>({
	date: state.scores.date
});

const mdtp = {
	nav: push
};

export default connect(mstp,mdtp)(ScoreItem);