const sql = require("mssql");

const config = {
  user: "sa",
  password: "everybodycanuse",
  server: "localhost", // You can use 'localhost\\instance' to connect to named instance
  database: "SeaTurtleOnTheWay",

  options: {
    enableArithAbort: true,
    encrypt: true
  },
  port: 1433,
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
      from PostDetail as pd
      left join ReplyAndLike as ral
      on pd.PostId = ral.replypostId`;
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

const replylist = async () => {
  try {
    // console.dir("123");
    await sql.connect(config);
    let str = `
    select r.*, m.fName as ReplyMemberName
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

// const addarticle = async(fPostMemberId, fCommunityId, fContent, fImgPath)=>{
//   try{
//    await sql.connect(config);
//    if (fContent){
//    let str = `
//    insert into Community.tPost( fMemberId, fCommunityId, fPostTime, fContent, fImgPaths )
//    values (${fPostMemberId}, ${fCommunityId} ,CURRENT_TIMESTAMP, '${fContent}', '${fImgPath}')
//    `
//    const resultArticle = await sql.query(str);
//    if(resultArticle.recordset[0])
//    return{
//     result: 1,
//     msg: "請求成功",
//    }}
//    else{
//     return { result: 0, msg: "錯誤:請輸入內容" }
//    }
//   }
//   catch (err) {
//     return { result: 0, msg: "SQL錯誤"};
//   }
// }

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
      from CombineList as c
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
articlelist();
// const addlike

// const removelike

// const addreply

// const removereply

module.exports = { articlelist, replylist, searcharticle };
