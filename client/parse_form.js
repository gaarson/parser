import React from 'react';
import YandexMetrik from './metrik_data.js';
import RushAnalitics from './rush_data.js';

export default class ParseForm extends React.Component { 
	constructor(props) {
		super(props)
		this.state = { 
			focused: 0,
	   	};
	}

	clicked(index) {
		this.setState({
			focused: index
		});
	}

	render() {
		let usedItem = this.props.items[this.state.focused];
		let self = this;
		let dataBlock;
		if(usedItem == "Yandex Metrika") dataBlock = <YandexMetrik />;
		if(usedItem == "Rush Analitics") dataBlock = <RushAnalitics />;
		return(
			<div className = "parse_form">
				<div className = "tabs">
					<ul className = "info_ul">{this.props.items.map(function(m, index){
						var style = '';
							if(self.state.focused == index){
							style = "focused";
						}
						return ([<li className = {style} id = {index} onClick = {self.clicked.bind(self, index)}><h3>{m}</h3></li>]);
					})}</ul>
			</div>
				<div className = "parsing_data"> 
					{dataBlock}
				</div>
			</div> 
		);
	}
}
