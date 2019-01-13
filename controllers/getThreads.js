const Thread = require('../models/threadModel');

//     GET /api/threads/{board} - THREADS

    // send               - board

    // get                - an array
    //                    - 10 recent bumped threads
    //                    - 3 recent replies 

    // don't show         - reported
    //                    - delete_password

module.exports = function(req,res){
  
  let board = req.params.board;
  
  Thread.find({board: board},{ replies: { $slice: -3 }},
              {reported: 0, delete_password: 0,"replies.delete_password": 0, "replies.reported": 0}).sort({bumped_on: -1}).limit(10)
  .then((data) => {
    res.json(data);
  }).catch(err => res.send(err));
  

}