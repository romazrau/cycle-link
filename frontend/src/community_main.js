// import { serverURL } from "./api.js";

function ClsCommunityMain() {

  //*----------------------------------------奇形怪狀的方法們----------------------------------------*//
  //判斷是否有圖片，沒有就不匯入div
  const ImgIsNullOrNot = (x) => {
    if (x === null) {
      return ``;
    } else {
      var y = x.includes(",,");
      if (y) {
        let imgArr = x.split(",,");
        // console.log(imgArr);
        var a = multiImgArr(imgArr);
        return `<a class="Post_preIcon" href=""><i class="fas fa-chevron-left fa-2x" style="color:white"></i></a>${a}<a class="Post_nextIcon"href=""><i class="fas fa-chevron-right fa-2x" style="color:white"></i></a>`;
      } else {
        return `
        <div class="CM_timeline_body_img">
      <img class="CM_timeline_body_img_img" src='http://localhost:3050/${x}' />
      </div>`;
      }
    }
  };

  //如果是多張圖片，則以陣列匯入div
  const multiImgArr = (k) => {
    let result = "";
    k.map((e, index) => {
      result += `<div class="CM_timeline_body_img">
    <img class="CM_timeline_body_img_img" src='http://localhost:3050/${e}' />
    </div>`;
    });
    return result;
  };

  //多張照片：輪播式呈現function
  function MultiImgFunction() {
    let CM_timeline_body = document.querySelectorAll(".CM_timeline_body");
    //處理超過2張照片
    for (let i = 0; i < CM_timeline_body.length; i++) {
      if (CM_timeline_body[i].getElementsByTagName("img").length > 1) {
        let PostImgs = CM_timeline_body[i].querySelectorAll(
          ".CM_timeline_body_img"
        );
        for (let j = 0; j < PostImgs.length; j++) {
          if (j > 0) PostImgs[j].style.display = "none";
        }
      }
    }
    //下一張
    var allNextIcon = document.querySelectorAll(".Post_nextIcon");
    for (let i = 0; i < allNextIcon.length; i++) {
      allNextIcon[i].addEventListener("click", function (e) {
        e.preventDefault();
        //this取a物件>再取父層>父層下所有div
        // this.parentNode.getElementsByTagName('div')
        let thisImgBox = this.parentNode.getElementsByTagName("div");
        var position = 0;
        for (let p = 0; p < thisImgBox.length; p++) {
          let display = thisImgBox[p].style.display;
          if (display != "none") {
            position = p;
          }
        }
        position++;

        if (position > thisImgBox.length - 1) {
          position = 0;
        }

        for (let j = 0; j < thisImgBox.length; j++) {
          // console.log("j:",j);
          if (position == j) {
            thisImgBox[j].style.display = "block";
          } else {
            thisImgBox[j].style.display = "none";
          }
        }
      });
    }
    //上一張
    var allPreIcon = document.querySelectorAll(".Post_preIcon");
    for (let i = 0; i < allPreIcon.length; i++) {
      allPreIcon[i].addEventListener("click", function (e) {
        e.preventDefault();
        //this取a物件>再取父層>父層下所有div
        // this.parentNode.getElementsByTagName('div')
        let thisImgBox = this.parentNode.getElementsByTagName("div");
        //判斷postion位置
        var position = 0;
        for (let p = 0; p < thisImgBox.length; p++) {
          let display = thisImgBox[p].style.display;
          if (display != "none") {
            position = p;
          }
        }
        position--;
        if (position < 0) {
          position = thisImgBox.length - 1;
        }
        for (let j = 0; j < thisImgBox.length; j++) {
          if (position == j) {
            thisImgBox[j].style.display = "block";
          } else {
            thisImgBox[j].style.display = "none";
          }
        }
      });
    }
  }

  //調整時間格式：補0
  function timeFormatAdjust(x) {
    if (x < 10) {
      x = "0" + x;
    }
    return x;
  }

  //留言區：顯示我要留言區(不需要撈資料庫)
  function showReplyInput(x) {
    document.getElementById(
      "bindPostReplybyfId" + x
    ).innerHTML += htmlCommunityMainReplyInput(x);
  }

  //留言：Icon點擊觸動function寫入留言內容
  function addClickEventToReply(x) {
      x.map((e,index)=>{
        let TheReplyIcon = document.getElementById("replyIconbyfId" + e)
        TheReplyIcon.addEventListener("click", function () {
          getCommunityReply(e);
        });
      })
  }
  
  //喜歡文章：愛心function，字串樣板輸入完畢後執行
  function addClickEventToLike(x) {
    x.map((e,index)=>{
      let TheLikeIcon = document.getElementById("likeIconbyfId" + e);
      TheLikeIcon.addEventListener("click", function () {
        //已點過愛心包含'far','fas' class
        if (
          TheLikeIcon.classList.contains("far") &&
          TheLikeIcon.classList.contains("fas")
        ) {
          TheLikeIcon.classList.remove("fas");
          TheLikeIcon.classList.add("far");
          removeLikeToSQL(e);
          // let id_arr = this.id.split("fId");
          // removeLikeToSQL(id_arr[1]);
          likesMinusCount(this);
        } else if (TheLikeIcon.classList.contains("far")) {
          TheLikeIcon.classList.remove("far");
          TheLikeIcon.classList.add("fas");
          //取ID增點讚
          // let id_arr = this.id.split("fId");
          // addLikeToSQL(id_arr[1]);
          addLikeToSQL(e);
          likesPlusCount(this);
        } else {
          TheLikeIcon.classList.remove("fas");
          TheLikeIcon.classList.add("far");
          // let id_arr = this.id.split("fId");
          // removeLikeToSQL(id_arr[1]);
          removeLikeToSQL(e);
          likesMinusCount(this);
          // console.log("愛心又被點了");
        }
      });
    })
  };

  //喜歡增加：顯示數量增加
  function likesPlusCount(e) {
    let target = e.parentNode.getElementsByTagName("span")[0];
    if (target.innerHTML == "") {
      target.innerHTML = 1;
    } else {
      target.innerHTML = parseInt(target.innerHTML) + 1;
    }
  }

  //喜歡減少：顯示數量減少
  function likesMinusCount(e) {
    let target = e.parentNode.getElementsByTagName("span")[0];
    if (target.innerHTML == "1") {
      target.innerHTML = "";
    } else {
      target.innerHTML = parseInt(target.innerHTML) - 1;
    }
  }

  //*----------------------------------------文字樣板----------------------------------------*//

  //社團首頁：文章文字樣板(左邊)
  const htmlCommunityMainPostLeft = (x) => {
    return `
      <li>
      <div class="community_main_groupIcon">
        <a href="#community/detail/${x.CommunityId}" title="${
      x.CommunityName
    }" class="CM_groupIcon_wrap">
          <img class="CM_groupIcon_img" src="http://localhost:3050/${
            x.CommunityImgPath
          }" />
        </a>
      </div>
      <div class="community_main_timeline_panel">
        <div class="CM_timeline_heading">
        <div class="CM_timeline_heading_img_circle_border">
          <div class="CM_timeline_heading_img_container" onclick="location.hash='#personal-page/${
            x.MemberId
          }'">
            <img class="CM_timeline_heading_img" src="http://localhost:3050/${
              x.MemberImgPath
            }" onclick="location.hash='#personal-page/${x.MemberId}'"/>
          </div> </div>
          <div class="CM_timeline_heading_userinfo">
             <a href="#personal-page/${x.MemberId}"><p>${
      x.PostMemberName
    }</p></a>
             <a href="#community/detail/${x.CommunityId}">
             <span class="communityName_span">${x.CommunityName}</span>
             </a>
             <a href="#community/post/${x.PostId}"><span>${
      x.fPostTime
    }</span></a>
          </div>
          <i class="fas fa-ellipsis-v editIconforArticle"></i>
        </div>
        <div class="CM_timeline_body">
          <p>${x.PostContent}</p>
          
        ${ImgIsNullOrNot(x.PostImg)}
          
        </div>
        <div class="CM_timeline_footer">
          <i class="far fa-heart changebyclick" id="likeIconbyfId${
            x.PostId
          }"></i><span>${x.HowMuchLike || ""}</span>
          <i class="far fa-comments" id="replyIconbyfId${x.PostId}"></i><span>${
      x.HowMuchReply || ""
    }</span>
          </div>
          <div class="replyContainer" id="bindPostReplybyfId${x.PostId}"></div>
        </div>
      </li>`;
  };
  // {x.HowMuchLike === null ? "" : HowMuchLike}不知為何很容易報錯

  //社團首頁：文章文字樣板(右邊)
  const htmlCommunityMainPostRight = (x) => {
    return `
      <li class='community_main_timeline_inverted'>
      <div class="community_main_groupIcon">
        <a href="#community/detail/${x.CommunityId}" title="${
      x.CommunityName
    }" class="CM_groupIcon_wrap">
          <img class="CM_groupIcon_img" src="http://localhost:3050/${
            x.CommunityImgPath
          }" />
        </a>
      </div>
      <div class="community_main_timeline_panel">
        <div class="CM_timeline_heading">
        <div class="CM_timeline_heading_img_circle_border">
          <div class="CM_timeline_heading_img_container" onclick="location.hash='#personal-page/${
            x.MemberId
          }'">
            <img class="CM_timeline_heading_img" src="http://localhost:3050/${
              x.MemberImgPath
            }" onclick="location.hash='#personal-page/${x.MemberId}'"/>
          </div> </div>
          <div class="CM_timeline_heading_userinfo">
             <a href="#personal-page/${x.MemberId}"><p>${
      x.PostMemberName
    }</p></a>
             <a href="#community/detail/${x.CommunityId}">
             <span class="communityName_span">${x.CommunityName}</span>
             </a>
             <a href="#community/post/${x.PostId}"><span>${
      x.fPostTime
    }</span></a>
          </div>
          <i class="fas fa-ellipsis-v editIconforArticle"></i>
        </div>
        <div class="CM_timeline_body">
          <p>${x.PostContent}</p>
${ImgIsNullOrNot(x.PostImg)}
        </div>
        <div class="CM_timeline_footer">
          <i class="far fa-heart changebyclick" id="likeIconbyfId${
            x.PostId
          }"></i>
          <span>${x.HowMuchLike || ""}</span>
          <i class="far fa-comments" id="replyIconbyfId${x.PostId}"></i>
          <span>${x.HowMuchReply || ""}</span>
          </div>
          <div class="replyContainer" id="bindPostReplybyfId${x.PostId}"></div>
        </div>
    </li>`;
  };

  // 社團首頁：留言文字樣板
  const htmlCommunityMainReply = (x) => {
    return `
    <div class="CM_reply_item">
    <div class="CM_reply_item_header">
      <div class="CM_reply_item_header_img_container">
        <div class="CM_reply_item_header_img_circle_border">
          <div class="CM_reply_item_header_img">
            <img
              src="http://localhost:3050/${x.ReplyMemberImg}"
              class="CM_reply_item_header_img_img"
            />
          </div>
        </div>
      </div>
      <div class="CM_reply_item_header_content">
        <div class="CM_reply_item_header_content_info">
          <span>${x.ReplyMemberName}</span>
          <span>${x.fReplyTime}</span>
          <i class="fas fa-stream editIconforReply"></i>
        </div>
        <div class="CM_reply_item_header_content_text">
          <span
            >${x.fContent}</span
          >
        </div>
      </div>
    </div>
    <div class="CM_reply_item_content" id=""></div>
  </div>`;
  };

  //社團首頁：我要留言文字樣板
  const htmlCommunityMainReplyInput = (x) => {
    return `<div class="CM_reply_input_container">
    <input type="text" id="ReplyText${x}"/>
    <div class="ReplySendClass" id="ReplySend${x}"><i class="fas fa-paper-plane"></i></div>
  </div>`;
  };

  //社團首頁：社團卡片文字樣板for搜尋結果
  const htmlCommunityCard = (x) => {
    return `<div class="CM_recommend_item" onclick="location.hash='#community/detail/${x.CommunityId}'">
    <div class="CM_recommend_item_img">
        <img src="http://localhost:3050/${x.CommunityImg}" class="CM_recommend_item_img_img">
    </div>
    <div class="CM_recommend_item_info">
        <p>${x.CommunityName}</p>
        <i class="fas fa-lock"><span> ${x.CommunityAccessType}社團</span></i>
        <i class="fas fa-user-friends"><span> ${x.MemberCount}</span></i>
    </div>
</div>`;
  };

  //*------------------------------Index已經存在的東西，增加他們ㄉ點擊事件------------------------------*//
  //熱門社團：點擊觸發
  document
    .querySelector(".CM_searchbar_hottiest_item")
    .addEventListener("click", function () {
      let nowtime = new Date();
      let nowMonth = timeFormatAdjust(nowtime.getMonth() + 1);
      getRecommendCommunity(nowMonth);
    });

  //探索社團：點擊觸發
  document
    .querySelector(".CM_searchbar_explore_item")
    .addEventListener("click", function () {
      getExploreCommunity();
    });

  //社團首頁搜尋Icon：加入點擊事件，跑出搜尋結果
  document
    .getElementById("CM_search_click")
    .addEventListener("click", function () {
      let input_text = document.querySelector(".CM_banner_searchbar_text")
        .value;
      txtsearchCommunityCard(input_text);
      txtsearchCommunityArticle(input_text);
    });

  //*----------------------------------資料陣列匯入文字樣板function----------------------------------*//
  //社團首頁：社團卡片字串匯入點
  const CM_recommend = document.querySelector(".CM_recommend_container");

  //社團卡片字串匯入function
  const display_recommendCommunity = (o) => {
    CM_recommend.classList.remove("CM_recommend_container_disappear");
    CM_recommend.innerHTML = "";
    o.map((e, index) => {
      CM_recommend.innerHTML += htmlCommunityCard(e);
    });
  };

  //社團首頁：文章字串匯入點
  const CMpost = document.querySelector(".community_main_ul_timeline");

  //社團首頁：文章字串匯入function
  const display_postDetail = (o) => {
    CMpost.innerHTML = "";
    o.map((e, index) => {
      if (index % 2 == 0) {
        CMpost.innerHTML += htmlCommunityMainPostLeft(e);
      } else {
        CMpost.innerHTML += htmlCommunityMainPostRight(e);
      }
    });
  };

  //社團首頁：留言字串匯入function
  const display_replyDetail = (o, x) => {
    document.getElementById("bindPostReplybyfId" + x).innerHTML = "";
    o.map((e, index) => {
      if (e.fPostId == x) {
        document.getElementById(
          "bindPostReplybyfId" + x
        ).innerHTML += htmlCommunityMainReply(e);
      }
    });
    // 匯入我要留言區
    showReplyInput(x);
    // 此時增加留言發出的點擊事件
    document.getElementById("ReplySend" + x).addEventListener("click", () => {
      // 抓取Text內容
      let content = document.getElementById("ReplyText" + x).value;
      addReplyToSQL(x, content);
    });
  };

  //*----------------------------------------路由撈資料區----------------------------------------*//
  //社團首頁文章：路由撈資料 & 執行display
  const getCommunityPost = async () => {
    try {
      // console.log(serverURL.articlepost);
      let response = await fetch(serverURL.articlepost);
      let result = await response.json();
      await display_postDetail(result.data);

      //*-----每個路由撈文章ㄉ地方都值得來一套-----*//
      let postidArr=[];
      for(let i = 0; i<result.data.length; i++){
        postidArr.push(result.data[i].PostId);
      }
      addClickEventToReply(postidArr);
      addClickEventToLike(postidArr);
      MultiImgFunction();
      //尋找有按過讚的文章使其愛心變色
      MemberLikePost();
      //*--------------------------------------*//

    } catch (err) {
      console.log(err);
    }
  };
  getCommunityPost();

  //熱門社團：路由撈資料 & 執行display
  const getRecommendCommunity = async (x) => {
    try {
      // console.log(serverURL.hottiestcommunity);
      let response = await fetch(serverURL.hottiestcommunity + x, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
      display_recommendCommunity(result.data.hottiestCard);
      display_postDetail(result.data.hottiestPost);

      let postidArr=[];
      for(let i = 0; i<result.data.hottiestPost.length; i++){
        postidArr.push(result.data.hottiestPost[i].PostId);
      }
      addClickEventToReply(postidArr);
      addClickEventToLike(postidArr);
      MultiImgFunction();
      MemberLikePost();

    } catch (err) {
      console.log(err);
    }
  };

  //探索社團：路由撈資料 & 執行display
  const getExploreCommunity = async () => {
    try {
      // console.log(serverURL.explorecommunity);
      let response = await fetch(serverURL.explorecommunity, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
      // console.log(result.data);
      display_recommendCommunity(result.data.exploreCard);
      display_postDetail(result.data.explorePost);

      let postidArr=[];
      for(let i = 0; i<result.data.explorePost.length; i++){
        postidArr.push(result.data.explorePost[i].PostId);
      }
      addClickEventToReply(postidArr);
      addClickEventToLike(postidArr);
      MultiImgFunction();
      MemberLikePost();

    } catch (err) {
      console.log(err);
    }
  };

  //留言：路由撈資料 & 執行display
  const getCommunityReply = async (x) => {
    try {
      let response = await fetch(serverURL.articlereply);
      let result = await response.json();
      // console.log(result);
      // console.log(x);
      // console.log(result.data[x]);
      display_replyDetail(result.data, x);
    } catch (err) {
      console.log(err);
    }
  };

  //社團首頁文字搜尋(社團小卡)：路由撈資料 & 執行display
  const txtsearchCommunityCard = async (x) => {
    try {
      let response = await fetch(serverURL.txtsearchcommunitycard + x, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
      display_recommendCommunity(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  //社團首頁文字搜尋(社團文章)：路由撈資料 & 執行display
  const txtsearchCommunityArticle = async (x) => {
    try {
      let response = await fetch(serverURL.txtsearchcommunityarticle + x, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
      display_postDetail(result.data);

      let postidArr=[];
      for(let i = 0; i<result.data.length; i++){
        postidArr.push(result.data[i].PostId);
      }
      addClickEventToReply(postidArr);
      addClickEventToLike(postidArr);
      MultiImgFunction();
      MemberLikePost();

    } catch (err) {
      console.log(err);
    }
  };


  //*----------------------------------------路由送回資料區----------------------------------------*//
  //新增留言：資料送回SQL
  const addReplyToSQL = async (postid, content) => {
    try {
      let nowtime = new Date();
      let replytime =
        nowtime.toLocaleDateString() +
        " " +
        timeFormatAdjust(nowtime.getHours()) +
        ":" +
        timeFormatAdjust(nowtime.getMinutes());

      let replyFormdata = new FormData();
      replyFormdata.append("fPostId", postid);
      replyFormdata.append("fContent", content);
      replyFormdata.append("fReplyTime", replytime);

      let res = await fetch(serverURL.addReply, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("Cycle link token"),
        },
        body: replyFormdata,
        cache: "no-cache",
        credentials: "include",
      });
      let result = await res.json();
      //重新載入留言
      getCommunityReply(postid);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  // const deleteReplyToSQL = async(postid);

  //獲讚清單：資料送回SQL
  const MemberLikePost = async (P) => {
    try {
      let response = await fetch(serverURL.likes, {
        method: "Get", // http request method
        headers: {
          // http headers
          Authorization: localStorage.getItem("Cycle link token"),
        },
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
      let hearts_arr = document.querySelectorAll(".fa-heart");
      for (let i = 0; i < hearts_arr.length; i++) {
        for (let j = 0; j < result.data.length; j++)
          if (hearts_arr[i].id.split("Id")[1] == result.data[j].fPostId) {
            hearts_arr[i].classList.add("fas");
          }
      }
    } catch (err) {
      console.log(err);
      // 錯誤處理
    }
  };

  //新增喜歡：資料送回SQL
  const addLikeToSQL = async (P) => {
    try {
      var formdata = new FormData();
      formdata.append("fPostId", P);
      let response = await fetch(serverURL.addlikes, {
        method: "POST", // http request method
        headers: {
          // http headers
          Authorization: localStorage.getItem("Cycle link token"),
        },
        body: formdata,
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
    } catch (err) {
      console.log(err);
      // 錯誤處理
    }
  };

  //刪除喜歡：資料送回SQL
  const removeLikeToSQL = async (P) => {
    try {
      console.log("P:", P);
      var formdata = new FormData();
      formdata.append("fPostId", P);
      let response = await fetch(serverURL.removelikes, {
        method: "DELETE", // http request method
        headers: {
          // http headers
          Authorization: localStorage.getItem("Cycle link token"),
        },
        body: formdata,
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
      // 錯誤處理
    }
  };
  
  //TODO postime判斷距離現在時間
  //TODO 刪除留言
  //TODO 刪除文章

  // this.GetAllPosts = getCommunityPost;
  // this.SearchtxtCommunity = document.querySelector(".CM_banner_searchbar_text").value;
  // this.SearchCardCommunity = document.querySelector(".CM_recommend_container").innerHTML;
}
const CommunityMain = new ClsCommunityMain();

// const communityMainChanging123 = () => {
//   if (location.hash.includes("#community")) {
//     CommunityMain.GetAllPosts();
//     CommunityMain.SearchtxtCommunity = "";
//     CommunityMain.SearchCardCommunity = "";
//     console.log("yyyyyyyyyy");
//   }
// };
// window.addEventListener("hashchange", communityMainChanging123);
// window.addEventListener("load", communityMainChanging123);
