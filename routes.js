const express = require('express');
const router = express.Router();
const models = require('./models')
const expressValidator = require('express-validator');

function authenticate(req, username, password){
  var authenticatedUser = models.user.find().then(function (users){
    if (username === users.username && password === users.password){
      req.session.authenticated = true;
      console.log('Authenitcated');
      return req.session;
    } else {
      console.log('Not authenticated');
      console.log(username)
      console.log(password);
      return false;
    }
  });
  return req.session;
}

router.get('/', function(req, res){
  if (!req.session.authenticated) {
  res.render('index');
} else {
  res.redirect('/feed')
}
})

router.post('/', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  authenticate(req, username, password)
    if(req.session.authenticated){
    console.log('woohoo');
    res.redirect('/feed');
  } else {
    console.log('oh no');
    res.redirect('/');
  }
})

router.get('/signup', function(req, res){
  res.render('signup');
})

router.post('/signup', function(req, res){
  let username = req.body.username;
  let password = req.body.password;

  const user = models.user.build({
    username: username,
    password: password
  })
  user.save();
  res.redirect('/');
})

router.get('/newGab', function(req, res){
  res.render('newGab');
})

router.post('/newGab', function(req, res){
  let newGab = req.body.newGab;

  const gab = models.post.build({
    message: newGab,
    likes: 0
  })
  gab.save();
  res.redirect('/feed');
})

router.get('/feed', function(req, res){
  models.post.findAll().then(function(posts){
    let postOrder = posts.reverse();
    res.render('feed', {postOrder});
  })
})

let likes = 0;
router.post('/feed', function(req,res){
  likes += 1;
  models.post.findAll().then(function(posts){
    let postOrder = posts.reverse();
    models.post.update({
      likes: likes}, {
        where: {
          // message: 
        }
      })
    res.render('feed', {postOrder});
  })
})

module.exports = router;
