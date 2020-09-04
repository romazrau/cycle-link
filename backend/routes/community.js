// 套件引用
var express = require('express');
var router = express.Router();
// *檔案引用
let Sql = require('../src/SQL/community');
const { clearScreenDown } = require('readline');
const { strictEqual } = require('assert');




//查詢所有社團
// *測試SQL 語法    注意這裡要 async function，才有非同步效果
router.get('/', async function (req, res, next) {
    try {
        // *用 await 等待資料庫回應
        let result = await Sql.communityList();

        // 物件用json格式回傳
        // 可以整理一下，刪掉不必要的資料再回傳
        res.json(result);


    } catch (err) {
        res.send({ result: 0, msg: "路由錯誤", data: err });
    }
});

//查詢社團by社團id
// 此路由/:id Restful.API
router.get('/:id', async function (req, res, next) {
    try {
        let result = await Sql.communityById_communityDetail(req.params.id);

        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send({ result: 0, msg: "路由錯誤", data: err });
    }
});

//查詢社團管理員byId
// 此路由開始不依照Restful.API
router.get('/communityManager/:id', async function (req, res, next) {
    try {
        let result = await Sql.communityById_communityManager(req.params.id);

        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send({ result: 0, msg: "路由錯誤", data: err });
    }
});


//查詢社團成員byId
router.get('/communityById_communityMember/:id', async function (req, res, next) {
    try {
        let result = await Sql.communityById_communityMember(req.params.id);
        // params 是post解決querystring
        // console.log(req.params);

        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send({ result: 0, msg: "路由錯誤", data: err });
    }
});

//查詢社團by社團名字
router.get('/communityByString/:str', async function (req, res, next) {
    try {
        console.error(req.params.str);
        let result = await Sql.communityByString(req.params.str);

        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send({ result: 0, msg: "路由錯誤", data: err });
    }
});


//新增社團
//!body:[{"fName":value,"fStatusId":value,"fImgPath":value,"fInfo":value}]
//!fSatusId 在前端處理傳回為數字
//把物件屬性拆開當參數去SQL function
//創立時間在這邊寫進去
//restful.API 風格
router.post('/', async function (req, res, next) {
    try {
        console.log(req.body);



        //es6 物件解構
        let { fName, fStatusId, fImgPath, fInfo } = req.body




        //時間"物件"
        let dateObj = new Date();
        let fDate = dateObj.toLocaleDateString();

        console.log("creat time " + fDate);
        let result = await Sql.communityCreate(fName, fStatusId, fImgPath, fInfo, fDate);


        //顯示在頁面上 
        res.json(result);
    } catch (err) {
        res.send({ result: 0, msg: "路由錯誤", data: err });
    }
});


//刪除社團
// 此路由/:id Restful.API
//binding 方法,req,res是路由router方法給的
router.delete('/:id', async function (req, res, next) {

    try {

        let result = await Sql.communityDelet(req.params.id);
        res.json(result);


    } catch (err) {
        res.send({ result: 0, msg: "路由錯誤", data: err });
    }

})



// 匯出方法
module.exports = router;
