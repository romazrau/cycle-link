

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
router.get('/:id/:text', async function(req, res, next) {
  try{
    // *用 await 等待資料庫回應
    let resultgosearch = await activesql.activegosearchsql( req.params.id , req.params.text);
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(resultgosearch);
    console.log("test",resultgosearch);
  }catch(err){
    res.send(err);
  } 
});

//瀏覽過的活動

router.get('/activeseen', async function(req, res, next) {
  // 判斷前端req資料是否有登入，如為false回傳result:0
  // if( !req.user ){
  //   res.json({result:0, msg:"TOKEN?"});
  //   return;
  // }
  //todo token 還沒做完

  try{
    // *用 await 等待資料庫回應
    // todo let resultactiveseen = await activesql.activeseensql( req.user.fId  ); 
    let resultactiveseen = await activesql.activeseensql(6); 
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(resultactiveseen);
  }catch(err){
    console.log(err);
    res.send({result:0, msg:"路由錯誤", data:err});
  } 
});


// 匯出方法
module.exports = router;
