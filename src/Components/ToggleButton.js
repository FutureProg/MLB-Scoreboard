/**
 * Toggle Button
 * Accepts the following properties
 */

import React from 'react';
import classNames from 'classnames';

class ToggleButton extends React.Component{

	render(){		
		var cname = classNames("toggle",{
			selected: this.props.toggled
		});
		return (
			<button className={cname} onClick={()=>{this.props.onToggle(this.props.name,this.props.index)}}>{this.props.children}</button>
		)
	}
}

export default ToggleButton;