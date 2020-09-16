
// 套件引用
var express = require('express');
var router = express.Router();

//天氣api

var request = require('request');

// *檔案引用
let homesql =  require('../src/SQL/home');




router.get('/weather', async function(req, res, next) {
  try{
   
    // setInterval(function () {
      let weather;
      request('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-DFCC2695-9C94-49DF-BE65-118069C9A954&format=JSON&sort=time', { encoding: 'utf-8' }, function (err, response, body) {
        
        
        weather=JSON.parse(body);
        res.json(weather)
      });
      
    // }, 60000)
  }catch(err){
    res.send(err);
  } 
});




// *測試SQL 語法    注意這裡要 async function，才有非同步效果
router.get('/', async function(req, res, next) {
  try{
    // *用 await 等待資料庫回應
    let ban = await homesql.HomePageActivity();
    let recentActivity =await homesql.HomePagerecentActivity();
    let img=await homesql.HomePageActivityImg();
    // 物件用json格式回傳
    // 可以整理一下，刪掉不必要的資料再回傳
    res.json({
            result:1,
            data:{
                banner: ban.data,
                recent: recentActivity.data,
                imgs:img.data
              },
        });
  }catch(err){
    res.send(err);
  } 
});





// 匯出方法
module.exports = router;
