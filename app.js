const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 5000;

// View Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}...`);
});
