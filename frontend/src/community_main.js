import { serverURL } from "./api.js";

function ClsCommunityMain() {
  // *second nav bar
  let pageY = window.pageYOffset;
  const communityNavbar = document.querySelector("#community_navbar");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset - pageY > 0) {
      communityNavbar.classList.remove("transYsWidthTo0Bottom");
    } else {
      communityNavbar.classList.add("transYsWidthTo0Bottom");
    }
    pageY = window.pageYOffset;
  });

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
        return `<a class="Post_preIcon" href=""><</a>${a}<a class="Post_nextIcon"href="">></a>`;
      } else {
        return `
        <div class="CM_timeline_body_img">
      <img class="CM_timeline_body_img_img" src='${x}' />
      </div>`;
      }
    }
  };

  const multiImgArr = (k) => {
    let result = "";
    k.map((e, index) => {
      result += `<div class="CM_timeline_body_img">
    <img class="CM_timeline_body_img_img" src='${e}' />
    </div>`;
    });
    return result;
  };

  //社團首頁：文章文字樣板(左邊)
  const htmlCommunityMainPostLeft = (x) => {
    return `
      <li>
      <div class="community_main_groupIcon">
        <a href="#community/detail/${x.CommunityId}" title="${
      x.CommunityName
    }" class="CM_groupIcon_wrap">
          <img class="CM_groupIcon_img" src="${x.CommunityImgPath}" />
        </a>
      </div>
      <div class="community_main_timeline_panel">
        <div class="CM_timeline_heading">
        <div class="CM_timeline_heading_img_circle_border">
          <div class="CM_timeline_heading_img_container" onclick="location.hash='#personal-page/${
            x.MemberId
          }'">
            <img class="CM_timeline_heading_img" src="${
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
          <img class="CM_groupIcon_img" src="${x.CommunityImgPath}" />
        </a>
      </div>
      <div class="community_main_timeline_panel">
        <div class="CM_timeline_heading">
        <div class="CM_timeline_heading_img_circle_border">
          <div class="CM_timeline_heading_img_container" onclick="location.hash='#personal-page/${
            x.MemberId
          }'">
            <img class="CM_timeline_heading_img" src="${
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
          <span>${
      x.HowMuchReply || ""
    }</span>
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
              src="${x.ReplyMemberImg}"
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
    return `<div class="CM_recommend_item" id="CM_recommend_${x.CommunityId}">
    <div class="CM_recommend_item_img">
        <img src="${x.CommunityImgPath}" class="CM_recommend_item_img_img">
    </div>
    <div class="CM_recommend_item_info">
        <p>${x.CommunityName}</p>
    </div>
</div>`;
  };

  //社團首頁：社團卡片字串匯入點
  const CM_recommend = document.querySelector(".CM_recommend_container");

  //社團首頁：文章字串匯入點
  const CMpost = document.querySelector(".community_main_ul_timeline");

  //社團卡片字串匯入function
  const display_recommendCommunity = (o) => {
    CM_recommend.innerHTML = "";
    o.map((e, index) => {
      CM_recommend.innerHTML += htmlCommunityCard(e);
    });
  };
  //TODO社團卡片：路由撈資料
  //   const getRecommendCommunity = async() => {
  //     try{
  // let response = await
  //     }catch(err){
  // console.log(err);
  //     }
  //   }

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

  //文章：路由撈資料
  const getCommunityPost = async () => {
    try {
      // console.log(serverURL.articlepost);
      let response = await fetch(serverURL.articlepost);
      let result = await response.json();
      await display_postDetail(result.data);
      // 這三小啊為何會有這個showReplyContainer();
      addClickEventToReply(result.data.length);
      addClickEventToLike(result.data.length);
      const CM_timeline_body = document.querySelectorAll(".CM_timeline_body");
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
      //尋找有按過讚的文章使其愛心變色
      MemberLikePost();
    } catch (err) {
      console.log(err);
    }
  };
  getCommunityPost();

  //社團首頁：留言字串匯入function
  const display_replyDetail = (o, x) => {
    o.map((e, index) => {
      if (e.fPostId == x) {
        document.getElementById(
          "bindPostReplybyfId" + x
        ).innerHTML += htmlCommunityMainReply(e);
      }
    });
    //匯入我要留言區
    showReplyInput(x);
    // 增加發出訊息的事件
    document
      .getElementById("ReplySend" + x)
      .addEventListener("click", function () {
        // 抓取Text內容
        let content = document.getElementById("ReplyText" + x).value;
        addReplyToSQL(x, content);
      });
  };

  //留言區：顯示我要留言區(不需要撈資料庫)
  function showReplyInput(x) {
    document.getElementById(
      "bindPostReplybyfId" + x
    ).innerHTML += htmlCommunityMainReplyInput(x);
  }

  //留言：塞資料進去字串樣板裡面
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

  //留言：Icon點擊觸動function寫入留言內容
  function addClickEventToReply(x) {
    for (let i = 1; i < x + 1; i++) {
      let TheReplyIcon = document.getElementById("replyIconbyfId" + i);
      TheReplyIcon.addEventListener("click", function (e) {
        // console.log(i);
        getCommunityReply(i);
      });
    }
  }

  //搜尋Icon點擊觸動function
  document
    .getElementById("CM_search_click")
    .addEventListener("click", function () {
      let input_text = document.querySelector(".CM_banner_searchbar_text")
        .value;
      checksearchtext(input_text);
    });

  //搜尋撈資料
  const checksearchtext = async (x) => {
    try {
      let response = await fetch(serverURL.articlesearch + x, {
        method: "GET",
        headers: {
          // http headers
          "Content-Type": "application/json", // 請求的資料類型
        },
        // 以下跟身分認證有關，後端要使用session 要帶這幾項
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
      display_postDetail(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  //喜歡文章：愛心function，字串樣板輸入完畢後執行
  function addClickEventToLike(x) {
    for (let i = 1; i < x + 1; i++) {
      let LikeIconItems = document.getElementById("likeIconbyfId" + i);

      LikeIconItems.addEventListener("click", function () {
        //已點過愛心包含'far','fas' class
        if (
          LikeIconItems.classList.contains("far") &&
          LikeIconItems.classList.contains("fas")
        ) {
          LikeIconItems.classList.remove("fas");
          LikeIconItems.classList.add("far");
          let id_arr = this.id.split("fId");
          removeLikeToSQL(id_arr[1]);
          likesMinusCount(this);
        } else if (LikeIconItems.classList.contains("far")) {
          LikeIconItems.classList.remove("far");
          LikeIconItems.classList.add("fas");
          //取ID增點讚
          let id_arr = this.id.split("fId");
          addLikeToSQL(id_arr[1]);
          likesPlusCount(this);
        } else {
          LikeIconItems.classList.remove("fas");
          LikeIconItems.classList.add("far");
          let id_arr = this.id.split("fId");
          removeLikeToSQL(id_arr[1]);
          likesMinusCount(this);
          
          // console.log("愛心又被點了");
        }
      });
    }
  }
  //點擊發送
  //TODO postime判斷距離現在時間

  function timeFormatAdjust(x) {
    if (x < 10) {
      x = "0" + x;
    }
    return x;
  }
  //新增留言
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
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  //TODO 刪除留言
  // const deleteReplyToSQL = async(postid);
  //獲讚清單
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

  //新增喜歡
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
  //刪除喜歡
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

  //TODO 新增文章
  //TODO 編輯文章
  //TODO 刪除文章
  function likesPlusCount(e)
  {
    let target=e.parentNode.getElementsByTagName("span")[0];
    if(target.innerHTML==""){
      target.innerHTML=1;
    }else{
      target.innerHTML=parseInt(target.innerHTML)+1;
    }
  }
  function likesMinusCount(e)
  {
       let target=e.parentNode.getElementsByTagName("span")[0];
       if(target.innerHTML=="1"){
        target.innerHTML="";
      }else{
        target.innerHTML=parseInt(target.innerHTML)-1;
      }

  }

  //用不上的社團類別動態
  // var CM_appearCategory_item_flag = true;
  // $(".CM_appearCategory_item").hide();
  // $(".CM_searchbar_category").on("click", function () {
  //   // console.log("hi");
  //   if (CM_appearCategory_item_flag) {
  //     $(".CM_appearCategory_item").show();
  //     CM_appearCategory_item_flag = false;
  //   } else {
  //     $(".CM_appearCategory_item").hide();
  //     CM_appearCategory_item_flag = true;
  //   }
  // });

  //POST假資料
  // let CommunityMainFakeData = [{
  //     communityName: "種樹社團",
  //     communityIconPath: "img/sprout.png",
  //     userImgPath: "img/user01.jpg",
  //     userName: "新垣結衣",
  //     postTimeAgo: "1小時前",
  //     postContent: "好久沒有見到大家了！這次的活動是種台灣原生種牛樟樹的樹苗，讓原生樹種適地適木、複層造林，不僅種下在地居民的健康，也讓野生動物有長長久久的棲息地。",
  //     postImgPath: "<img src='img/user01_post.jpg' />",
  //     likeCount: 43,
  //     replyCount: 3,
  //   },
  //   {
  //     isRight: "class='community_main_timeline_inverted'",
  //     communityName: "二手換物",
  //     communityIconPath: "img/market.png",
  //     userImgPath: "img/user02.jpg",
  //     userName: "鞋貓劍客",
  //     postTimeAgo: "2小時前",
  //     postContent: "周末的市集超好玩！寶寶用不到的東西都清出去了，而且總算見到@王威比本尊，爽拉！",
  //     postImgPath: "<img src='img/user02_post.jpg' />",
  //     likeCount: 13,
  //     replyCount: 1,
  //   },
  //   {
  //     communityName: "神聖淨山ㄉ力量",
  //     communityIconPath: "img/mountain.png",
  //     userImgPath: "img/user04.jpg",
  //     userName: "吉他啦",
  //     postTimeAgo: "3小時前",
  //     postContent: "哥淨的不是山，是靈魂R",
  //     postImgPath: "<img src='img/user04_post.jpg' />",
  //     likeCount: 3,
  //     replyCount: null,
  //   },
  //   {
  //     isRight: "class='community_main_timeline_inverted'",
  //     communityName: "走啦去淨攤啦",
  //     communityIconPath: "img/reef.png",
  //     userImgPath: "img/user07.jpg",
  //     userName: "子瑜Tzu-yu",
  //     postTimeAgo: "4小時前",
  //     postContent: "今天跟達達出去逛街好開心唷！好期待下次的約會～",
  //     postImgPath: "<img src='img/user07_post.jpg' />",
  //     likeCount: 230,
  //     replyCount: 7,
  //   },
  //   {
  //     communityName: "二手換物",
  //     communityIconPath: "img/market.png",
  //     userImgPath: "img/user05.jpg",
  //     userName: "大安阿基師",
  //     postTimeAgo: "4小時前",
  //     postContent: "想要煮好吃的飯飯QQ，有沒有換友有鑄鐵鍋想拿出來交換的呀～",
  //     postImgPath: "<img src='img/user05_post.jpg' />",
  //     likeCount: 64,
  //     replyCount: 4,
  //   },
  //   {
  //     isRight: "class='community_main_timeline_inverted'",
  //     communityName: "走啦去淨攤啦",
  //     communityIconPath: "img/reef.png",
  //     userImgPath: "img/user03.jpg",
  //     userName: "無敵可愛8+9",
  //     postTimeAgo: "6小時前",
  //     postContent: "宵夜！！！有沒有人要吃宵夜！！！在線等！！！",
  //     postImgPath: "",
  //     likeCount: 2,
  //     replyCount: 7,
  //   },
  //   {
  //     communityName: "種樹社團",
  //     communityIconPath: "img/sprout.png",
  //     userImgPath: "img/user06.jpg",
  //     userName: "甜食怪",
  //     postTimeAgo: "5小時前",
  //     postContent: "不是我在說，我家薄荷長得真是頭好壯壯<3",
  //     postImgPath: "<img src='img/user06_post.jpg' />",
  //     likeCount: 39,
  //     replyCount: 7,
  //   },
  // ];
}
const CommunityMain = new ClsCommunityMain();
