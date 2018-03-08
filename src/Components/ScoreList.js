/**
 * Renders the list of scores as provided by the redux store
 */

import React from 'react';
import {connect} from 'react-redux';

class ScoreList extends React.Component{

	render(){		
		return (
			<React.Fragment>
				{null}			
			</React.Fragment>
		)
	}
}

const mstp = state =>({
	scores: state.scores
})

export default connect(mstp)(ScoreList);