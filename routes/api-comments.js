var express = require('express');
var router = express.Router();
const models = require("../models")

//PUT /api/v1/comments/:commentId
router.put('/:commentId', (req, res) => {
    if (!req.body || !req.body.author || !req.body.content || (!req.body.approved && req.body.approved !== false) ) {
        res.status(400).json({
          error: 'Please submit all required fields. Please. I beg you.'
        })
        return;
      }
      models.Comment.update({
        author: req.body.author,
        content:req.body.content,
        approved: req.body.approved !== 'false' && req.body.approved !== false ? true : false
      }, {
        where: {
          id: req.params.commentId
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

// DELETE /api/v1/comments/:commentId
router.delete('/:commentId', (req, res) => {
    models.Comment.destroy({
        where: {
            id: req.params.commentId
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