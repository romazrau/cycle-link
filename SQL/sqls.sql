-- 常用指令集
---------------------------------------
USE SeaTurtleOnTheWay;
GO
	

---    刪除資料表用
--DELETE FROM  Member.tMember;
--DELETE FROM  Activity.tActivity;
--DELETE FROM  Community.tCommunity;
--DELETE FROM  Community.tMemberList;
--DELETE FROM  Community.tPost;
--DELETE FROM  Activity.tActivity;
--DELETE FROM Activity.tActivityLabel


-- 搜尋範例  --------------------------------------------------
--整個資料庫
select * from Member.tMember;  


-- 選定特定欄位
select fid, fName, fMail from Member.tMember;


-- 設定排序與選取範圍
select fid, fName, fMail 
from Member.tMember
order by fId desc                       --用fId，倒敘排列
OFFSET 5 ROWS FETCH NEXT 2 ROWS ONLY ;  --跳過 5 行，回傳 2 行


-- 增加搜尋條件，與設定別名
 select M.fId, M.fName
 from Member.tMember as M                               --as 進行命名
 where fAccount = 'guest' AND fPassword = 'badiii7777'; --條件


-- 資料表合併，Left join，帳號資料與權限結合
select M.fId, M.fAccount, 
       T.fAccountType as 'account type',          --Join來的欄位要重新命名
	   T.fAccountAuthority as 'account authority' --Join來的欄位要重新命名
from Member.tMember as M             --主資料表設別名
LEFT join Member.tAccountType as T   --Join來的表要設別名
on M.fAccountTypeId = T.fId;         --Join參考，tMember.fAccountTypeId = tAccountType.fId


-- 計算數目，會員參加了幾個社團
select list.fMemberId, count(list.fCommunityId) as '參加了幾個社團'  --count計算
from Community.tMemberList as list   
group by list.fMemberId;           --根據誰做計算


-- 計算數目，增加條件，注意計算的條件用having，不同於搜尋的where
select list.fMemberId, count(list.fCommunityId) as '參加了幾個社團'  --count計算
from Community.tMemberList as list   
group by list.fMemberId              --根據誰做計算
having count(list.fCommunityId) > 2; --條件大於3的


-- 大魔王，多資料表合併輸出
WITH member AS (  
   -- 資料表合併，Left join，帳號資料與權限結合
   select M.fId, M.fAccount, 
       T.fAccountType as 'account type',          --Join來的欄位要重新命名
	   T.fAccountAuthority as 'account authority' --Join來的欄位要重新命名
   from Member.tMember as M             --主資料表設別名
   LEFT join Member.tAccountType as T   --Join來的表要設別名
   on M.fAccountTypeId = T.fId        --Join參考，tMember.fAccountTypeId = tAccountType.fId
),  countMun as (  
   -- 計算數目，會員參加了幾個社團
   select list.fMemberId, count(list.fCommunityId) as '參加了幾個社團'  --count計算
   from Community.tMemberList as list   
   group by list.fMemberId          --根據誰做計算
)  -- 帳號資料與權限結 + 會員參加了幾個社團
   -- 根據前兩個with的資料表做合併
  select mm.*, cm.*   
  from member as mm
  left join countMun as cm
  on mm.fId = cm.fMemberId;   --根據 member id 合併 


  -- 大魔王，繼續延伸
  WITH member AS (  
   -- 資料表合併，Left join，帳號資料與權限結合
   select M.fId, M.fAccount, 
       T.fAccountType as 'account type',          --Join來的欄位要重新命名
	   T.fAccountAuthority as 'account authority'   --Join來的欄位要重新命名
   from Member.tMember as M                       --主資料表設別名
   left join Member.tAccountType as T     --Join來的表要設別名
   on M.fAccountTypeId = T.fId            --Join參考，tMember.fAccountTypeId = tAccountType.fId
), countMun AS (  
   -- 計算數目，會員參加了幾個社團
   select list.fMemberId, count(list.fCommunityId) as '參加了幾個社團'  --count計算
   from Community.tMemberList as list   
   group by list.fMemberId             --根據誰做計算
), memberWithComNum AS (
   -- 帳號資料與權限結 + 會員參加了幾個社團
   -- 根據前兩個with的資料表做合併
  select mm.*, cm.*   
  from member as mm
  left join countMun as cm
  on mm.fId = cm.fMemberId  --根據 member id 合併
) 
  -- 查看會員類別有多少成員、及參加了多少社團
  select  [account type], 
          count(fAccount) as '有幾位成員',
		  sum([參加了幾個社團]) as '總共參加了多少社團'
  from memberWithComNum
  group by [account type]





  -- 新增 範例 -----------------
  INSERT INTO Member.tAccountType( fId, fAccountType, fAccountAuthority)  
               VALUES ( 20, '尊爵不凡中二海龜', 2), 
			          ( 21, '海龜吃水母', 2) 


  -- 修改範例 ------------
  UPDATE Member.tAccountType 
  SET fAccountAuthority = 1,  fAccountType='中二海龜'  --更改欄位
  WHERE fId = 20                                       --條件




  -- 刪除語法 -----------
  DELETE FROM Member.tAccountType  
  WHERE fId =  21










 
  --  Member 相關  ---------------------------------------
  --login
  select M.fId, M.fName , T.fAccountType as 'account type' , T.fAccountAuthority as 'account authority'
  from Member.tMember as M
  LEFT join Member.tAccountType as T
  on M.fAccountTypeId = T.fId
  where fAccount = 'guest' AND fPassword = 'badiii7777';



  --updata
