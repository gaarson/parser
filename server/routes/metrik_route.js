import express from 'express';
import request from 'superagent';

const router = express.Router();
/*
let dataParse = {};
let todayDate = new Date() - 0;
let needDate = (new Date() - 24 * 3600 * 1000 * 30 - 1);
let result = [];

var s = new Date(needDate - 0);
var e = new Date(todayDate - 0);
var a = [];

while(s < e) {
	a.push(s);
	s = new Date(s.setDate(
		s.getDate() + 1
	))
}
for(let i = 0; i < 30; i++) {
	result.push(a[i].getFullYear() + '-' + (a[i].getMonth()+1) + '-0' + a[i].getDate())
}
console.log(result[0]);
*/
router.route('/metrik').get((req, res) => {
	let getSearchEngines = function() {
		return new Promise((resolve, reject) => {
			request
				.get(`https://api-metrika.yandex.ru/stat/v1/data/bytime?preset=sources_summary&date1=30daysAgo&date2=today&group=day&id=21429145&oauth_token=AQAAAAAZOwojAAOBfoxGgqss3knnhhe18tTmm7s`)
				.set('dataType', 'json')
				.set('Accept', 'application/json')
				.set('data', 'json')
				.end((err, data) => {
					//console.log(res.text);
					resolve(JSON.parse(data.text));
				});
		});
	}
	getSearchEngines().then((data1) => {
		res.send(data1);
	});
});
module.exports = router;
