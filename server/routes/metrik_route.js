import express from 'express';
import * as d3 from 'd3';
import jsdom from 'jsdom';
import {fetchUrl} from 'fetch';

const router = express.Router();

router.route('/metrik').get((req, res) => {
	let parseData;
	fetchUrl('http://127.0.0.1/metrika.php', function(error, meta, body) {
		parseData = body.toString();
		console.log(parseData);
		jsdom.env({
			html:'',
			features:{ QuerySelector:true }, //you need query selector for D3 to work
			done:function(errors, window){
				d3.window = d3.select(window.document);
				console.log("before response");
				res.writeHead (200, 'Content-Type': 'image/svg+xml');
				res.write('<html><head></head><body><div = "container"></div></body></html>');
				res.end (window.d3.select('body').html());
				console.log("after response");
			}
		});
	});
});

module.exports = router;
