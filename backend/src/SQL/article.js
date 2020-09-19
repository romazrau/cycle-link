const {
  SSL_OP_SSLEAY_080_CLIENT_DH_BUG
} = require("constants");
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
    return {
      result: 1,
      msg: "請求成功",
      data: result.recordset
    };
  } catch (err) {
    console.log(err);
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
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
    return {
      result: 1,
      msg: "請求成功",
      data: result.recordset
    };
  } catch (err) {
    console.log(err);
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
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
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
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
      // console.dir(result);

      if (result.recordset[0])
        return {
          result: 1,
          msg: "請求成功",
          data: result.recordset,
        };
    } else {
      return {
        result: 0,
        msg: "錯誤:請輸入內容",
        data: result.recordset
      };
    }
  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: result
    };
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
    // console.log(result);
    return {
      result: 1,
      msg: "請求成功",
      data: result.recordset[0]
    };
  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
  }
};
// ShowUserInfo(4);

function getCommunityPostbyIdStr(x) {
  return `
  WITH PostMember AS(select p.fMemberId, p.fCommunityId, p.fPostTime, p.fImgPaths as PostImg, p.fId as PostId, p.fContent as PostContent, m.fName as PostMemberName, m.fId as MemberId, m.fPhotoPath as MemberImgPath
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
    where CommunityId = ${multipleornot(x)}
    order by Convert(datetime, fPostTime) DESC`
}

function multipleornot(x) {
  if (typeof (x) == 'string') {
    return x;
  } else {
    let result = "";
    x.map((e, index) => {
      result += e + " or CommunityId = ";
    })
    let result2 = result.substring(0, (result.length - 18));
    return result2;
  }
}

//* ---------------------------------------------------------- 熱門社團搜尋
const the4hottiest = async (x) => {
  try {
    await sql.connect(config);
    let gethottiestStr = `with CommunityStatus as (select c.fId as CommunityId, c.fName as CommunityName, c.fImgPath as CommunityImg, s.fName as CommunityAccessType
      from Community.tCommunity as c
      left join Community.tStatus as s
      on s.fId = c.fStatusId)
      , CommunityMemberCount as (select c.fId, count(m.fMemberId) as MemberCount
      from Community.tCommunity as c
      left join Community.tMemberList as m
      on c.fId = m.fCommunityId
      group by c.fId)
      , CommunityDetail as (select *
      from CommunityStatus as cs
      left join CommunityMemberCount as ms
      on cs.CommunityId = ms.fId)
      , FilterbyPost as(
      select TOP(4) p.fCommunityId, count(p.fId) as PostCount
      from Community.tPost as p
      where p.fPostTime like '%/${x}/%'
      group by p.fCommunityId
      order by PostCount DESC)
      select *
      from FilterbyPost as fp
      left join CommunityDetail as cd
      on fp.fCommunityId = cd.CommunityId
    `;
    const gethottiest_Result = await sql.query(gethottiestStr);
    // let getpostbyidStr = ``
    // console.log(gethottiest_Result.recordset[0].CommunityId);

    return {
      result: 1,
      msg: "請求成功",
      data: gethottiest_Result.recordset,
    };
  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
  }
};

