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
        let ActDetailById = await Sql.ActDetailById(req.params.id);
        let TagById = await Sql.TagById(req.params.id);
        let JoinById = await Sql.JoinById(req.params.id);
        let JoinCount = await Sql.JoinCount(req.params.id);
        // res.json(result);
        // 物件用json格式回傳
        // 可以整理一下，刪掉不必要的資料再回傳
        res.json({
            result: 1,
            data: {
                detail: ActDetailById.data,
                tag: TagById.data,
                join: JoinById.data,
                joinCount: JoinCount.data
            }
        });

    } catch (err) {
        res.send(err);
    }
});



//* ----------------------- 新增活動 ----------------------- //
router.post('/', async function (req, res, next) {

    // if (!req.user) {
    //     // 確認 JWT 有解析成功
    //     res.json({
    //         result: 0,
    //         msg: "未登入"
    //     });
    //     return;
    // }

    try {
        console.log("====try start===");
        console.log("會員ID: ",
            req.user);
        console.log(req.user.fAccountType);
        console.log(req.body);

        let fActTypeId = 1;

        let {
            fActName,
            fCreatDate,
            fActivityDate,
            fActivityEndDate,
            fIntroduction,
            fImgPath,
            fActLabelId,
            fMaxLimit,
            fMinLimit,
            fActAttestId,
            fActLocation,
            fLabelName
        } = req.body

        if (!fImgPath) {
            fImgPath = null;
        }
        if (!fMaxLimit) {
            fMaxLimit = null;
        }
        if (!fMinLimit) {
            fMinLimit = null
        }
        if (req.user.fAccountType == "普通會員") {
            fActAttestId = 1
        } else if (req.user.fAccountType == "公眾人物") {
            fActAttestId = 2
        } else if (req.user.fAccountType == "白鯨會員") {
            fActAttestId = 3
        } else if (req.user.fAccountType == "白鯨公眾人物") {
            fActAttestId = 4
        }


        let fMemberId = req.user.fId;
        // console.log(fMemberId)
        let result = await Sql.createAct(fActName, fCreatDate, fActivityDate, fActivityEndDate, fMemberId, fIntroduction, fImgPath, fActLabelId, fMaxLimit, fMinLimit, fActAttestId, fActTypeId, fActLocation, fLabelName);
        if (!result.result) {
            res.json(result.data.message);
            return;
        }

        res.json({
            result: 1,
            msg: "傳送成功"
        });

    } catch (err) {
        res.send(err);
    }
})

//* ----------------------- 參加活動 ----------------------- //
router.post('/joinAct', async function (req, res, next) {
    try {
        console.log("====try start===");
        console.log("會員ID: ",
            req.user);
        console.log(req.body);

        let fJoinTypeId = 2;
        let {
            fActivityId,
            fJoinTime,
        } = req.body

        let fMemberId = req.user.fId;

        let result = await Sql.JoinAct(fActivityId, fMemberId, fJoinTime, fJoinTypeId);
        if (!result.result) {
            res.json(result.data.message);
            return;
        }

        res.json({
            result: 1,
            msg: "參加活動 成功"
        });

    } catch (err) {
        res.send(err);
    }
})

//* ----------------------- 取消參加活動 ----------------------- //
router.delete('/CancelJoinAct', async function (req, res, next) {
    try {
        console.log("====try start===");
        console.log("會員ID: ", req.user);
        // console.log(req.body);
        let {
            fActivityId
        } = req.body

        let fMemberId = req.user.fId;

        let result = await Sql.CancelJoinAct(fActivityId, fMemberId);
        if (!result.result) {
            res.json(result.data.message);
            return;
        }

        res.json({
            result: 1,
            msg: "取消參加活動 成功"
        });

    } catch (err) {
        res.send(err);
    }
})

//* ----------------------- 是否參加活動 ----------------------- //
router.get('/OrJoinAct/:actId', async function (req, res, next) {
    try {
        // *用 await 等待資料庫回應
        let fMemberId = req.user.fId;
        // console.log(fMemberId)
        let JoinId = await Sql.OrJoinAct(req.params.actId, fMemberId);


        // 物件用json格式回傳
        // 可以整理一下，刪掉不必要的資料再回傳
        res.json({
            result: 1,
            data: {
                joiner: JoinId.data,
            }
        });

    } catch (err) {
        console.log(err);
        res.send(err);
    }
});
// router.get('/:id', async function (req, res, next) {
//     try {
//         // *用 await 等待資料庫回應
//         let ActDetailById = await Sql.ActDetailById(req.params.id);
//         let TagById = await Sql.TagById(req.params.id);
//         let JoinById = await Sql.JoinById(req.params.id);
//         let JoinCount = await Sql.JoinCount(req.params.id);
//         // res.json(result);
//         // 物件用json格式回傳
//         // 可以整理一下，刪掉不必要的資料再回傳
//         res.json({
//             result: 1,
//             data: {
//                 detail: ActDetailById.data,
//                 tag: TagById.data,
//                 join: JoinById.data,
//                 joinCount: JoinCount.data
//             }
//         });

//     } catch (err) {
//         res.send(err);
//     }
// });


//* ----------------------- 新增標籤 ----------------------- //
router.post('/tag', async function (req, res, next) {
    try {
        // console.log(req.body);
        if (!req.body.fLabelName) {
            res.json({
                result: 0,
                msg: "???"
            });
            return;
        }

        let result = await Sql.createActTag(req.body.fLabelName);

        res.json(result);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})






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


// router.get('/joinById/:id', async function (req, res, next) {
//     try {
//         // *用 await 等待資料庫回應
//         let result = await Sql.JoinById(req.params.id);
//         // 物件用json格式回傳
//         // 可以整理一下，刪掉不必要的資料再回傳
//         res.json(result);

//     } catch (err) {
//         res.send(err);
//     }
// });


// 匯出方法
module.exports = router;