const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// session
const session = require("express-session");
const sessionKey = require("../src/sessionKey");
``;
// JWT
const jsonwebtoken = require("jsonwebtoken");

// src 資源
const memberSql = require("../src/SQL/users");
const sendSafetyCode = require("../src/email/signUp");
const sendNewPassword = require("../src/email/forgetPassword");

// bcrypt 雜湊亂碼產生器
const saltRounds = 10;

/* GET users listing. */
router.get("/testGuest", function (req, res, next) {
  memberSql
    .test()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

const reflashToken = async (id) => {
  try {
    let result = await memberSql.memberById(id);
    if (!result.result) {
      return { result: 0, msg: "id錯誤" };
    }

    let token =
      "Bearer " +
      jsonwebtoken.sign(
        {
          fId: result.data.fId,
          fName: result.data.fName,
          fAccountType: result.data.fAccountType,
          fAccountAuthority: result.data.fAccountAuthority,
        },
        "DayDayLuLuDaDaMiMiJJTenTen",
        {
          expiresIn: 3600 * 24 * 3,
        },
        { algorithm: "HS256" }
      );
    return { result: 1, msg: "請求成功", token: token };
  } catch (ex) {
    return { result: 2, msg: "reflashToken 方法錯誤" };
  }
};

// POST Login
router.post("/login", async function (req, res, next) {
  try {
    let account = req.body.fAccount; // POST 攜帶的資料會被其他中間層解析
    let password = req.body.fPassword; // 並放入 req.body 裡

    let result = await memberSql.login(account); // SQL 從帳號撈出對應資料
    if (!result.result) {
      // 查詢失敗回傳結果
      res.json(result);
      return; // 離開 func
    }

    let isTure = await bcrypt.compare(password, result.data.fPassword); // 另外個套件，解析加密過的密碼
    if (!isTure) {
      // 密碼不符
      res.send({ result: 0, msg: "密碼錯誤" });
      return;
    }

    delete result.data.fPassword; // 刪除敏感屬性

    // 產生 token，規定 JWT 前還要放個 'Bearer '。
    let token =
      "Bearer " +
      jsonwebtoken.sign(
        {
          // *攜帶的資料物件
          fId: result.data.fId,
          fName: result.data.fName,
          fAccountType: result.data.fAccountType,
          fAccountAuthority: result.data.fAccountAuthority,
        },
        "DayDayLuLuDaDaMiMiJJTenTen", // 加密文字，極重要，不可讓駭客知道喔啾咪
        {
          expiresIn: 3600 * 24 * 3, // JWT 有效時間
        },
        { algorithm: "HS256" } // 加密方式
      );

    console.log("user:", result);
    res.json({ ...result, token: token }); // 把 SQL 從帳號撈出對應資料與 JWT 回傳
  } catch (err) {
    console.log(err);
    res.send({ result: 0, msg: "路由錯誤", data: err });
  }
});

// is Login?
router.get("/login", async (req, res) => {
  if (!req.user) {
    // 確認 JWT 有解析成功
    res.json({ result: 0, msg: "未登入" });
    return;
  }

  let result = { result: 1, msg: "認證成功", data: req.user }; // *req.user 有之前裝入的資料物件喔
  // console.log(req.user);

  let token;
  if (result.result) {
    let newToken = await reflashToken(req.user.fId); // 發新的 token
    if (newToken.result) {
      token = newToken.token;
    }
  }

  res.json({ ...result, token: token });
});

// Log out // TODO 前端要刪掉Localstroge
router.get("/logout", (req, res) => {
  let result = req.user
    ? { result: 0, msg: "登出失敗", data: req.user }
    : { result: 1, msg: "已登出" };
  res.json(result);
});

// Change Member Detail
router.put("/", async (req, res) => {
  try {
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
  } catch (ex) {
    console.log(ex);
    res.json({ result: 0, msg: "路由錯誤", data: ex });
  }
});

// Change Member password
router.put("/password", async (req, res) => {
  try {
    if (!req.user) {
      res.json({ result: 0, msg: "token 遺失" });
    }

    // 密碼雜湊
    let password = await bcrypt.hash(req.body.fPassword, saltRounds);

    let result = await memberSql.changePassword(req.user.fId, password);

    res.json({ ...result });
  } catch (ex) {
    console.log(ex);
    res.json({ result: 0, msg: "路由錯誤", data: ex });
  }
});

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    let {
      fAccount,
      fPassword,
      fName,
      fBirthdate,
      fMail,
      fAddress,
      fCity,
      fCeilphoneNumber,
      fIntroduction,
    } = req.body;

    let checkAccount = await memberSql.memberByAccount(fAccount);
    if (checkAccount.result) {
      res.json({ result: 0, msg: "帳號已存在" });
      return;
    }

    // 寄信
    let result = await sendSafetyCode(fMail);
    if (!result.result) {
      res.json(result);
      return;
    }

    // 密碼雜湊
    let password = await bcrypt.hash(fPassword, saltRounds);
    fPassword = password;

    // TODO 接收img
    let fPhotoPath = "";

    req.session[sessionKey.SK_USER_DATA] = {
      fAccount,
      fPassword,
      fName,
      fBirthdate,
      fMail,
      fAddress,
      fCity,
      fCeilphoneNumber,
      fPhotoPath,
      fIntroduction,
    };
    req.session[sessionKey.SK_SIGNUP_SAFTY_CODE] = result.code;

    res.json({ result: 1, msg: `已發送認證信，請至${fMail}信箱確認` });
  } catch (ex) {
    console.log(ex);
    res.json({ result: 0, msg: "路由錯誤", data: ex });
  }
});

