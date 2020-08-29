var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

//路由引入
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(session({
  secret: 'DayDayLuLuDaDaMiMiJJTenTen', // 對session id 相關的cookie 進行簽名
  resave: true,      // 沒變更內容是否強制回存
  saveUninitialized: false, // 是否儲存未初始化的會話
  cookie: {
    maxAge: 1000 * 60 * 30, // 設定 session 的有效時間，單位毫秒
  },
}));


//路由區
app.use('/', indexRouter);
app.use('/users', usersRouter);






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
