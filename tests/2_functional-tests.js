/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      
      test('Every feild filled in', function(done){
        
        chai.request(server)
        .post('/api/threads/test1')
        .send({
          board           : 'test1',
          text            : 'text', 
          delete_password : 'password',
          created_on      : new Date(),
          bumped_on       : new Date(),
          reported        : false,
          replies         : [],
        })
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.equal(res.headers['content-type'], 'text/html; charset=UTF-8')
          done();
        })
      })
      
    });
    
    suite('GET', function() {
      test('get 10 recent bumped threads with max 3 replies', function(done){
        chai.request(server)
        .get('/api/threads/test')
        .query({})
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.isAtMost(res.body.length, 10);
          assert.isAtMost(res.body[0].replies.length, 3);
          done();
        })
      })
    });
    
    
    suite('DELETE', function() {
      test('delete thread with thread_id and delete_password - incorrect password', function(done){
        chai.request(server)
        .delete('/api/threads/test3')
        .send({thread_id: '5b862afe1a5b1a1487bfd836', delete_password: 'p'})
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'incorrect password');
          done();
        })
      })
      
      test('delete thread with thread_id and delete_password - success', function(done){
        chai.request(server)
        .delete('/api/threads/test3')
        .send({thread_id: '5b862afe1a5b1a1487bfd836', delete_password: 'password'})
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        })
      })
      
    });
    
    suite('PUT', function() {
      test('report a thread', function(done){
        chai.request(server)
        .put('/api/threads/test')
        .send({report_id: '5b862b96c7adce163c346e51', reported: true})
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        })
      })
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('Every field filled replies', function(done){
        chai.request(server)
        .post('/api/replies/test')
        .send({
          text            : 'test replie',
          delete_password : 'password',
          thread_id       : '5b856fbfc3dfb360bb8f68a9',
          created_on      : new Date(),
          reported        : false
        })
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.equal(res.headers['content-type'], 'text/html; charset=UTF-8');
          done();
        })
      })
      
    });
    
    suite('GET', function() {
      test('get all thread replies with thread informations', function(done){
        chai.request(server)
        .get('/api/replies/test')
        .query({thread_id: '5b85feea24107f197cd43487'})
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.equal(Array.isArray(res.replies), false);
          done();
        })
      })
      
    });
    
    suite('PUT', function() {
      test('report reply - success', function(done){
        chai.request(server)
        .put('/api/replies/test')
        .send({thread_id: '5b8631716794dc3fc912e1c1', reply_id: '5b863a28d4909d54f8040013', reported: true})
        .end(function(err,res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'success');
          done();
        })
      })
      
    });
    
    suite('DELETE', function() {
      test('delete reply - just changing the text to [deleted] - incorrect password', function(done){
        chai.request(server)
        .delete('/api/replies/general')
        .send({thread_id: '5b8631716794dc3fc912e1c1', reply_id: '5b8669ad60660721b99e60ac', delete_password: 'assword'})
        .end(function(err,res){
          assert.equal(res.status, 200);
          done();
        })
      })
      
      test('delete reply - just changing the text to [deleted] - success', function(done){
        chai.request(server)
        .delete('/api/replies/general')
        .send({thread_id: '5b8631716794dc3fc912e1c1', reply_id: '5b8669ad60660721b99e60ac', delete_password: 'pass'})
        .end(function(err,res){
          assert.equal(res.status, 200);
          done();
        })
      })
      
    });
    
  });

});