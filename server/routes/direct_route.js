import express from 'express';
import request from 'superagent';
import YandexDirectApi from 'yandex-direct-api';

const router = express.Router();

router.route('/direct').get((req, res) => {

	let api = YandexDirectApi({
		token: 'AQAAAAAZdURpAAOTqOXrYcJFDUjOtpaH7-zW38A'	
	});

	api.call('GetCampaignParams', {CampaignID: 22176958}, (err, data) => {
		console.log(err);
		console.log(data);
	})

});

module.exports = router;
