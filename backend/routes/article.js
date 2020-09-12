var express = require("express");
var router = express.Router();

let Sql = require("../src/SQL/article.js");

// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/post", async function (req, res, next) {
  try {
    let Postresult = await Sql.articlelist();
    res.json(Postresult);
  } catch (err) {
    res.send(err);
  }
});

router.get("/community/:communityid", async function (req, res, next) {
  try {
    let Postresult = await Sql.articleInCommunity(req.params.communityid);
    res.json(Postresult);
  } catch (err) {
    res.send(err);
  }
});

router.get("/reply", async function (req, res, next) {
  try {
    let Replyresult = await Sql.replylist();
    res.json(Replyresult);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:searchinput", async function (req, res, next) {
  try {
    let Searchresult = await Sql.searcharticle(req.params.searchinput);
    res.json(Searchresult);
  } catch (err) {
    res.send(err);
  }
});

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
    console.log(result);
    console.log(result.recordset);
    console.log(result.recordsets[0]);

    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
