// 套件引用
var express = require('express');
var router = express.Router();
// *檔案引用
let Sql = require('../src/SQL/community');





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



//查詢社團by社員ID
router.get('/communityByMemberId/:id', async function (req, res, next) {
    try {



        let result = await Sql.communityByMemberId(req.params.id);
        res.json(result);

    } catch (err) {
        res.send({ result: 0, msg: "路由錯誤", data: err })
    }


})



// serverURL.community + id 
// !資料都在這裡過濾處理 再用data送回前端
// 查詢社團by社團id
// 此路由/:id Restful.API
router.get('/:id', async function (req, res, next) {
    try {

        //----創變數(最後會包入data回傳使用者身分):管理員 社員 非社員(含訪客)
        let user = "";

        //訪客的id 是 2
        let memberId = 2;
        //token
        //----判斷是否為會員 非會員維持memberId 2
        if (req.user.fId) {
            memberId = req.user.fId
        }

        let result = await Sql.communityById_communityDetail(req.params.id);
        // console.log('++++++++++++');
        // console.log(result);
        //----丟入社團ID把所有社員資料撈出
        let memberOfCommunity = await Sql.communityById_communityMember(req.params.id);
        // console.log('++++++++++++++++++');
        // console.log(memberOfCommunity);

        // 沒有成員回傳 非管理員
        if (!memberOfCommunity.result) {
            result.data[0].user = "非社員";
            res.json(result);
            return;
        }

        //memberOfCommunity.data 是物件array
        // console.log(memberOfCommunity.data);
        //----把社員id拿出放進一個array
        let MemberIdArray = [];
        memberOfCommunity.data.forEach(element => {
            MemberIdArray.push(element.fMemberId)
        });

        //----比對會員id是否在array內 if true : 判斷是否為管理員 else 會員 

        if (MemberIdArray.includes(memberId)) {

            let Managers = await Sql.communityById_communityManager(req.params.id);

            let idarr = [];
            Managers.data.forEach(e => {
                idarr.push(e.fId);
            })

            if (idarr.includes(memberId)) {
                user = "管理員";

            } else {
                user = "社員";
            }
        }
        else {
            user = "非社員";
        }
        //----把user放進result.data裡用res.json()回傳
        result.data[0].user = user;
        // console.log('++++++++++++++++++');
        // console.log(result.data[0]);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.send({ result: 0, msg: "路由錯誤", data: err });
    }
});

//查詢社團管理員byId
// 此路由開始不依照Restful.API
router.get('/communityManager/:id', async function (req, res, next) {
    try {
        let result = await Sql.communityById_communityManager(req.params.id);


        res.json(result);
    } catch (err) {
        res.send({ result: 0, msg: "路由錯誤", data: err });
    }
});


//查詢社團成員by社團Id
router.get('/communityById_communityMember/:id', async function (req, res, next) {
    try {
        let result = await Sql.communityById_communityMember(req.params.id);
        // let resultStatus =
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
