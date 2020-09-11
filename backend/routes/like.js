// 套件引用
var express = require('express');
var router = express.Router();
// *檔案引用
let Sql =  require('../src/SQL/like');



// *測試SQL 語法    注意這裡要 async function，才有非同步效果
router.post('/add', async function(req, res, next) {                                      
  try{
    let fPostId=req.body.fPostId;
    let fMemberId= req.user.fId;
    console.log(fMemberId)
    console.log("fPostId:",fPostId)
    // *用 await 等待資料庫回應   
    let result = await Sql.Community_AddLike(fPostId,fMemberId);
                                    /////fPostId,fMemberId 
    // let result = await Sql.getLikes();      
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json(result);

  }catch(err){
    res.send(err);
  } 
});
router.delete('/remove', async function(req, res, next) {
    try{
     
      console.log("req.body:",req.body)
      let fPostId=req.body.fPostId;
      let fMemberId= req.user.fId;
      console.log("fMemberId:",fMemberId)
      console.log("fPostId:",fPostId)
      // *用 await 等待資料庫回應
      let result = await Sql.Community_RemoveLike(fPostId,fMemberId);
                                            //Postid,Memberid
      // let result = await Sql.getLikes(); 測試路由
      res.json(result);
  
    }catch(err){
      res.send(err);
    } 
  });


  router.get('/', async function(req, res, next) {
    try{
     
      
      let fLikeMemberId= req.user.fId;
      console.log("fLikeMemberId:",fLikeMemberId)
      
      // *用 await 等待資料庫回應
      let result = await Sql.getMemberlikelist(fLikeMemberId);
                                            //Postid,Memberid
      // let result = await Sql.getLikes(); 測試路由
      res.json(result);
  
    }catch(err){
      res.send(err);
    } 
  })

  router.get('/renewcount', async function(req, res, next) {
    try{
     
      
      let fPostId= req.body.fPostId;
      console.log("fPostId:",fPostId)
      
      // *用 await 等待資料庫回應
      let result = await Sql.renewCountLikes(fPostId);
                                            //Postid,Memberid
      // let result = await Sql.getLikes(); 測試路由
      res.json(result);
  
    }catch(err){
      res.send(err);
    } 
  })



// 匯出方法
module.exports = router;
