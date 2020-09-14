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
    console.log(12321313123);
    let fMemberId = req.user.fId;
    console.log(fMemberId);
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

//搜尋文章
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
    let fImgPaths = req.body.fImgPaths;

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
