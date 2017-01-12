import express from 'express';
import phantom from 'phantom';

const router = express.Router();
const url = 'https://www.rush-analytics.ru/node/177/id/16735/b86f3fbd4dea5ae9119987f98d6b7091';
let dataParse = {};

router.route('/rushanalit').get((req, res) => {
	let sitepage,
		phInstance;

		phantom.create()
			.then(instance => {
					phInstance = instance;
					return instance.createPage();
			})
			.then(page => {
				sitepage = page;
				return page.open(url);
			})
			.then(status => {
				console.log(status);
				return sitepage.property('content');
			})
			.then(content => {
				sitepage.evaluate(function() {
					let data = [document.body.innerHTML,
					document.head.innerHTML];
					return data;
				}).then(function(data) {
					console.log(typeof(data[0]));
					res.send(`
						<html>
						${data[1]}
						${data[0]}
						</html>
					`);
				});
				sitepage.close();
				phInstance.exit();
			})
			.catch(error => {
				console.log(error);
				phInstance.exit();
		});
});

module.exports = router;
