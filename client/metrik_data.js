import React from 'react';
import request from 'superagent';
if(typeof window !== "undefined") {
	var Chart = require('chart.js');
}

export default class YandexMetrik extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			test: null	
		};
	}

	componentDidMount() {
		new Promise ((resolve, reject) => {
			request
				.get('/metrik')
				.end((err, res, body) => {
					resolve(JSON.parse(res.text));	
				})
		}).then((data) => {
			this.setState({
				test: data
			});
		});
	}

	drawChart() {
		console.log(this.state.test);
		let ctx = document.getElementById('chart-block').getContext('2d');
		let dataset = this.state.test.data;
		let timeIntervals = [];
		for(let i = 0; i < 31; i++)
		timeIntervals.push(this.state.test.time_intervals[i][0]);
		
		let straightReferences = dataset[0].metrics[0];
		let searchEngines = dataset[1].metrics[0];
		let insideTrans = dataset[2].metrics[0];

		console.log(dataset[0]);
		console.log(timeIntervals);

		let metChart = new Chart(ctx, {
			type: 'line',
			    data: {
					labels: timeIntervals,
					datasets: [
						{
							label: 'Прямые переходы',
							fill: false,
							lineTension: 0.1,
							borderColor: '#5dd55d',
							showLine: true,
							data: straightReferences
						},
						{
							label: 'Переходы из поисковых систем',
							fill: false,
							lineTension: 0.1,
							borderColor: '#ffe066',
							showLine: true,
							data: searchEngines
						},
						{
							label: 'Внутренние переходы',
							fill: false,
							lineTension: 0.1,
							borderColor: '#ff1a1a',
							showLine: true,
							data: insideTrans
						},
					]
				}
		});
	}

	render() {
		if(!this.state.test) return <p>Loading</p>;
		return (
			<div>{this.drawChart()}</div>
		);
	}
}
