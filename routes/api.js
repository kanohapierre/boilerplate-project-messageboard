/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect        = require('chai').expect;
const postThread    = require('../controllers/postThread.js');
const getThreads    = require('../controllers/getThreads.js');
const updateThread  = require('../controllers/updateThread.js');
const deleteThread  = require('../controllers/deleteThread.js');
const postReply     = require('../controllers/postReply.js');
const getReplies    = require('../controllers/getReplies.js');
const updateReply   = require('../controllers/updateReply.js');
const deleteReply   = require('../controllers/deleteReply.js');



module.exports = function (app) {
  
  app.route('/api/threads/:board')
  .post(postThread)
  .get(getThreads)
  .put(updateThread)
  .delete(deleteThread)
  
    
  app.route('/api/replies/:board')
  .post(postReply)
  .get(getReplies)
  .put(updateReply)
  .delete(deleteReply)

};