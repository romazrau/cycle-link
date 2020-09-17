// import { serverURL } from "./api.js";

function ClsCommunityArticle() {
  //社團文章文字樣板
  const htmlCommunityArticle = (x) => {
    return `
      <div class="community_article_wrap">
        <div class="community_article_heading">
        <div class="community_article_heading_img_circle_border">
          <div class="community_article_heading_img_container" onclick="location.hash='#personal-page/${
            x.MemberId
          }'">
            <img class="community_article_heading_img" src="http://localhost:3050/${
              x.MemberImgPath
            }" onclick="location.hash='#personal-page/${x.MemberId}'"/>
          </div> </div>
          <div class="community_article_heading_userinfo">
             <a href="#personal-page/${x.MemberId}"><p>${
      x.PostMemberName
    }</p></a>
             <a href="#community/post/${x.PostId}"><span>${
      x.fPostTime
    }</span></a>
          </div>
          <i class="fas fa-ellipsis-v editIconforArticle"></i>
        </div>
        <div class="community_article_body">
          <p>${x.PostContent}</p>
        ${Article_ImgIsNullOrNot(x.PostImg)}
        </div>
        <div class="community_article_footer">
          <i class="far fa-heart changebyclick" id="Article_likeIconbyfId${
            x.PostId
          }"></i><span>${x.HowMuchLike || ""}</span>
          <i class="far fa-comments Article_replyIcon" id="Article_replyIconbyfId${
            x.PostId
          }"></i><span>${x.HowMuchReply || ""}</span>
          </div>
          <div class="replyContainer" id="Article_bindPostReplybyfId${
            x.PostId
          }"></div>
        </div>
`;
  };

  //新增文章使用者頭像：文字樣板
  const htmlCommunityAddArticleImg = (x) => {
    return `
    <div class="community_article_user_img_circle_border">
    <div class="community_article_user_img_container" onclick="location.hash='#personal-page/${x.fId}'">
      <img class="community_article_user_img" src="http://localhost:3050/${x.fPhotoPath}" onclick="location.hash='#personal-page/${x.fId}'"/>
    </div> </div>
  `;
  };
  //使用者頭像：匯入點
  let UserImgOnArticleAdd = document.querySelector(
    ".Group_detail_Societies_img_div"
  );
  //使用者頭像：資料放進文字樣板，匯入頁面
  const display_UserImg = (e) => {
    UserImgOnArticleAdd.innerHTML += htmlCommunityAddArticleImg(e);
  };
  //使用者頭像：路由撈資料
  const showUserImg = async () => {
    try {
      let response = await fetch(serverURL.articleuser, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("Cycle link token"),
        },
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
      // console.log(result.data);
      display_UserImg(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  showUserImg();

  //TODO社團留言：文字樣板
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

  //TODO社團：我要留言：文字樣板
  const htmlCommunityMainReplyInput = (x) => {
    return `<div class="CM_reply_input_container">
    <input type="text" id="ReplyText${x}"/>
    <div class="ReplySendClass" id="ReplySend${x}"><i class="fas fa-paper-plane"></i></div>
  </div>`;
  };

  //抓取社團ID給大家用
  const getCommunityIdFromUrl = () => {
    let whereAmI = window.location.hash.split("/");
    let getCommunityId = whereAmI[2];
    return getCommunityId;
  };

  //社團文章：文字樣板用方法，判斷是否有圖片，沒有就不匯入div
  const Article_ImgIsNullOrNot = (x) => {
    if (x === null) {
      return ``;
    } else {
      var y = x.includes(",,");
      if (y) {
        let imgArr = x.split(",,");
        // console.log(imgArr);
        var a = Article_multiImgArr(imgArr);
        return `<a class="Post_preIcon" href=""><</a>${a}<a class="Post_nextIcon"href="">></a>`;
      } else {
        return `
        <div class="community_article_body_img">
      <img class="community_article_body_img_img" src='http://localhost:3050/${x}' />
      </div>`;
      }
    }
  };

  //社團文章：多張照片匯入樣板
  const Article_multiImgArr = (k) => {
    let result = "";
    k.map((e, index) => {
      result += `<div class="community_article_body_img">
    <img class="community_article_body_img_img" src='http://localhost:3050/${e}' />
    </div>`;
    });
    return result;
  };

  //社團文章：匯入點
  const ArticleUl = document.querySelector(".community_article_ul");

  //社團文章：資料放進文字樣板，匯入頁面
  const display_postDetail = (o) => {
    ArticleUl.innerHTML = "";
    o.map(async (e, index) => {
      function goInside(e) {
        ArticleUl.innerHTML += htmlCommunityArticle(e);
      }
      await goInside(e);
      // console.log(document.getElementById("Article_replyIconbyfId" + e.PostId));
      document
        .getElementById("Article_replyIconbyfId" + e.PostId)
        .addEventListener("click", function () {
          console.log("icon event has been added!");
          getArticleReply(e.PostId);
        });
    });
  };

  //留言區：顯示我要留言區(不需要撈資料庫)
  function showReplyInput(x) {
    document.getElementById(
      "Article_bindPostReplybyfId" + x
    ).innerHTML += htmlCommunityMainReplyInput(x);
  }
  //留言：資料放進文字樣板，匯入頁面
  const display_replyDetail = (o, x) => {
    o.map((e, index) => {
      if (e.fPostId == x) {
        document.getElementById(
          "Article_bindPostReplybyfId" + x
        ).innerHTML += htmlCommunityMainReply(e);
      }
    });
    //匯入我要留言區
    showReplyInput(x);
    // 增加發出訊息的事件
    // document
    //   .getElementById("ReplySend" + x)
    //   .addEventListener("click", function () {
    //     // 抓取Text內容
    //     let content = document.getElementById("ReplyText" + x).value;
    //     addReplyToSQL(x, content);
    //   });
  };

  //留言：路由撈資料
  const getArticleReply = async (postid) => {
    try {
      let response = await fetch(serverURL.articlereply);
      let result = await response.json();
      // console.log(result);
      // console.log(result.data);
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].fPostId == postid) {
          console.log(result.data[i].fPostId);
          display_replyDetail(result.data, postid);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //留言：新增點擊事件給留言Icon
  // function Article_addClickEventToReply(o, x) {

  //   let singleReplyIcon = document.getElementById("Article_replyIconbyfId"+x);
  //   let replyInputPlace = document.getElementById("Article_bindPostReplybyfId"+x);
  //   singleReplyIcon.addEventListener("click", (e)=>{
  //     e.preventDefault();
  //     replyInputPlace.innerHTML += "";

  //     CM_recommend.innerHTML = "";
  //   o.map((e, index) => {
  //     CM_recommend.innerHTML += htmlCommunityCard(e);
  //   });
  //   })

  //   let replyIcons = document.querySelectorAll(".Article_replyIcon");
  //   replyIcons.forEach((i) => {
  //     i.addEventListener("click", function (e) {
  //       getArticleReply(i.);
  //     });
  //   });
  //   console.log("典籍感測");
  // }

  //喜歡文章：愛心function，字串樣板輸入完畢後執行
  function Article_addClickEventToLike(x) {
    let Postlikeflag = false;
    for (let i = 1; i < x + 1; i++) {
      let LikeIconItems = document.getElementById("Article_likeIconbyfId" + i);
      LikeIconItems.addEventListener("click", function () {
        if (Postlikeflag == false) {
          LikeIconItems.classList.remove("far");
          LikeIconItems.classList.add("fas");
          //取ID增點讚
          let id_arr = this.id.split("fId");
          addLikeToSQL(id_arr[1]);
          Postlikeflag = true;
        } else {
          LikeIconItems.classList.remove("fas");
          LikeIconItems.classList.add("far");

          Postlikeflag = false;
          let id_arr = this.id.split("fId");
          console.log(id_arr[1]);
          removeLikeToSQL(id_arr[1]);
          // console.log("愛心又被點了");
        }
      });
    }
  }
  //*------發表文章：Submit Icon加入點擊事件(抓取輸入ㄉ文章內容給SQL)
  document
    .getElementById("articleSubmitIcon")
    .addEventListener("click", function (e) {
      e.preventDefault();
      addArticletoSQL(getCommunityIdFromUrl());
      getPostInSingleCommunity(getCommunityIdFromUrl());
      document.querySelector(".AddArticleInput").value = "";
    });

  //社團文章：路由撈資料
  const getPostInSingleCommunity = async (x) => {
    try {
      let response = await fetch(serverURL.articlebycommunity + x, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("Cycle link token"),
        },
        cache: "no-cache",
        credentials: "include",
      });
      let result = await response.json();
      await display_postDetail(result.data);

      // Article_addClickEventToReply(result.data);
      //TODO典籍喜歡
      // Article_addClickEventToLike(result.data.length);
      const community_article_body = document.querySelectorAll(
        ".community_article_body"
      );

      //處理超過2張照片
      for (let i = 0; i < community_article_body.length; i++) {
        if (community_article_body[i].getElementsByTagName("img").length > 1) {
          let PostImgs = community_article_body[i].querySelectorAll(
            ".community_article_body_img"
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
    } catch (err) {
      console.log(err);
    }
  };
  // 不用他ㄌ，拿去外面呼喚就好
  // getPostInSingleCommunity(getCommunityIdFromUrl());

  function timeFormatAdjust(x) {
    if (x < 10) {
      x = "0" + x;
    }
    return x;
  }
  //點擊上傳照片的Icon觸發事件
  // document
  //   .getElementById("articleImgInput")
  //   .addEventListener("click", function (e) {
  //     console.log("我有被點到唷");
  //     let addArticleInput = document.querySelector(".AddArticleInput").value;
  //     addArticletoSQL(getCommunityIdFromUrl(), addArticleInput);
  //     getPostInSingleCommunity(getCommunityIdFromUrl());
  //   });
  //TODO圖片載入測試中
  // document
  //   .getElementById("articleImgInput")
  //   .addEventListener("change", function () {
  //     let addArticleImgFile = document.getElementById("articleImgInput")[0]
  //       .files[0];
  //     let addArticleImgReader = new FileReader();
  //     addArticleImgReader.onload = function (e) {
  //       document
  //         .querySelector(".AddArticleImgDisplay_img")
  //         .attributes("src", e.target.result);
  //     };
  //     addArticleImgReader.readAsDataURL(addArticleImgFile);
  //   });

  //新增文章
  const addArticletoSQL = async (CommunityId) => {
    try {
      let nowtime = new Date();
      let addarticletime =
        nowtime.toLocaleDateString() +
        " " +
        timeFormatAdjust(nowtime.getHours()) +
        ":" +
        timeFormatAdjust(nowtime.getMinutes());
      let form = document.getElementById("article_form");
      var articleFormdata = new FormData(form);
      articleFormdata.append("fCommunityId", CommunityId);
      articleFormdata.append("fPostTime", addarticletime);

      console.log(articleFormdata);

      let response = await fetch(serverURL.addarticle, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("Cycle link token"),
        },
        body: articleFormdata,
        // cache: "no-cache",
        // credentials: "include",
      });
      let result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  //TODO新增喜歡
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
  //TODO刪除喜歡
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
  this.ComeonPost = getPostInSingleCommunity;
}
const CommunityArticle = new ClsCommunityArticle();

const communityMainChanging = () => {
  let cumDetailArr = window.location.hash.split("/"); // #community/detail/3  -> [ #community, detail, 3 ]
  let cumDetailId = cumDetailArr[2];
  if (location.hash.includes("#community/detail/")) {
    CommunityArticle.ComeonPost(cumDetailId);
    console.log("xxxxxxxxxxxxxxxx");
  }
};
window.addEventListener("hashchange", communityMainChanging);
window.addEventListener("load", communityMainChanging);
