var express = require("express");
var router = express.Router();

let articleSql = require("../src/SQL/article.js");

// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/", async function (req, res, next) {
  try {
    let result = await articleSql.articlelist();
    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
