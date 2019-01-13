const Thread = require('../models/threadModel');

 //     PUT //api/replies/{board} - REPLIES

    // send               - thread_id
    //                    - reply_id
    //                    - reported ( true )

    // msg                -'success'

module.exports = function(req,res){
  
 let thread_id = req.body.thread_id;
 let reply_id  = req.body.reply_id;
  
  Thread.findOneAndUpdate({_id: thread_id, "replies._id": reply_id}, {"replies.$.reported": true})
  .then((data) => {
    if(data){
      res.send('success');
    }
  }).catch(err => console.log(err));

  

}