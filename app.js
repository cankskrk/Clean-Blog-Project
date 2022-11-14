const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const port = 5000;
const postController = require('./controller/postController');
const pageController = require('./controller/pageController');

// Connect DB
mongoose.connect('mongodb://127.0.0.1/cleanblog-db');

// View Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'], // Delete metodunda sorun yasadik delete metodunu get metodunun ustune yazamadigi icin ayni sayfada donup duruyor.
  })
);

// Routes
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}...`);
});
