

// 套件引用
var express = require('express');
var router = express.Router();
// *檔案引用
let activesql =  require('../src/SQL/active');





// *測試SQL 語法    注意這裡要 async function，才有非同步效果
router.get('/', async function(req, res, next) {
  try{
    // *用 await 等待資料庫回應
    let result = await activesql.activesql();
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(result);
  }catch(err){
    res.send(err);
  } 
});
//主標籤類別
router.get('/searchmainlevel', async function(req, res, next) {
  try{
    // *用 await 等待資料庫回應
    let resultmainlevel = await activesql.activemainlevelsql();
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(resultmainlevel);
  }catch(err){
    res.send(err);
  } 
});
//大標搜尋鈕
router.get('/:id', async function(req, res, next) {
  try{
    // *用 await 等待資料庫回應
    let resultgosearch = await activesql.activegosearchsql( req.params.id );
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(resultgosearch);
  }catch(err){
    res.send(err);
  } 
});





// 匯出方法
module.exports = router;
