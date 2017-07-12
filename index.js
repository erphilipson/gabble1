const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const routes = require('./routes');
const app = express();

app.use(session({
  secret: 'something',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use('/', routes);
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(routes);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
