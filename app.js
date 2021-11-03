const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const connect = require("./src/db/mongodb")
connect(); //db 연결

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/usr", require("./src/routes/user.router"));
app.use("/board", require("./src/routes/board.router"));


const Item = require('./src/models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

app.listen(port, () => console.log('Server running...'));

