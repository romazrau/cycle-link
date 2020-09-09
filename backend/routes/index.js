// 套件引用
var express = require('express');
var router = express.Router();
// *檔案引用
let testSql =  require('../src/SQL/test');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// *測試SQL 語法    注意這裡要 async function，才有非同步效果
router.get('/test', async function(req, res, next) {
  try{
    // *用 await 等待資料庫回應
    let result = await testSql();
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(result);

  }catch(err){
    console.log(err);
    res.send(err);
  } 
});


// 匯出方法
module.exports = router;
