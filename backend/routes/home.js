
// 套件引用
var express = require('express');
var router = express.Router();
// *檔案引用
let homesql =  require('../src/SQL/home');





// *測試SQL 語法    注意這裡要 async function，才有非同步效果
router.get('/', async function(req, res, next) {
  try{
    // *用 await 等待資料庫回應
    let result = await homesql.HomePageActivity();
    let result2 =await homesql.HomePagerecentActivity();
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json({
            result:1,
            data:{
                banner: result.data,
                recent: result2.data,
            },
        });
  }catch(err){
    res.send(err);
  } 
});






// 匯出方法
module.exports = router;
