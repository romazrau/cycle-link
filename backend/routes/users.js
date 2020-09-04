const express = require('express');
const router = express.Router();
// session
const session = require('express-session');
const sessionKey = require('../src/sessionKey'); ``
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


const reflashToken = async (id) => {
  let result = await memberSql.memberById(id);
  if (!result.result) {
    return { result: 0, msg: "id錯誤" }
  }
  token = 'Bearer ' + jsonwebtoken.sign(
    {
      fId: result.data.fId,
      fName: result.data.fName,
      fAccountType: result.data.fAccountType,
      fAccountAuthority: result.data.fAccountAuthority,
    },
    "DayDayLuLuDaDaMiMiJJTenTen",
    {
      expiresIn: 3600 * 24 * 3
    },
    { algorithm: 'HS256' }
  )
  return { result: 1, msg: "請求成功", token: token };
}




// *POST Login ， upload.array() => form data 解析用    
router.post('/login', function (req, res, next) {
  let account = req.body.fAccount;
  let password = req.body.fPassword;

  console.log({ a: account, b: password });
  let token;

  memberSql.login(account, password)
    .then((result) => {

      if (result.result) {
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

      console.log("user:", result);
      res.json({ ...result, token: token });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 0, msg: "路由錯誤", data: err });
    })

});


// is Login?
router.get('/login', async (req, res) => {
  let result = req.user ? { result: 1, msg: "認證成功", data: req.user } : { result: 0, msg: "未登入" };

  let token;
  if (result.result) {
    let newToken = await reflashToken(req.user.fId);
    if (newToken.result) {
      token = newToken.token;
    }
  }

  res.json({ ...result, token: token })
})


// Log out // TODO 前端要刪掉Localstroge
router.get('/logout', (req, res) => {
  let result = req.user ? { result: 0, msg: "登出失敗", data: req.user } : { result: 1, msg: "已登出" };
  res.json(result)
})



// TODO Change Member Detail
router.put('/', async (req, res) => {

  if (!req.user) {
    res.json({ result: 0, msg: "token 遺失" });
  }


  console.dir(req.body);
  let result = await memberSql.changeDetail(req.user.fId, req.body);
  let token;

  if (result.result) {
    let newToken = await reflashToken(req.user.fId);
    if (newToken.result) {
      token = newToken.token;
    }
  }

  res.json({ ...result, token: token });
})




// TODO Sign Up
router.post('/signup', async (req, res) => {




  req.session[sessionKey.SK_USER_DATA] = req.body;


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
