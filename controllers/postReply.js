const Thread = require('../models/threadModel');

//     POST  /api/replies/{board} - REPLIES

    // send         - text
    //              - delete_password
    //              - thread_id

    // update       - bumped_on (to the comments date)

    // save         - _id
    //              - text
    //              - created_on
    //              - delete_password
    //              - reported(boolean)

module.exports = function(req,res){
  let board     = req.body.board;
  let thread_id = req.body.thread_id;
  let reply = {
    text            : req.body.text,
    delete_password : req.body.delete_password,
    created_on      : new Date(),
    reported        : false,
  }

  Thread.findOneAndUpdate({_id: thread_id}, {$set: {bumped_on: new Date()}, $push: {replies: reply}, $inc: {replycount: 1}})
  .then((data) => {
    res.redirect('/b/'+ req.body.board);
  }).catch(err => res.send(err));

}