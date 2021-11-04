const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const connect = require('./src/db/mongodb');
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate');

const auth = require('./routes/auth');

connect(); //db 연결

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/usr', require('./src/routes/user.router'));
app.use('/board', require('./src/routes/board.router'));
app.use('/auth', require('./src/routes/auth'));

app.use(passport.initialize());
app.use(passport.session());


app.listen(port, () => console.log('Server running...'));

