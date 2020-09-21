// import { serverURL } from "./api.js";
// const { IgnorePlugin } = require("webpack");

function ClsCommunityArticle() {
  //*----------------------------------------奇形怪狀的方法們----------------------------------------*//
  //從網址抓取社團ID給大家用
  const getCommunityIdFromUrl = () => {
    let whereAmI = window.location.hash.split("/");
    let getCommunityId = whereAmI[2];
    return getCommunityId;
  };

  //調整時間格式：補0
  function timeFormatAdjust(x) {
    if (x < 10) {
      x = "0" + x;
    }
    return x;
  }

  //社團頁面：文章字串判斷是否有圖片，沒有就不匯入div
  const Article_ImgIsNullOrNot = (x) => {
    if (x === null || x === "") {
      return ``;
    } else {
      var y = x.includes(",,");
      if (y) {
        let imgArr = x.split(",,");
        // console.log(imgArr);
        var a = Article_multiImgArr(imgArr);
        return `<i class="fas fa-chevron-left fa-2x ArticlePost_preIcon" style="color:white"></i>
      <i class="fas fa-chevron-right fa-2x ArticlePost_nextIcon" style="color:white"></i>
      ${a}`;
      } else {
        return `
      <div class="community_article_body_img">
    <img class="community_article_body_img_img" src='http://localhost:3050/${x}' />
    </div>`;
      }
    }
  };

  //社團頁面：如果是多張圖片，則以陣列匯入div
  const Article_multiImgArr = (k) => {
    let result = "";
    k.map((e, index) => {
      result += `<div class="community_article_body_img">
  <img class="community_article_body_img_img" src='http://localhost:3050/${e}' />
  </div>`;
    });
    return result;
  };

  //多張照片：輪播式呈現function
  function Article_MultiImgFunction() {
    let community_article_body = document.querySelectorAll(
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
    var allNextIcon = document.querySelectorAll(".ArticlePost_nextIcon");
    // console.log(allNextIcon);
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
    var allPreIcon = document.querySelectorAll(".ArticlePost_preIcon");
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

  //新增文章：圖片上傳時觸發事件，能夠多張圖片載入
  document
    .getElementById("articleImgInput")
    .addEventListener("change", function () {
      let addArticleImgFiles = document.getElementById("articleImgInput").files;
      let addArticleDisplay = document.querySelector(".AddArticleImgDisplay");
      for (let i = 0; i < addArticleImgFiles.length; i++) {
        let imgFilesItem = addArticleImgFiles[i];
        if (!imgFilesItem.type.match("image")) continue;

        var addArticleImgReader = new FileReader();
        addArticleImgReader.addEventListener("load", function (e) {
          let picfile = e.target;
          let createDiv = document.createElement("div");
          createDiv.setAttribute("class", "removeImgClass");
          createDiv.innerHTML =
            "<img src=" +
            picfile.result +
            " class='AddArticleImgDisplay_img'></img>";
          addArticleDisplay.insertBefore(createDiv, null);
        });
        addArticleImgReader.readAsDataURL(imgFilesItem);
      }
    });

  //社團頁面留言：Icon點擊觸動function寫入留言內容
  function Article_addClickEventToReply(pIds) {
    pIds.map((e, index) => {
      let TheReplyIcon = document.getElementById("Article_replyIconbyfId" + e);
      TheReplyIcon.addEventListener("click", async () => {
        getArticleReply(e);
        // Article_showReplyInput(e);
      });
    });
  }

  //社團頁面喜歡：Icon點擊觸動function寫入留言內容
  function Article_addClickEventToLike(pIds) {
    pIds.map((e, index) => {
      let TheLikeIcon = document.getElementById("Article_likeIconbyfId" + e);
      TheLikeIcon.addEventListener("click", function () {
        if (
          TheLikeIcon.classList.contains("far") &&
          TheLikeIcon.classList.contains("fas")
        ) {
          TheLikeIcon.classList.remove("fas");
          TheLikeIcon.classList.add("far");
          Article_removeLikeToSQL(e);
          Article_likesMinusCount(this);
        } else if (TheLikeIcon.classList.contains("far")) {
          TheLikeIcon.classList.remove("far");
          TheLikeIcon.classList.add("fas");
          Article_addLikeToSQL(e);
          Article_likesPlusCount(this);
        } else {
          TheLikeIcon.classList.remove("fas");
          TheLikeIcon.classList.add("far");
          Article_removeLikeToSQL(e);
          Article_likesMinusCount(this);
        }
      });
    });
  }

  //喜歡增加：顯示數量增加
  function Article_likesPlusCount(e) {
    let target = e.parentNode.getElementsByTagName("span")[0];
    if (target.innerHTML == "") {
      target.innerHTML = 1;
    } else {
      target.innerHTML = parseInt(target.innerHTML) + 1;
    }
  }

  //喜歡減少：顯示數量減少
  function Article_likesMinusCount(e) {
    let target = e.parentNode.getElementsByTagName("span")[0];
    if (target.innerHTML == "1") {
      target.innerHTML = "";
    } else {
      target.innerHTML = parseInt(target.innerHTML) - 1;
    }
  }

  //留言區：顯示我要留言區(不需要撈資料庫)
  function Article_showReplyInput(x) {
    document.getElementById(
      "Article_bindPostReplybyfId" + x
    ).innerHTML += htmlCommunityArticleReplyInput(x);
  }

  //TODO編輯文章：判斷是否有圖片，沒有就不匯入div
  const Edit_ImgIsNullOrNot = (x) => {
    if (x === null) {
      return ``;
    } else {
      var y = x.includes(",,");
      if (y) {
        let imgArr = x.split(",,");
        // console.log(imgArr);
        var a = Article_multiImgArr(imgArr);
        return a;
      } else {
        return `
      <div class="community_article_body_img">
    <img class="community_article_body_img_img" src='http://localhost:3050/${x}' />
    </div>`;
      }
    }
  };

  //*----------------------------------------文字樣板----------------------------------------*//
  //社團頁面：文章文字樣板
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
             <a class="PostIdLink_Community" href="#community/post/${
               x.PostId
             }"><span>${x.fPostTime}</span></a>
          </div>
          <i class="fas fa-ellipsis-v editIconforArticle" id="editIcon${
            x.PostId
          }"></i>
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

  //新增文章處(使用者頭像)：文字樣板
  const htmlCommunityAddArticleImg = (x) => {
    return `
    <div class="community_article_user_img_circle_border">
    <div class="community_article_user_img_container" onclick="location.hash='#personal-page/${x.fId}'">
      <img class="community_article_user_img" src="http://localhost:3050/${x.fPhotoPath}" onclick="location.hash='#personal-page/${x.fId}'"/>
    </div> </div>
  `;
  };

  //編輯文章：文字樣板
  const htmlCommunityEditArticle = (x) => {
    return `
    <form id="edit_article_form">
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
             <p>${x.PostMemberName}</p>
    <p>${x.fPostTime}</p>
        </div>
        <label class="EditArticleLabel">
        <input type="file" name="fPhoto" id="editArticleImgInput" multiple="multiple" style="display: none;">
        <i class="fas fa-images"></i>
      </label>
      <label class="EditArticleLabel">
        <input type="submit" id="editArticleSubmitIcon" style="display: none;">
        <i class="far fa-paper-plane"></i>
      </label>
    </div>
        <textarea class="EditArticleInput" name="fContent" cols=30 rows=2>${
          x.PostContent
        }</textarea>
        ${Edit_ImgIsNullOrNot(x.PostImg)}
      </form>`;
  };

  //TODO社團留言：文字樣板
  const htmlCommunityMainReply = (x) => {
    return `
  <div class="community_article_reply">
  <div class="community_article_reply_header">
    <div class="community_article_reply_header_img_container">
      <div class="community_article_reply_header_img_circle_border">
        <div class="community_article_reply_header_img">
          <img
            src="http://localhost:3050/${x.ReplyMemberImg}"
            class="community_article_reply_header_img_img"
          />
        </div>
      </div>
    </div>
    <div class="community_article_reply_header_content">
      <div class="community_article_reply_header_content_info">
        <span>${x.ReplyMemberName}</span>
        <span>${x.fReplyTime}</span>
        <i class="fas fa-stream editIconforReply"></i>
      </div>
      <div class="community_article_reply_header_content_text">
        <span
          >${x.fContent}</span
        >
      </div>
    </div>
  </div>
  <div class="community_article_reply_content" id=""></div>
</div>`;
  };

  //TODO社團：我要留言：文字樣板
  const htmlCommunityArticleReplyInput = (x) => {
    return `<div class="CM_reply_input_container">
  <input type="text" id="ArticleReplyText${x}"/>
  <div class="ReplySendClass" id="ArticleReplySend${x}"><i class="fas fa-paper-plane"></i></div>
</div>`;
  };
  //*------------------------------Index已經存在的東西，增加他們ㄉ點擊事件------------------------------*//
  //發表文章：點擊觸發
  document
    .getElementById("articleSubmitIcon")
    .addEventListener("click", function (e) {
      e.preventDefault();
      addArticletoSQL(getCommunityIdFromUrl());
      getPostInSingleCommunity(getCommunityIdFromUrl());
      document.querySelector(".AddArticleInput").value = "";
      let addArticleInput_height = document.querySelector(".AddArticleInput");
      addArticleInput_height.style.height = "4rem";
      document.querySelector(".removeImgClass").remove();
    });

  //*----------------------------------資料陣列匯入文字樣板function----------------------------------*//
  //社團頁面：使用者頭像字串匯入點
  let UserImgOnArticleAdd = document.querySelector(
    ".Group_detail_Societies_img_div"
  );

  //社團頁面：使用者頭像字串匯入function
  const display_UserImg = (e) => {
    UserImgOnArticleAdd.innerHTML += htmlCommunityAddArticleImg(e);
  };

  //社團文章：匯入點
  const ArticleUl = document.querySelector(".community_article_ul");

  //社團頁面：文章字串匯入function
  const display_postDetail = (o) => {
    ArticleUl.innerHTML = "";
    o.map(async (e, index) => {
      function goInside(e) {
        ArticleUl.innerHTML += htmlCommunityArticle(e);
      }
      await goInside(e);
      // console.log(document.getElementById("Article_replyIconbyfId" + e.PostId));
      //留言Icon：加入點擊事件
      // document
      //   .getElementById("Article_replyIconbyfId" + e.PostId)
      //   .addEventListener("click", function () {
      //     console.log("icon event has been added!");
      //     getArticleReply(e.PostId);
      //   });
    });
  };

  //社團頁面：留言字串匯入function
  const display_replyDetail = (o, x) => {
    document.getElementById("Article_bindPostReplybyfId" + x).innerHTML = "";
    o.map((e, index) => {
      if (e.fPostId == x) {
        document.getElementById(
          "Article_bindPostReplybyfId" + x
        ).innerHTML += htmlCommunityMainReply(e);
      }
    });

    //匯入我要留言區
    Article_showReplyInput(x);

    //此時增加留言發出的點擊事件
    document
      .getElementById("ArticleReplySend" + x)
      .addEventListener("click", () => {
        //抓取Text內容
        let content = document.getElementById("ArticleReplyText" + x).value;
        Article_addReplyToSQL(x, content);
      });
  };

  //編輯文章：字串匯入點
  let EditArticlePopUP = document.querySelector(".popUpforEdit");
  let popUpEditDiv = "";

  //編輯文章：資料放進文字樣板，匯入頁面
  const display_EditArticle = (o) => {
    o.map((e, index) => {
      EditArticlePopUP.innerHTML = htmlCommunityEditArticle(e);
    });
    document
      .getElementById("editArticleSubmitIcon")
      .addEventListener("click", (e) => {
        e.preventDefault();
        console.log(o[0].PostId);
        editArticletoSQL(o[0].PostId);
        getPostInSingleCommunity(getCommunityIdFromUrl());
        EditArticlePopUP.innerHTML = "";
        popUpEditDiv.classList.add("popUpforEdit_disappear");
      });
  };

  //*----------------------------------------路由撈資料區----------------------------------------*//
  //使用者頭像：路由撈資料 & 執行display
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

  //社團頁面文章：路由撈資料 & 執行display
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
      // console.log(result.data);

      //*-----每個路由撈文章ㄉ地方都值得來一套-----*//
      let postidArr = [];
      for (let i = 0; i < result.data.length; i++) {
        postidArr.push(result.data[i].PostId);
      }
      Article_addClickEventToReply(postidArr);
      Article_addClickEventToLike(postidArr);
      // addClickEventToEdit(postidArr);
      Article_MultiImgFunction();
      Article_MemberLikePost();
      //*--------------------------------------*//
      // 抓PostID，對編輯Icon增加點擊事件
      result.data.map((e, index) => {
        document
          .getElementById("editIcon" + e.PostId)
          .addEventListener("click", function () {
            console.log("被點到ㄌ");
            popUpEditDiv = document.querySelector(".popUpforEdit");
            popUpEditDiv.classList.remove("popUpforEdit_disappear");
            getPostforEdit(e.PostId);
          });
      });

      // Article_addClickEventToReply(result.data);
      // Article_addClickEventToLike(result.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  // 不用他ㄌ，拿去外面呼喚就好
  // getPostInSingleCommunity(getCommunityIdFromUrl());

  //留言：路由撈資料 & 執行display
  const getArticleReply = async (postid) => {
    try {
      let response = await fetch(serverURL.articlereply);
      let result = await response.json();
      // console.log(result);
      // console.log(result.data);
      display_replyDetail(result.data, postid);
    } catch (err) {
      console.log(err);
    }
  };

  //編輯文章：路由撈資料 & 執行display
  const getPostforEdit = async (x) => {
    try {
      let response = await fetch(serverURL.displayarticleforedit + x, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("Cycle link token"),
        },
      });
      let result = await response.json();
      console.log(result.data);
      await display_EditArticle(result.data);
      //編輯文章：Submit Icon加入點擊事件(抓取輸入ㄉ文章內容給SQL)
    } catch (err) {
      console.log(err);
    }
  };

  //*----------------------------------------路由送回資料區----------------------------------------*//
  //新增留言：資料送回SQL
  const Article_addReplyToSQL = async (postid, content) => {
    try {
      let nowtime = new Date();
      let replytime =
        timeFormatAdjust(nowtime.getFullYear()) +
        "/" +
        timeFormatAdjust(nowtime.getMonth() + 1) +
        "/" +
        timeFormatAdjust(nowtime.getDate()) +
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
      getArticleReply(postid);
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  //獲讚清單：資料送回SQL
  const Article_MemberLikePost = async (P) => {
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
  const Article_addLikeToSQL = async (P) => {
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
  const Article_removeLikeToSQL = async (P) => {
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

  //新增文章：資料送回SQL
  const addArticletoSQL = async (CommunityId) => {
    try {
      let nowtime = new Date();
      let addarticletime =
      timeFormatAdjust(nowtime.getFullYear()) +
      "/" +
      timeFormatAdjust(nowtime.getMonth() + 1) +
      "/" +
      timeFormatAdjust(nowtime.getDate()) +
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
      getPostInSingleCommunity(getCommunityIdFromUrl());
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  //編輯文章：資料送回SQL
  const editArticletoSQL = async (postid) => {
    try {
      let nowtime = new Date();
      let editarticletime =
      timeFormatAdjust(nowtime.getFullYear()) +
      "/" +
      timeFormatAdjust(nowtime.getMonth() + 1) +
      "/" +
      timeFormatAdjust(nowtime.getDate()) +
      " " +
      timeFormatAdjust(nowtime.getHours()) +
      ":" +
      timeFormatAdjust(nowtime.getMinutes());

      let form = document.getElementById("edit_article_form");
      var editFormdata = new FormData(form);
      editFormdata.append("fPostId", postid);
      editFormdata.append("fPostTime", editarticletime);
      // console.log(editFormdata);

      let response = await fetch(serverURL.editarticle, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("Cycle link token"),
        },
        body: editFormdata,
        // cache: "no-cache",
        // credentials: "include",
      });
      let result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  //點擊上傳照片的Icon觸發事件
  // document
  //   .getElementById("articleImgInput")
  //   .addEventListener("click", function (e) {
  //     console.log("我有被點到唷");
  //     let addArticleInput = document.querySelector(".AddArticleInput").value;
  //     addArticletoSQL(getCommunityIdFromUrl(), addArticleInput);
  //     getPostInSingleCommunity(getCommunityIdFromUrl());
  //   });

  // 一張圖片載入
  // document
  // .getElementById("articleImgInput")
  // .addEventListener("change", function () {

  //   let addArticleImgFiles = document.getElementById("articleImgInput").files[1];
  //   // let addArticleImgDisplay = document.querySelector(".AddArticleImgDisplay");
  //   console.log(addArticleImgFiles);
  //   let addArticleImgReader = new FileReader();

  //   addArticleImgReader.addEventListener("load", function (e) {
  //     // htmladdArticleImgItem(e.target.result)
  //     // console.log(htmladdArticleImgItem(e.target.result));
  //     document
  //       .querySelector(".AddArticleImgDisplay_img")
  //       .setAttribute("src", e.target.result);
  //   });
  //   addArticleImgReader.readAsDataURL(addArticleImgFiles);
  // })

  this.ComeonPost = getPostInSingleCommunity;
}
const CommunityArticle = new ClsCommunityArticle();

const communityMainChanging = () => {
  let cumDetailArr = window.location.hash.split("/"); // #community/detail/3  -> [ #community, detail, 3 ]
  let cumDetailId = cumDetailArr[2];
  if (location.hash.includes("#community/detail/")) {
    CommunityArticle.ComeonPost(cumDetailId);
  }
};
window.addEventListener("hashchange", communityMainChanging);
window.addEventListener("load", communityMainChanging);
