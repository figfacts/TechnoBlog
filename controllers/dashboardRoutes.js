const router = require('express').Router();
const { Post } = require('../models');
const withAuthentication = require('../utils/authentication');

router.get('/', withAuthentication, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('allPostsAdmin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuthentication, (req, res) => {
  res.render('newPost', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuthentication, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