//* ---------------------------------------------------------- 探索社團
const explore4community = async () => {
  try {
    await sql.connect(config);
    let getexploreStr = `with CommunityStatus as (select c.fId as CommunityId, c.fName as CommunityName, c.fImgPath as CommunityImg, s.fName as CommunityAccessType
      from Community.tCommunity as c
      left join Community.tStatus as s
      on s.fId = c.fStatusId)
      , CommunityMemberCount as (select c.fId, count(m.fMemberId) as MemberCount
      from Community.tCommunity as c
      left join Community.tMemberList as m
      on c.fId = m.fCommunityId
      group by c.fId)
      select top(4) *
      from CommunityStatus as cs
      left join CommunityMemberCount as ms
      on cs.CommunityId = ms.fId
      order by NEWID()`;
    const getexplore_Result = await sql.query(getexploreStr);
    // console.log(result.recordset[0].CommunityId);
    // console.log(getexplore_Result.recordset[0].CommunityId);
    // console.log(getexplore_Result.recordset[1].CommunityId);
    // console.log(getexplore_Result.recordset[2].CommunityId);
    // console.log(getexplore_Result.recordset[3].CommunityId);
    // console.log(getexplore_Result.recordset.length);



    // let communityidArr = [];
    // for (let i = 0; i<getexplore_Result.recordset.length; i++){
    //   communityidArr.push(getexplore_Result.recordset[i].CommunityId)
    // }


    // const getexplorepost_Result = await sql.query(getCommunityPostbyIdStr(communityidArr));
    // console.log(getexplorepost_Result.recordset);


    return {
      result: 1,
      msg: "請求成功",
      data: getexplore_Result.recordset,
    };
  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
  }
};

//* ---------------------------------------------------------- 社團首頁：文字搜尋社團，顯示該社團
const txtSearchCommunityCard = async (x) => {
  try {
    await sql.connect(config);
    let str = `With CommunityStatus as (select c.fId as CommunityId, c.fName as CommunityName, c.fImgPath as CommunityImg, s.fName as CommunityAccessType
      from Community.tCommunity as c
      left join Community.tStatus as s
      on s.fId = c.fStatusId)
      , CommunityMemberCount as (select c.fId, count(m.fMemberId) as MemberCount
      from Community.tCommunity as c
      left join Community.tMemberList as m
      on c.fId = m.fCommunityId
      group by c.fId)
      select *
      from CommunityStatus as cs
      left join CommunityMemberCount as ms
      on cs.CommunityId = ms.fId
      where cs.CommunityName like '%${x}%`;
    const result = await sql.query(str);
    return {
      result: 1,
      msg: "請求成功",
      data: result.recordset,
    };
  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
  }
};

//社團首頁：文字搜尋社團，顯示該社團文章
const txtSearchCommunityArticle = async (x) => {
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
      where c.CommunityName like '%${x}%'`;

    const result = await sql.query(str);
    return {
      result: 1,
      msg: "請求成功",
      data: result.recordset,
    };
  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
  }
};

//編輯文章：1. 顯示
const displayArticleForEdit = async (x) => {
  try {
    await sql.connect(config);
    let str = `WITH EditPostMember AS(select p.fMemberId, p.fCommunityId, p.fPostTime, p.fImgPaths as PostImg, p.fId as PostId, p.fContent as PostContent, m.fName as PostMemberName, m.fId as MemberId, m.fPhotoPath as MemberImgPath
      from Community.tPost as p
      left join Member.tMember as m
      on p.fMemberId=m.fId)
      select *
      from EditPostMember
      where PostId=${x}`;

    const result = await sql.query(str);
    return {
      result: 1,
      msg: "請求成功",
      data: result.recordset,
    };
  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
  }
};

//編輯文章：2. 更新資料
const updateEdited = async (fContent, fImgPaths, fPostTime, fPostId) => {
  try {
    await sql.connect(config);
    let str = `UPDATE Community.tPost
    SET fContent='${fContent}',fImgPaths='${fImgPaths}', fPostTime='${fPostTime}'
    WHERE fId = ${fPostId}`;

    console.log(str);
    const result = await sql.query(str);
    return {
      result: 1,
      msg: "請求成功",
      data: result.recordset,
    };
  } catch (err) {
    return {
      result: 0,
      msg: "SQL錯誤",
      data: err
    };
  }
}

module.exports = {
  articlelist,
  articleInCommunity,
  replylist,
  addarticle,
  ShowUserInfo,
  the4hottiest,
  explore4community,
  txtSearchCommunityCard,
  txtSearchCommunityArticle,
  displayArticleForEdit,
  updateEdited
};