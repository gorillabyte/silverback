let express = require('express');
let path = require('path');

const port = 3000;
const app = express();

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/', express.static(path.join(__dirname, '../examples')));

app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Silverback example page running on http://localhost:${port}/index.html`);
    }
});
