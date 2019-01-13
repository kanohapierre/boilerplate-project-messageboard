const Thread = require('../models/threadModel');

module.exports = function(req,res){
  let board = req.body.board;
  let thread = new Thread({
    board           : req.body.board,
    text            : req.body.text,
    delete_password : req.body.delete_password,
    created_on      : new Date(),
    bumped_on       : new Date(),
    reported        : false,
    replies         : [],
    replycount      : 0,
  });

  Thread.create(thread)
  .then((data) => {
    res.redirect('/b/'+ board);
  }).catch(err => res.send(err));

}