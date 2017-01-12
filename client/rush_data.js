import React from 'react'; 
import request from 'superagent';

export default class RushAnalitics extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			test: null
		};
	}

	componentDidMount() {
		new Promise ((resolve, reject) => {
			request
				.get('/rushanalit')
				.end((err, res) => {
					resolve(res);	
				})
		}).then((data) => {
			this.setState({
				test: data
			});
		});
	}	

	render() {
		let data = this.state.test;
		if(!data)return <p>Loading</p>;
		return (<div>{data}</div>);
	}
}
