const Thread = require('../models/threadModel');

 //     DELETE /api/replies/{board} - REPLIES

    // send                - thread_id
    //                     - reply_id, & 
    //                     - delete_password

    // update              - just changing the text to '[deleted]'

    // msg                 - incorrect password
    //                     - success
                    

module.exports = function(req,res){
  
 let thread_id       = req.body.thread_id;
 let reply_id        = req.body.reply_id;
 let delete_password = req.body.delete_password;
  
  Thread.findOneAndUpdate({_id: thread_id, replies : { $elemMatch: { _id: reply_id, delete_password: delete_password}}}, 
                          {"replies.$.text": "[deleted]"})
  .then((data) => {
    console.log(data);
    if(data){
      res.send('success');
    } else {
      res.send('incorrect password')
    }
  }).catch(err => console.log(err));

  

}