// is Sign Up safyty code correct  and finish  Sign Up
router.get("/signup/:code", async (req, res) => {
  try {
    if (req.params.code != req.session[sessionKey.SK_SIGNUP_SAFTY_CODE]) {
      res.json({ result: 0, msg: "認證碼不符" });
      return;
    }

    if (!req.session[sessionKey.SK_USER_DATA]) {
      res.json({ result: 0, msg: "註冊資料遺失" });
      return;
    }

    const {
      fAccount,
      fPassword,
      fName,
      fBirthdate,
      fMail,
      fAddress,
      fCity,
      fCeilphoneNumber,
      fPhotoPath,
      fIntroduction,
    } = req.session[sessionKey.SK_USER_DATA];

    let result = await memberSql.createMember(
      fAccount,
      fPassword,
      fName,
      fBirthdate,
      fMail,
      fAddress,
      fCity,
      fCeilphoneNumber,
      fPhotoPath,
      fIntroduction
    );

    delete req.session[sessionKey.SK_USER_DATA];
    delete req.session[sessionKey.SK_SIGNUP_SAFTY_CODE];

    res.json(result);
  } catch (ex) {
    console.log(ex);
    res.json({ result: 0, msg: "路由錯誤" });
  }
});

// Forget Password & send email
router.post("/Forget/Password", async (req, res) => {
  try {
    let account = req.body.fAccount;
    let mail = req.body.fMail;

    let check = await memberSql.memberByAccountAndEmail(account, mail);
    if (!check.result) {
      res.json(check);
      return;
    }

    let send = await sendNewPassword(mail);
    if (!send.result) {
      res.json(send);
      return;
    }

    // TODO 密碼加密
    let password = await bcrypt.hash(send.code, saltRounds);

    let result = await memberSql.changePassword(check.data.fId, password);
    if (!result.result) {
      res.json(result);
      return;
    }

    res.json({ result: 1, msg: `已發送認證信，請至${mail}信箱確認` });
  } catch (ex) {
    console.log(ex);
    res.json({ result: 0, msg: "路由錯誤", data: ex });
  }
});

// 搜尋列表
router.get("/", async function (req, res, next) {
  try {
    let result = await memberSql.memberList();

    res.json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// 搜尋特定id
router.get("/:id", async function (req, res, next) {
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
router.get("/searchByAccountOrName/:str", async function (req, res, next) {
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
