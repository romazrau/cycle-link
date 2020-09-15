var express = require("express");
var router = express.Router();

let Sql = require("../src/SQL/article.js");

// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

//社團首頁：文章列表
router.get("/post", async function (req, res, next) {
  try {
    let Postresult = await Sql.articlelist();
    res.json(Postresult);
  } catch (err) {
    res.send(err);
  }
});

//社團頁面：文章列表
router.get("/community/:communityid", async function (req, res, next) {
  try {
    let Postresult = await Sql.articleInCommunity(req.params.communityid);
    res.json(Postresult);
  } catch (err) {
    res.send(err);
  }
});

router.get("/userinfo", async function (req, res, next) {
  try {
    let fMemberId = req.user.fId;
    let UserResult = await Sql.ShowUserInfo(fMemberId);
    res.json(UserResult);
    console.log(UserResult);
  } catch (err) {
    res.send(err);
  }
});

//社團文章：留言列表
router.get("/reply", async function (req, res, next) {
  try {
    let Replyresult = await Sql.replylist();
    res.json(Replyresult);
  } catch (err) {
    res.send(err);
  }
});

//熱門社團
router.get("/hottiest/:nowMonth", async function (req, res, next) {
  try {
    let hottiestResult = await Sql.the4hottiest(req.params.nowMonth);
    for (let i = 0; i < hottiestResult.data.length; i++) {
      if (!hottiestResult.data[i].communityImg) {
        hottiestResult.data[i].communityImg =
          "img/community/community-default.png";
      }
    }
    res.json(hottiestResult);
  } catch (err) {
    res.send(err);
  }
});
//探索社團
router.get("/explore", async function (req, res, next) {
  try {
    let exploreResult = await Sql.explore4community();
    //判斷社團照片為空值時，帶入預設圖片
    for (let i = 0; i < exploreResult.data.length; i++) {
      if (!exploreResult.data[i].communityImg) {
        exploreResult.data[i].communityImg =
          "img/community/community-default.png";
      }
    }
    res.json(exploreResult);
  } catch (err) {
    res.send(err);
  }
});

//****搜尋文章（這個之後的路徑不能用/xxx，不然會被蓋掉）
router.get("/:searchinput", async function (req, res, next) {
  try {
    let Searchresult = await Sql.searcharticle(req.params.searchinput);
    res.json(Searchresult);
  } catch (err) {
    res.send(err);
  }
});

//新增文章
router.post("/add", async function (req, res, next) {
  try {
    let fPostMemberId = req.user.fId;
    let fCommunityId = req.body.fCommunityId;
    let fPostTime = req.body.fPostTime;
    let fContent = req.body.fContent;
    // let fImgPaths = "qweq";
    let fImgPaths = "";
    for (let i = 0; i < req.files.length; i++) {
      fImgPaths += "img/" + req.files[i].filename;
      fImgPaths += ",,";
    }
    // let fImgPaths = "img/" + req.files[0].filename;
    console.log("-----------------------------------");
    // console.log(req.files);
    // console.log(fImgPaths);
    // let {
    //   fContent,
    //   f
    // }
    let result = await Sql.addarticle(
      fPostMemberId,
      fCommunityId,
      fPostTime,
      fContent,
      fImgPaths
    );

    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
