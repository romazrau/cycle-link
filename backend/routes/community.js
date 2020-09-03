// 套件引用
var express = require('express');
var router = express.Router();
// *檔案引用
let Sql = require('../src/SQL/community');





// *測試SQL 語法    注意這裡要 async function，才有非同步效果
router.get('/', async function (req, res, next) {
    try {
        // *用 await 等待資料庫回應
        let result = await Sql.communityList();

        // 物件用json格式回傳
        // 可以整理一下，刪掉不必要的資料再回傳
        res.json(result);


    } catch (err) {
        res.send(err);
    }
});

// 此路由/:id Restful.API
router.get('/:id', async function (req, res, next) {
    try {
        let result = await Sql.communityById_communityDetail(req.params.id);

        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

// 此路由開始不依照Restful.API
router.get('/communityManager/:id', async function (req, res, next) {
    try {
        let result = await Sql.communityById_communityManager(req.params.id);

        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

router.get('/communityById_communityMember/:id', async function (req, res, next) {
    try {
        let result = await Sql.communityById_communityMember(req.params.id);
        // params 是post解決querystring
        // console.log(req.params);

        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

router.get('/communityByString/:str', async function (req, res, next) {
    try {
        console.error(req.params.str);
        let result = await Sql.communityByString(req.params.str);

        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});


//TODO 新增社團
//body:[{"communityName":value,"communityStatus":value,"communityPicture":value,"communityInfo":value}]
//把物件屬性拆開當參數去SQL function
//創立時間在這邊寫進去
router.get('/communityCreate', async function (req, res, next) {
    try {
        console.log(req.body);

        //TODO 時間字串
        let dateObj = Date();

        let communityName = req.body.communityName;
        let communityStatus = req.body.communityStatus;
        let communityPicture = req.body.communityPicture;
        let communityInfo = req.body.communityInfo;
        let communityCreatTime = dateObj;
        let result = await Sql.communityCreate(communityName, communityStatus, communityPicture, communityInfo, communityCreatTime);


        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});




// 匯出方法
module.exports = router;
