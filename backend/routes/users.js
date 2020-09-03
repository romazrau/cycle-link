const express = require('express');
const router = express.Router();
// session
const session = require('express-session');
const sessionKey = require('../src/sessionKey');
// *from data 解析必備
const multer = require('multer');
const upload = multer();
// JWT
const jsonwebtoken = require('jsonwebtoken');

// src 資源
const memberSql = require('../src/SQL/users');
const sendSafetyCode = require('../src/email/signUp');


/* GET users listing. */
router.get('/testGuest', function (req, res, next) {
  memberSql.test()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    })

});


// *POST Login ， upload.array() => form data 解析用    
router.post('/', upload.array(), function (req, res, next) {
  let account = req.body.account;
  let password = req.body.password;

  console.log({ a: account, b: password });
  let token;

  memberSql.login(account, password)
    .then((result) => {

      if (result.result) {
        req.session[sessionKey.SK_USER_DATA] = result;
        token = 'Bearer ' + jsonwebtoken.sign(
          {
            ...result.data
          },
          "DayDayLuLuDaDaMiMiJJTenTen",
          {
            expiresIn: 3600 * 24 * 3
          },
          { algorithm: 'HS256' }
        )
      }

      console.log("user:", req.session[sessionKey.SK_USER_DATA]);
      res.json({ ...result, token: token });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })

});


// is Login?
router.get('/', (req, res) => {
  let result = req.session[sessionKey.SK_USER_DATA] || { result: 0, msg: "未登入" }
  res.json(result)
})


// Log out
router.get('/logout', (req, res) => {
  req.session[sessionKey.SK_USER_DATA] = undefined;

  let result = req.session[sessionKey.SK_USER_DATA] || { result: 1, msg: "已登出" }
  res.json(result)
})



// TODO Sign Up
router.post('/signup', async (req, res) => {


  let result = await sendSafetyCode('adoro0920@gmail.com');
  if (result.result) {
    req.session[sessionKey.SK_SIGNUP_SAFTY_CODE] = result.code;
  }

  res.json(result)
})


// TODO is Sign Up safyty code correct 
router.get('/signup/:code', async (req, res) => {

  if (req.params.code == req.session[sessionKey.SK_SIGNUP_SAFTY_CODE]) {

    res.json({ result: 1, msg: "認證成功" });
    return;
  }

  res.json({ result: 0, msg: "認證碼不符" })
})



// TODO Forget Password send email












module.exports = router;
