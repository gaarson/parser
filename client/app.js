import React from 'react';
import ParseForm from './parse_form.js';

export default class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<html>
				<head>
					<meta charSet = "utf-8" />
					<link rel = "stylesheet" href = "./../static/styles/style.css"	/>
				</head>
				<body>
					<ParseForm items = {['Rush Analitics', 'Metrika']}/>
					<script src = "./../static/bundle.js" />
				</body>
			</html>
		);
	}
}

