var express = require('express');

var app = express();

var port = process.env.port || 3000;

app.use(express.static('public'));
app.use(express.static('src/views'));

//setting View engine for EJS
app.set('views', './src/views');
app.set('view engine', '.ejs');

app.get('/', function (req, res) {
    res.render('index');
});



app.listen(port, function (err) {
    console.log('running server on port ' + port);
}  );