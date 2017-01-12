import express from 'express';
const AdWordsUser = require('node-adwords').AdwordsUser;
const AdWordsConstants = require('node-adwords').AdwordsConstants;
const AdwordsReport = require('node-adwords').AdwordsReport;

const router = express.Router();

router.route('/adwrds').get((req, res) => {
	let report = new AdwordsReport({
		developerToken: 'XYh3YYcnK7-oA121GDMwcA',
		userAgent: 'Unimed',
		clientCustomerId: "875-899-5653",
		client_id: "9197203789-thmlul0qq8gfb12m9u03lep8vivqkg3a.apps.googleusercontent.com",
		client_secret: "5IJTmIYAYVQvirnXlxBfWVC0",
		refresh_token: "1/AevLqAHKoywGUvcqyHuTzAdejZcwbp9z_GGYJ2szxUQ"
	})	
	
	let user = new AdWordsUser({
		developerToken: 'XYh3YYcnK7-oA121GDMwcA',
		userAgent: 'Unimed',
		clientCustomerId: "875-899-5653",
		client_id: "9197203789-thmlul0qq8gfb12m9u03lep8vivqkg3a.apps.googleusercontent.com",
		client_secret: "5IJTmIYAYVQvirnXlxBfWVC0",
		refresh_token: "1/AevLqAHKoywGUvcqyHuTzAdejZcwbp9z_GGYJ2szxUQ"
	});
	
	let campaignService = user.getService('CampaignService', 'v201607')
	
	report.getReport('v201607', {
	    reportName: 'Custom Adgroup Performance Report',
	    reportType: 'CAMPAIGN_PERFORMANCE_REPORT',
	    fields: ['CampaignId', 'Impressions', 'Clicks', 'Cost'],
	    filters: [
		        {field: 'CampaignStatus', operator: 'IN', values: ['ENABLED', 'PAUSED']}
		    ],
	    startDate: new Date("28/08/2016"),
		endDate: new Date("28/09/2016"),
	    format: 'CSV' //defaults to CSV 
	}, (error, report) => {
	    console.log(error, report);
	});
	
	let selector = {
	    fields: ['Id', 'Name'],
	    ordering: [{field: 'Name', sortOrder: 'ASCENDING'}],
	    paging: {startIndex: 0, numberResults: AdWordsConstants.RECOMMENDED_PAGE_SIZE}
	}
	 
	campaignService.get({serviceSelector: selector}, (error, result) => {
		res.send(result);
		console.log(error);
	})
});

module.exports = router;
