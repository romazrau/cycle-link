var express = require('express');
var router = express.Router();


let accountSql =  require('../src/SQL/account');



/* GET users listing. */
router.get('/testGuest', function(req, res, next) {
  accountSql.test()
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    res.send(err);
  })
  
});


//POST Login
router.post('/', function(req, res, next) {
  let account = req.body.account;
  let password = req.body.password;

  // res.json({ a:account, b:password});

  accountSql.login(account, password)
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    res.send(err);
  })
  
});








module.exports = router;
