

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
  }
  catch(err){
    res.send(err);
  } 
});

//為您推薦

router.get('/activeforyou', async function(req, res, next) {
  // 判斷前端req資料是否有登入，如為false回傳result:0
  

  try{
    // *用 await 等待資料庫回應
    let resultforyou = await activesql.activeforyousql(); 
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(resultforyou);
  }catch(err){
    console.log(err);
    res.send({result:0, msg:"路由錯誤", data:err});
  } 
});


//瀏覽過的活動

router.get('/activeseen', async function(req, res, next) {
  // 判斷前端req資料是否有登入，如為false回傳result:0
  if( !req.user ){
    res.json({result:0, msg:"TOKEN?"});
    return;
  }

  try{
    // *用 await 等待資料庫回應
    // todo let resultactiveseen = await activesql.activeseensql( req.user.fId  ); 
    let resultactiveseen = await activesql.activeseensql(req.user.fId); 
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(resultactiveseen);
  }catch(err){
    console.log(err);
    res.send({result:0, msg:"路由錯誤", data:err});
  } 
});

router.get('/activeinsertseensql/:actId/:dateStr', async function(req, res, next) {
  // 判斷前端req資料是否有登入，如為false回傳result:0
  if( !req.user ){
    res.json({result:0, msg:"TOKEN?"});
    //如果沒有登入將Id設為訪客
    //req.user.fId=2;
    return;
  }
  console.log(req.params);
  req.params.dateStr =  req.params.dateStr.split(",").join("/");
  try{
    // *用 await 等待資料庫回應s
    let resultactiveseeninsert = await activesql.activeinsertseensql(req.params.actId,req.user.fId,req.params.dateStr); 
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(resultactiveseeninsert);
    // console.log(resultactiveseeninsert);
  }catch(err){
    res.send({result:0, msg:"路由錯誤", data:err});
  } 
});

// 加入我的興趣
router.post('/addActLikeToSQL', async function(req, res, next) {
  // 判斷前端req資料是否有登入，如為false回傳result:0
  if( !req.user ){
    res.json({result:0, msg:"TOKEN?"});
    return;
  }
  try{
    // *用 await 等待資料庫回應
    let fMemberId = req.user.fId ;
    let {fActivityId,fJoinTime,fJoinTypeId} = req.body;

    let resultforyou = await activesql.addActLikeTosql(fActivityId,fMemberId,fJoinTime,fJoinTypeId); 
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(resultforyou);
  }catch(err){
    console.log(err);
    res.send({result:0, msg:"路由錯誤", data:err});
  } 
});

router.delete('/removeactlikesql', async function(req, res, next) {
  try{
   
    console.log("req.body:",req.body)
    let fActivityId=req.body.fActivityId;
    let fMemberId= req.user.fId;
    console.log("fMemberId:",fMemberId)
    console.log("fActivityId:",fActivityId)
    // *用 await 等待資料庫回應
    let result = await Sql.removeactlikesql(fActivityId,fMemberId);
                                          //Postid,Memberid
    // let result = await Sql.getLikes(); 測試路由
    res.json(result.data);

  }catch(err){
    res.send(err);
  } 
});

// 匯出方法
module.exports = router;
