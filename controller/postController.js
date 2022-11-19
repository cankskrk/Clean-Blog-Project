const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  const page = req.query.page || 1;
  const postsPerPage = 2;
  const totalPosts = await Post.find({}).countDocuments();

  const posts = await Post.find({})
    .sort('-dateCreated')
    .skip((page - 1) * postsPerPage)
    .limit(postsPerPage);

  res.render('index', {
    posts,
    current: page,
    pages: Math.ceil(totalPosts / postsPerPage),
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  await post.save();

  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findOneAndRemove({ _id: req.params.id });
  res.redirect('/');
};
