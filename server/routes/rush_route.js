import express from 'express';
import phantom from 'phantom';

const router = express.Router();
const url = 'https://www.rush-analytics.ru/node/177/id/16735/b86f3fbd4dea5ae9119987f98d6b7091';

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
				let parseData = [document.getElementById('line_div').innerHTML,
								 document.getElementById('defaulttablerpp').innerHTML];
				return parseData;

			}).then(function(data) {
			
			     res.writeHead(200, {"Content-Type": "text/html"});
				 res.write("<html><head><meta charset='UTF-8' />");
				 res.write("<link rel='stylesheet' href='./../../static/styles/parse_data.css'>");
				 res.write("</head><body>");
			
				 res.write("<div class='rush_data'>");
				 res.write(data[0]);
				 res.write("<table class = 'rush_table'>")
				 res.write(data[1]);
				 res.end("</table></div></body></html>"); 
			});
			//console.log(content);
	        sitepage.close();
	        phInstance.exit();
	    })
		.catch(error => {
	        console.log(error);
	        phInstance.exit();
		});
});
module.exports = router;
