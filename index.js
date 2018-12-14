const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
	console.log('/', req.get('Cookie'));
	const sid = Math.floor(Math.random()*1000000);
	res.setHeader('Set-cookie', `SID=${sid}`);
	console.log('/', 'new SID', sid);
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/create', (req, res) => {
	console.log('/create', req.get('Cookie'));
	res.send();
});

app.get('/download', (req, res) => {
	console.log('/download', req.get('Cookie'));
	res.setHeader('Content-disposition', 'attachment; filename=export.zip');
	res.setHeader('Content-type', 'application/zip');
	fs.createReadStream(path.join(__dirname, 'export.zip')).pipe(res);
});

app.listen(8000);

console.log('Listening on port 8000');