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

router.get("/reply", async function (req, res, next) {
  try {
    let Replyresult = await Sql.replylist();
    res.json(Replyresult);
  } catch (err) {
    res.send(err);
  }
});

router.get("/search", async function (req, res, next) {
  try {
    let Searchresult = await Sql.searcharticle(req.headers.get('searchinput'));
    res.json(Searchresult);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
