const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// session
const session = require('express-session');
const sessionKey = require('../src/sessionKey'); ``
// JWT
const jsonwebtoken = require('jsonwebtoken');

// src 資源
const memberSql = require('../src/SQL/users');
const sendSafetyCode = require('../src/email/signUp');

//
const saltRounds = 10;


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
router.post('/login', async function (req, res, next) {
  try {

    let account = req.body.fAccount;
    let password = req.body.fPassword;

    console.log({ a: account, b: password });
    let token;

    let result = await memberSql.login(account, password);
    if (result.result) {

      let isTure = await bcrypt.compare(password, result.data.fPassword);
      if (!isTure) {
        res.send({ result: 0, msg: "密碼錯誤" });
      }


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
  }
  catch (err) {
    console.log(err);
    res.send({ result: 0, msg: "路由錯誤", data: err });
  }

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




// 搜尋列表
router.get('/', async function (req, res, next) {
  try {
    let result = await memberSql.memberList();

    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});



// 搜尋特定id
router.get('/:id', async function (req, res, next) {
  try {
    // *用 await 等待資料庫回應
    let result = await memberSql.memberById(req.params.id);
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});



// 搜尋 by name or account
router.get('/searchByAccountOrName/:str', async function (req, res, next) {
  try {
    // *用 await 等待資料庫回應
    let result = await memberSql.memberByNameOrAccount(req.params.str);
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});






module.exports = router;
