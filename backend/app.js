const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
// from data 解析必備
const multer  = require('multer');
const upload = multer();
// 特殊套件
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');
const session = require("express-session");
const cors = require("cors");

// *路由引入
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postRouter = require("./routes/post");
var activityDetailRouter = require("./routes/activity_detail");
var mapRouter = require("./routes/map");
var activeRouter = require("./routes/active");
var articleRouter = require("./routes/article");
var communityRouter = require("./routes/community");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(upload.array());
//session
app.use(
  session({
    secret: "DayDayLuLuDaDaMiMiJJTenTen", // 對session id 相關的cookie 進行簽名
    resave: true, // 沒變更內容是否強制回存
    saveUninitialized: false, // 是否儲存未初始化的會話
    cookie: {
      maxAge: 1000 * 60 * 30, // 設定 session 的有效時間，單位毫秒
    },
  })
);
// cors
const whitelist = ['http://127.0.0.1:5501', 'http://127.0.0.1:5500', 'http://127.0.0.1:5502', undefined];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback){
    console.log('origin: '+origin);
    if(whitelist.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
// jwt
app.use(jwt({
  secret: "DayDayLuLuDaDaMiMiJJTenTen",  // 签名的密钥 或 PublicKey
  algorithms: ['HS256'],
  credentialsRequired: false
}))


app.post('/login', function (req, res) {
  // 注意默认情况 Token 必须以 Bearer+空格 开头
  const token = 'Bearer ' + jsonwebtoken.sign(
    {
      admin: 'admin'
    },
    "DayDayLuLuDaDaMiMiJJTenTen",
    {
      expiresIn: 3600 * 24 * 3
    },
    { algorithm: 'HS256'}
  )
  res.json({
    status: 'ok',
    data: { token: token }
  })
})




app.get('/protected', function (req, res) {
  console.log(req.user);

  if (!req.user.admin)
    return res.sendStatus(401)
  res.json(req.user)
})





// *路由區，把路由分給哪個檔案
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postRouter);
app.use("/activityDetail", activityDetailRouter);
app.use("/map", mapRouter);
app.use("/active", activeRouter);
app.use("/article", articleRouter);
app.use("/community", communityRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
