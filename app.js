const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join('public')));


app.get('/:id1*', (req, res) => {
    const id1 = req.params.id1;
    const dynamicHtmlPath = path.join('views', 'server.html');

    fs.readFile(dynamicHtmlPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const dynamicHtml = data.replace(/{{objektId}}/g, id1);
            res.send(dynamicHtml);
        }
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});