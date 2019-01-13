const Thread = require('../models/threadModel');

 //     PUT /api/threads/{board} - THREADS

    // send               - thread_id
    //                    - reported ( true )

    // msg                -'success'

module.exports = function(req,res){
  
  let thread_id       = req.body.report_id;
  Thread.findByIdAndUpdate(thread_id, {reported: true})
  .then((data) => {
    if(data){
      res.send('success');
    }
  }).catch(err => res.send(err));
  

}