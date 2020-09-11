// 套件引用
var express = require("express");
var router = express.Router();
// *檔案引用
let Sql = require("../src/SQL/reply");

router.post("/", async function (req, res, next) {
  try {
    let fPostId = req.body.fPostId;
    let fReplyMemberId = req.user.fId;
    let fContent = req.body.fContent;
    let fReplyTime = req.body.fReplyTime;
    // 這句到底錯在哪？let { fPostId, fContent, fReplyTime } = req.body;
    // console.log(req.body);
    let result = await Sql.AddReply(
      fPostId,
      fReplyMemberId,
      fContent,
      fReplyTime
    );
    res.json(result);
    console.log(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
