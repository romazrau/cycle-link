const sql = require("mssql");

const config = {
  user: "sa",
  password: "everybodycanuse",
  server: "localhost", // You can use 'localhost\\instance' to connect to named instance
  database: "SeaTurtleOnTheWay",
};

const articlelist = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    // 連接資料庫
    await sql.connect(config);
    // *丟SQL 指令並儲存結果，SQL指令先去SQL server測試成功再貼在這裡喔
    let str = `WITH PostMember AS(select p.fMemberId, p.fCommunityId, p.fPostTime, p.fImgPaths as PostImg, p.fId as PostId, p.fContent as PostContent, m.fName as PostMemberName, m.fId as MemberId, m.fPhotoPath as MemberImgPath
      from Community.tPost as p
      left join Member.tMember as m
      on p.fMemberId=m.fId)
      
      , PostCommunity AS(select p.fId as PostId, c.fId as CommunityId, c.fName as CommunityName, c.fImgPath as CommunityImgPath
      from Community.tPost as p
      left join Community.tCommunity as c
      on p.fCommunityId=c.fId)
      
      , PostDetail AS(select pm.*, pc.CommunityId, pc.CommunityName, pc.CommunityImgPath
      from PostMember as pm
      left join PostCommunity as pc
      on pm.PostId=pc.PostId)
      
      , ReplyDetail AS(select r.*,m.fName as ReplyMemberName, m.fPhotoPath as ReplyMemberImg
      from Community.tReply as r
      left join Member.tMember as m
      on r.fReplyMemberId=m.fId)
      
      select *
      from PostDetail as pd
      left join ReplyDetail as rd
      on pd.PostId=rd.fPostId`;
    const result = await sql.query(str);
    // 看一下回傳結果
    // console.dir(result);
    console.dir(result.recordset);
    console.dir(result.rowsAffected[0]);
    // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
    return { result: 1, msg: "請求成功", data: result.recordset };
  } catch (err) {
    console.log(err);
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};
// articlelist();
module.exports = { articlelist };
