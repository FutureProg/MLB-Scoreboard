/**
 * Manages the date's shown
 */

import React from 'react';
import {connect} from 'react-redux';

import './components.css';

const Arrow = require('../images/arrow.svg');
const ArrowDisabled = require('../images/arrow-disabled.svg');

var months = [
	'January','February','March','April','May',
	'June','July','August','September','October',
	'November','December'
];


class Calendar extends React.Component{
	
	render(){
		return (
			<div id="calendar-container">
				<div id="calendar-header">
					<img src={Arrow} alt="back"/>				
					<span class="month-year"></span>
					<img src={ArrowDisabled} alt="back" className="forward"/>
				</div>				
			</div>
		)
	}

}

const mstp = state =>({
	date: state.date
})

export default connect(mstp)(Calendar);