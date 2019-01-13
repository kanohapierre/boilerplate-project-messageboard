const Thread = require('../models/threadModel');

//     DELETE /api/threads/{board} - THREADS

    // send               - thread_id
    //                    - delete_password

    // msg                - 'incorrect password'
    //                    -'success'

module.exports = function(req,res){
  
  let thread_id       = req.body.thread_id;
  let delete_password = req.body.delete_password;
  
  Thread.findOne({_id: thread_id})
  .then((data) => {
    if(data.delete_password === delete_password){
      Thread.deleteOne({_id: thread_id})
      .then((data) => {
        if(data.ok === 1){
          res.send('success');
        }      })
    } else {
      res.send('incorrect password')
    }
  }).catch(err => res.send(err));
  

}
