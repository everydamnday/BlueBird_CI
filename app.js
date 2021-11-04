const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const connect = require('./src/db/mongodb')
const { PORT } = process.env;

connect(); //db 연결

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', require('./src/routes/user.router'));
app.use('/post', require('./src/routes/board.router'));


app.use(cors({ origin: `http://localhost:${PORT}`, credentials: true }))
app.listen(PORT, () => console.log('Server running...'));