UPDATE Member.tMember 
SET fName = '員員員',
	fBirthdate = '2000/02/20',
	fMail ='cycle2link@gmail.com',
	fAddress = '復興南路一段390號2樓',
	fCity = '台北市',
	fCeilphoneNumber = 0989859112,
	fPhotoPath = null,
	fIntroduction = '沙漠中一無所有，一無所有非人所求也。'
WHERE fId = 20                                   


-- list
select M.fId,M.fAccount, M.fName , M.fCity, M.fCoins , T.fAccountType as 'fAccountType' , T.fAccountAuthority as 'fAccountAuthority' , M.fIntroduction, M.fPhotoPath, M.fLastTime
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId;



-- by id
with actConut as (
	select  fMemberId, count(fActivityId) as 'fActiviteCount'
	from Activity.tJoinList
	where fMemberId = 11 and fJoinTypeId != 0
    group by fMemberId
)
, actInterestConut as (
	select  fMemberId, count(fActivityId) as 'fActiviteInterestCount'
	from Activity.tJoinList
	where fMemberId = 11 and fJoinTypeId = 0
    group by fMemberId
 )
 , cumConut as (
	select  fMemberId, count(fCommunityId) as 'fCommunityCount'
	from Community.tMemberList
	where fMemberId = 11 
    group by fMemberId
 )
select M.fId, M.fName, M.fCity, M.fCoins, M.fBirthdate, M.fCeilphoneNumber, C.fActiviteCount, i.fActiviteInterestCount, cum.fCommunityCount, T.fAccountType as 'fAccountType' , T.fAccountAuthority as 'fAccountAuthority' , M.fIntroduction, M.fPhotoPath, M.fLastTime
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId
		LEFT join actConut as C
		on C.fMemberId = M.fId
		LEFT join actInterestConut as i
		on i.fMemberId = M.fId
		LEFT join cumConut as cum
		on cum.fMemberId = M.fId
		where M.fId = 11




-- by Account or name
select M.fId ,M.fAccount, M.fName, M.fCity, M.fCoins , T.fAccountType as 'fAccountType' , T.fAccountAuthority as 'fAccountAuthority', M.fPhotoPath, M.fLastTime
        from Member.tMember as M
        LEFT join Member.tAccountType as T
        on M.fAccountTypeId = T.fId
        where M.fAccount like '%ro%' or M.fName like '%ro%';




-- chat ------------------------------------
-- room
select C.* , M.fName as 'fMember1Name', M2.fName as 'fMember2Name'
from Chat.tChatroom as C
left join Member.tMember as M
on C.fMemberId1 = M.fId
left join Member.tMember as M2
on C.fMemberId2 = M2.fId
 


 -- room by id
select C.* , M.fName as 'fMember1Name', M2.fName as 'fMember2Name' , d.fIsReaded, IIF( d.fMemberId = 3 , 1, 0 ) as fIsMeLastChat
from Chat.tChatroom as C
left join Member.tMember as M
on C.fMemberId1 = M.fId
left join Member.tMember as M2
on C.fMemberId2 = M2.fId
left join  Chat.tChatData as d
on C.fLastDataId = d.fId
where fMemberId1 = 3 OR fMemberId2 = 3
order by fLastDataId desc, fId desc;

select C.* , M.fName as 'fMember1Name', M2.fName as 'fMember2Name'
from Chat.tChatroom as C
left join Member.tMember as M
on C.fMemberId1 = M.fId
left join Member.tMember as M2
on C.fMemberId2 = M2.fId
where ( fMemberId1 = 6 and fMemberId2 = 3 ) or ( fMemberId1 = 3 and fMemberId2 = 6);


INSERT INTO Chat.tChatroom
	( fMemberId1, fMemberId2 )
VALUES ( 3, 7);

--updata last data
with roomData as (
select max(fId) as fLastId
from Chat.tChatData
where fChatRoomId = 1
)
UPDATE Chat.tChatroom 
SET fLastDataId = roomData.fLastId
from roomData
WHERE fId = 1 






-- room messages
select d.* , m.fName
from Chat.tChatData as d
left join Member.tMember as m
on m.fId = d.fMemberId
where fChatRoomId = 2


INSERT INTO Chat.tChatData
	( fChatRoomId, fTime, fMemberId, fContent )
VALUES (2, '2020/09/13 下午1:10', 3, '哭哭饅頭')


with roomData as (
select max(fId) as fLastId
from Chat.tChatData
where fChatRoomId = 2
)
UPDATE Chat.tChatData
SET fIsReaded = 1
from roomData
WHERE fId = roomData.fLastId and fMemberId != 3










SELECT l.* , m.fName, m.fPhotoPath
  FROM Community.tMemberList as l
  left join Member.tMember as m
  on l.fMemberId = m.fId 
  where l.fAccessRightId = 1 and l.fCommunityId = 5;





  -- active by community
  select fId, fActName, fActivityDate, fActivityEndDate
  from Activity.tActivity
  where fCommunityId = 2

