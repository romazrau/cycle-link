const sql = require("mssql");

const config = {
  // user: 'sa',
  // password: 'P@ssw0rd',
  user: process.env.SQLSERVER_USER || "sa",
  password: process.env.SQLSERVER_PASSWORD || "everybodycanuse",
  server: process.env.SQLSERVER_SERVER || "localhost", // You can use 'localhost\\instance' to connect to named instance
  database: process.env.SQLSERVER_DATABASE || "SeaTurtleOnTheWay",
  options: {
    enableArithAbort: true,
    encrypt: true,
  },
  port: parseInt(process.env.SQLSERVER_POST, 10) || 1433,
};

//社團首頁：文章列表
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
      , PostReplyCount AS(select r.fPostId , count(r.fId) as HowMuchReply
      from Community.tReply as r
      group by r.fPostId)
      , PostLikeCount AS(select l.fPostId, count(l.fId) as HowMuchLike
      from Community.tLike as l  
      group by l.fPostId)
      , PostAndReply AS(select pd.*, r.HowMuchReply
      from PostDetail as pd
      left join PostReplyCount as r
      on pd.PostId = r.fPostId)
	    , PostAndReplyAndLike AS(select par.*, l.HowMuchLike
      from PostAndReply as par
      left join PostLikeCount as l
      on par.PostId = l.fPostId)
      select *
      from PostAndReplyAndLike`;
    const result = await sql.query(str);
    // 看一下回傳結果
    // console.dir(result);
    // console.dir(result.recordset);
    // console.dir(result.rowsAffected[0]);
    // *回傳結果，包成物件，統一用 result 紀錄成功(1)或失敗(0)，msg存敘述，data傳資料，其他需求就新增其他屬性
    return { result: 1, msg: "請求成功", data: result.recordset };
  } catch (err) {
    console.log(err);
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};
// articlelist();

//社團頁面：顯示該社團文章
const articleInCommunity = async (communityId) => {
  try {
    await sql.connect(config);
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
      , PostReplyCount AS(select r.fPostId , count(r.fId) as HowMuchReply
      from Community.tReply as r
      group by r.fPostId)
      , PostLikeCount AS(select l.fPostId, count(l.fId) as HowMuchLike
      from Community.tLike as l  
      group by l.fPostId)
      , PostAndReply AS(select pd.*, r.HowMuchReply
      from PostDetail as pd
      left join PostReplyCount as r
      on pd.PostId = r.fPostId)
	    , PostAndReplyAndLike AS(select par.*, l.HowMuchLike
      from PostAndReply as par
      left join PostLikeCount as l
      on par.PostId = l.fPostId)
      select *
      from PostAndReplyAndLike
      where fCommunityId=${communityId}
      order by Convert(datetime, fPostTime) DESC`;
    const result = await sql.query(str);
    // console.dir(result);
    return { result: 1, msg: "請求成功", data: result.recordset };
  } catch (err) {
    console.log(err);
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};
// articleInCommunity(2);

//回覆列表
const replylist = async () => {
  try {
    await sql.connect(config);
    let str = `
    select r.*, m.fName as ReplyMemberName, m.fPhotoPath as ReplyMemberImg
from Community.tReply as r
left join Member.tMember as m
on r.fReplyMemberId=m.fId
    `;
    const result = await sql.query(str);
    // console.dir(result);
    // console.dir(result.recordset);
    // console.dir(result.rowsAffected[0]);
    return {
      result: 1,
      msg: "請求成功",
      data: result.recordset,
    };
  } catch (err) {
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};
// replylist();

//社團頁面：新增文章
const addarticle = async (
  fPostMemberId,
  fCommunityId,
  fPostTime,
  fContent,
  fImgPaths
) => {
  try {
    await sql.connect(config);
    if (fContent) {
      let str = `
   insert into Community.tPost( fMemberId, fCommunityId, fPostTime, fContent, fImgPaths )
   values (${fPostMemberId}, ${fCommunityId} ,'${fPostTime}', '${fContent}', '${fImgPaths}')
   `;
      const result = await sql.query(str);
      console.dir(result);

      if (result.recordset[0])
        return {
          result: 1,
          msg: "請求成功",
          data: result.recordset,
        };
    } else {
      return { result: 0, msg: "錯誤:請輸入內容", data: result.recordset };
    }
  } catch (err) {
    return { result: 0, msg: "SQL錯誤", data: result };
  }
};
// addarticle(17, 1, "2020/09/02 20:11", "SQL語法測試儀下唷", "imgpaht");

//使用者資訊for新增文章的使用者頭像
const ShowUserInfo = async (fMemberId) => {
  try {
    await sql.connect(config);
    let str = `
      select *
      from Member.tMember
      where fId =${fMemberId}
   `;
    const result = await sql.query(str);
    console.log(result);
    return { result: 1, msg: "請求成功", data: result.recordset[0] };
  } catch (err) {
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};
// ShowUserInfo(4);

// const editarticle = async(fId)=>{
//   try{
//     await sql.connect(config);
//     let str = `UPDATE Community.tPost
//     SET fContent = '${fContent}', fImgPaths = '${fImgPath}'
//     WHERE fId = ${fId}`
//     const result = await sql.query(str);
//     return{
//       result: 1,
//       msg: "請求成功",
//      }
//   }
//   catch(err){
//     return { result: 0, msg: "SQL錯誤"};
//   }
// }

//TODO ING
const the4hottiest = async () => {};

const searcharticle = async (x) => {
  try {
    await sql.connect(config);
    let str = `WITH PostMember AS(select p.fMemberId, p.fCommunityId, p.fPostTime, p.fImgPaths as PostImg, p.fId as PostId, p.fContent as PostContent, m.fName as PostMemberName, m.fId as MemberId, m.fPhotoPath as MemberImgPath
      from Community.tPost as p
      left join Member.tMember as m
      on p.fMemberId=m.fId)
      
      , PostCommunity AS(select p.fId as PostId, c.fId as CommunityId, c.fName as CommunityName, c.fImgPath as CommunityImgPath
      from Community.tPost as p
      left join Community.tCommunity as c
      on p.fCommunityId=c.fId)
      
      , PostReplyCount AS(select r.fPostId , count(r.fId) as HowMuchReply
      from Community.tReply as r   
      group by r.fPostId)
      
      , PostLikeCount AS(select l.fPostId, count(l.fId) as HowMuchLike
      from Community.tLike as l  
      group by l.fPostId)
      
      , PostDetail AS(select pm.*, pc.CommunityId, pc.CommunityName, pc.CommunityImgPath
      from PostMember as pm
      left join PostCommunity as pc
      on pm.PostId=pc.PostId)
      
      , ReplyAndLike AS(select l.fPostId as replypostId, l.HowMuchLike, r.HowMuchReply
      from PostLikeCount as l
      left join PostReplyCount as r
      on l.fPostId = r.fPostId)
      
      select *
      from PostDetail as c
      where c.CommunityName like '%${x}%'
      or c.PostContent like '%${x}%'`;

    const result = await sql.query(str);
    return {
      result: 1,
      msg: "請求成功",
      data: result.recordset,
    };
  } catch (err) {
    return { result: 0, msg: "SQL錯誤", data: err };
  }
};

// const deletearticle = async(fId) => {
//   try{

//   }
// }

// const addlike

// const removelike

// const addreply

// const removereply

module.exports = {
  articlelist,
  articleInCommunity,
  replylist,
  searcharticle,
  addarticle,
  ShowUserInfo,
};
