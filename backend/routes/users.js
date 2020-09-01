var express = require('express');
var router = express.Router();
var session = require('express-session');
var sessionKey = require('../src/sessionKey');
var sendSafetyCode = require('../src/email/signUp');
// *from data 解析必備
const multer  = require('multer');
const upload = multer();

let memberSql =  require('../src/SQL/users');



/* GET users listing. */
router.get('/testGuest', function(req, res, next) {
  memberSql.test()
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    res.send(err);
  })
  
});


// *POST Login ， upload.array() => form data 解析用    
router.post('/', upload.array(), function(req, res, next) {
  console.log({reqbody:'body', data:req.body})
  let account = req.body.account;
  let password = req.body.password;

  // res.json({ a:account, b:password});

  memberSql.login(account, password)
  .then((result)=>{

    if(result.result){
      req.session[sessionKey.SK_USER_DATA] = result;
    }

    console.log("user:",  req.session[sessionKey.SK_USER_DATA]);
    res.json(result);
  })
  .catch((err)=>{
    res.send(err);
  })
  
});


// is Login?
router.get('/',(req, res)=>{
  let result =  req.session[sessionKey.SK_USER_DATA] || { result:0, msg: "未登入" }
  res.json(result)
})


// Log out
router.get('/logout',(req, res)=>{
  req.session[sessionKey.SK_USER_DATA] = undefined;

  let result =  req.session[sessionKey.SK_USER_DATA] || { result:1, msg: "已登出" }
  res.json(result)
})



// TODO Sign Up
router.post('/signup', async (req, res)=>{
  
  
  let result = await sendSafetyCode('adoro0920@gmail.com');
  if(result.result){
    req.session[sessionKey.SK_SIGNUP_SAFTY_CODE] = result.code;
  }
  
  res.json(result)
})


// TODO is Sign Up safyty code correct 
router.get('/signup/:code', async (req, res)=>{
  
  if( req.params.code == req.session[sessionKey.SK_SIGNUP_SAFTY_CODE] ){
    
    res.json({result:1, msg:"認證成功"});
    return;
  }
  
  res.json({result:0, msg:"認證碼不符"})
})



// TODO Forget Password send email












module.exports = router;
