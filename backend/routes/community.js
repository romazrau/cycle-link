// 套件引用
var express = require('express');
var router = express.Router();
// *檔案引用
let Sql = require('../src/SQL/community');
const { clearScreenDown } = require('readline');





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
//body:[{"fName":value,"fStatusId":value,"fImgPath":value,"fInfo":value}]
//把物件屬性拆開當參數去SQL function
//創立時間在這邊寫進去
//restful.API 風格
router.post('/', async function (req, res, next) {
    try {
        console.log(req.body);

        //TODO 時間字串
        let dateObj = new Date();
        //es6 物件解構
        let { fName, fStatusId, fImgPath, fInfo } = req.body
        console.log(req.body);
        let fDate = dateObj.toLocaleDateString();
        console.log("creat time " + fDate);
        let result = await Sql.communityCreate(fName, fStatusId, fImgPath, fInfo, fDate);


        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});




// 匯出方法
module.exports = router;
