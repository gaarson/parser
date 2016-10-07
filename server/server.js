import path from 'path';
import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import App from './../client/app.js';

const app = express();

app.use('/static', express.static(path.join(__dirname, './../static')));

app.get('/rushanalit', require('./routes/rush_route.js'));
app.get('/metrik', require('./routes/metrik_route.js'));

app.get('/', (req, res) => {
	let html = ReactDomServer.renderToString(<App />);
	res.send(html);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('server on: ' + PORT);
});
