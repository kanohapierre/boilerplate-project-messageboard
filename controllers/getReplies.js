const Thread = require('../models/threadModel');

//     GET /api/replies/{board}?thread_id={thread_id} - REPLIES 

    // send               - board
    //                    - thread_id

    // get                - an object
    //                    - object with all replies

    // don't show         - reported
    //                    - delete_password

module.exports = function(req,res){
  
  let thread_id = req.query.thread_id;
  
  Thread.findOne({_id: thread_id}, {reported: 0, delete_password: 0, "replies.reported": 0, "replies.delete_password": 0 })
  .then((data) => {
    res.json(data);
  }).catch(err => res.send(err));
  

}