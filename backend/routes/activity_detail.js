// 套件引用
var express = require('express');
var router = express.Router();
var session = require('express-session');
var sessionKey = require('../src/sessionKey');
// *檔案引用
let Sql = require('../src/SQL/activity_detail');



// *測試SQL 語法    注意這裡要 async function，才有非同步效果
router.get('/', async function (req, res, next) {
    try {
        // *用 await 等待資料庫回應
        let result = await Sql.ActDetail();
        // 物件用json格式回傳
        // 可以整理一下，刪掉不必要的資料再回傳
        console.log(req.session[sessionKey.SK_USER_DATA]);
        res.json(result);

    } catch (err) {
        res.send(err);
    }
});


router.get('/:id', async function (req, res, next) {
    try {
        // *用 await 等待資料庫回應
        let result = await Sql.ActDetailById(req.params.id);

        let result2 = await Sql.TagById(req.params.id);
        // 物件用json格式回傳
        // 可以整理一下，刪掉不必要的資料再回傳
        res.json({
            result: 1,
            data: {
                detail: result.data,
                tag: result2.data
            }
        });

    } catch (err) {
        res.send(err);
    }
});

// router.get('/tagById/:id', async function (req, res, next) {
//     try {
//         // *用 await 等待資料庫回應
//         let result = await Sql.TagById(req.params.id);
//         // 物件用json格式回傳
//         // 可以整理一下，刪掉不必要的資料再回傳
//         res.json(result);

//     } catch (err) {
//         res.send(err);
//     }
// });


router.get('/joinById/:id', async function (req, res, next) {
    try {
        // *用 await 等待資料庫回應
        let result = await Sql.JoinById(req.params.id);
        // 物件用json格式回傳
        // 可以整理一下，刪掉不必要的資料再回傳
        res.json(result);

    } catch (err) {
        res.send(err);
    }
});


// 匯出方法
module.exports = router;