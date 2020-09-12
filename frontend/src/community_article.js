import { serverURL } from "./api.js";

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
            <img class="community_article_heading_img" src="${
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
        ${CA_ImgIsNullOrNot(x.PostImg)}
        </div>
        <div class="community_article_footer">
          <i class="far fa-heart changebyclick" id="likeIconbyfId${
            x.PostId
          }"></i><span>${x.HowMuchLike || ""}</span>
          <i class="far fa-comments" id="replyIconbyfId${x.PostId}"></i><span>${
      x.HowMuchReply || ""
    }</span>
          </div>
          <div class="replyContainer" id="bindPostReplybyfId${x.PostId}"></div>
        </div>
`;
  };
  //TODO社團留言：文字樣板
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

  //TODO社團：我要留言：文字樣板
  const htmlCommunityMainReplyInput = (x) => {
    return `<div class="CM_reply_input_container">
    <input type="text" id="ReplyText${x}"/>
    <div class="ReplySendClass" id="ReplySend${x}"><i class="fas fa-paper-plane"></i></div>
  </div>`;
  };

  const getCommunityIdFromUrl = () => {
    let whereAmI = window.location.hash.split("/");
    let getCommunityId = whereAmI[2];
    return getCommunityId;
  };

  //判斷是否有圖片，沒有就不匯入div
  const CA_ImgIsNullOrNot = (x) => {
    if (x === null) {
      return ``;
    } else {
      var y = x.includes(",,");
      if (y) {
        let imgArr = x.split(",,");
        // console.log(imgArr);
        var a = CA_multiImgArr(imgArr);
        return `<a class="Post_preIcon" href=""><</a>${a}<a class="Post_nextIcon"href="">></a>`;
      } else {
        return `
        <div class="community_article_body_img">
      <img class="community_article_body_img_img" src='${x}' />
      </div>`;
      }
    }
  };

  //多張照片匯入樣板
  const CA_multiImgArr = (k) => {
    let result = "";
    k.map((e, index) => {
      result += `<div class="community_article_body_img">
    <img class="community_article_body_img_img" src='${e}' />
    </div>`;
    });
    return result;
  };

  //社團文章匯入Index處
  const ArticleUl = document.querySelector(".community_article_ul");
  const display_postDetail = (o) => {
    ArticleUl.innerHTML = "";
    o.map((e, index) => {
      ArticleUl.innerHTML += htmlCommunityArticle(e);
    });
  };

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
  function addClickEventToReply(x) {
    for (let i = 1; i < x + 1; i++) {
      let TheReplyIcon = document.getElementById("replyIconbyfId" + i);
      TheReplyIcon.addEventListener("click", function (e) {
        // console.log(i);
        getCommunityReply(i);
      });
    }
  }
  //喜歡文章：愛心function，字串樣板輸入完畢後執行
  function addClickEventToLike(x) {
    let Postlikeflag = false;
    for (let i = 1; i < x + 1; i++) {
      let LikeIconItems = document.getElementById("likeIconbyfId" + i);
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
  //文章列表撈資料
  const getPostInCommunity = async (x) => {
    try {
      //   console.log(serverURL.articlearticle + x);
      let response = await fetch(serverURL.articlearticle + x, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("Cycle link token"),
        },
        cache: "no-cache",
        credentials: "include",
      });
      //   console.log(response);
      let result = await response.json();
      //   console.log(result.data);
      // console.log(result.data.length);
      display_postDetail(result.data);
      // console.log("data:", result.data);
      addClickEventToReply(result.data.length);
      addClickEventToLike(result.data.length);
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
  getPostInCommunity(getCommunityIdFromUrl());
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

  //   const whichCommunity = () => {
  //     let whereAmI = window.location.hash.split("/");
  //     let getCommunityId = whereAmI[2];
  //     console.log(whereAmI);
  //     console.log(getCommunityId);
  //     if (location.hash.includes("#community/detail/")) {
  //       let result = getPostInCommunity(getCommunityId);
  //       console.log(result);
  //     }
  //   };
  //   window.addEventListener("load", whichCommunity);
}
const CommunityArticle = new ClsCommunityArticle();
