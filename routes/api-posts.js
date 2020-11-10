var express = require('express');
var router = express.Router();
const models = require("../models")

// Get all posts
router.get('/', function(req, res, next) {
  models.Post.findAll()
  .then(posts => {
    res.json(posts)
  })
});

//get 1 post by ID
router.get('/:id', (req, res) => {
  models.Post.findByPk(req.params.id)
  .then(post => {
    if (post) {
    res.json(post)
    }
    else{
      res.status(404).json({
        error: 'My God. I cannot find it!'
      })
    }
  })
})

//Update Post
//PUT /api/vi/post/:id
router.put('/:id',(req,res) =>{
  if (!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published ) {
    res.status(400).json({
      error: 'Please submit all required fields. Please. I beg you.'
    })
    return;
  }
  models.Post.update({
    author: req.body.author,
    title: req.body.title,
    content:req.body.content,
    published:req.body.published
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(updated => {
    if (updated && updated[0] > 0){
    res.status(202).json({
      success: 'Rejoice! It is done.'
  })
}
else {
  res.status(404).json({
    error: 'My God. I cannot find it!'
  })
}
})
})
  
//Create new Post
// /api/v1/posts/
router.post('/', (req, res) => {
  if (!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published ) {
    res.status(400).json({
      error: 'Please submit all required fields. Please. I beg you.'
    })
    return;
  }
  models.Post.create({
    author: req.body.author,
    title: req.body.title,
    content:req.body.content,
    published:req.body.published
  })
  .then(post => {
    res.status(201).json(post)
  })
})

//Delete Post
router.delete('/:id', (req, res) => {
  models.Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleted => {
    if (deleted === 1){
      res.status(202).json({
        sucess: 'Very well. The deed is done.'
      })
    } else {
      res.status(404).json({
        error: 'No target to destroy, sire.'
      })
    }
})
})

module.exports = router;

//GET /api/vi/posts/102/comments

router.get('/:postId/comments', (req, res) => {
  models.Comment.findAll({
    where: {
      PostId : req.params.postId
    }
  })
  .then(comments => {
    res.json(comments);
  })
})

// POST /api/v1/posts/:/id/comments
router.post('/:postId/comments', (req, res) => {
  models.Post.findByPk(req.params.postId)
  .then(post => {
      if (!post) {
        res.status(404).json({
          error : "Couldn't find it chief."
        })
      }
      return post.createComment({
        author: req.body.author,
        content: req.body.content,
        approved : req.body.approved || true 
      })
      })
      .then(comment => {
        console.log(comment);
        res.json({
          success: "I've added a comment!",
          comment: comment
        })
      })
    })
  
