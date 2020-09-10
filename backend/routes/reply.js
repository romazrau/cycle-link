// 套件引用
var express = require("express");
var router = express.Router();
// *檔案引用
let Sql = require("../src/SQL/reply");

router.post("/", async function (req, res, next) {
  try {
    let PostId = req.body.fPostId;
    let ReplyMemberId = req.body.fReplyMemberId;
    let ReplyContent = req.body.fContent;
    console.log(PostId);
    console.log(ReplyMemberId);
    console.log(ReplyContent);

    let result = await Sql.AddReply(PostId, ReplyMemberId, ReplyContent);
    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
