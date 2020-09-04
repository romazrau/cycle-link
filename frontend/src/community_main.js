import {
  serverURL
} from "./api.js";

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

  var CM_appearCategory_item_flag = true;

  $(".CM_appearCategory_item").hide();
  $(".CM_searchbar_category").on("click", function () {
    console.log("hi");
    if (CM_appearCategory_item_flag) {
      $(".CM_appearCategory_item").show();
      CM_appearCategory_item_flag = false;
    } else {
      $(".CM_appearCategory_item").hide();
      CM_appearCategory_item_flag = true;
    }
  });

  //文字樣板
  const htmlCommunityMainPost = (x) => {
    return `
      <li ${x.isRight}>
      <div class="community_main_groupIcon">
        <a href="#community/${x.CommunityId}" title="${x.CommunityName}" class="CM_groupIcon_wrap">
          <img class="CM_groupIcon_img" src="${x.CommunityImgPath}" />
        </a>
      </div>
      <div class="community_main_timeline_panel">
        <div class="CM_timeline_heading">
          <div class="CM_timeline_heading_img_container">
            <img class="CM_timeline_heading_img" src="${x.MemberImgPath}" />
          </div>
          <div class="CM_timeline_heading_userinfo">
             <a href="#community/${x.MemberId}"><p>${x.PostMemberName}</p></a>
             <a href="#community/${x.CommunityId}">
             <span class="communityName_span">${x.CommunityName}</span>
             </a>
             <a href="#community/post/${x.PostId}"><span>${x.PostTime}</span></a>
          </div>
        </div>
        <div class="CM_timeline_body">
          <p>
          ${x.fContent}
          </p>
          <div class="CM_timeline_body_img">
            ${x.ImgPaths}
          </div>
        </div>
        <div class="CM_timeline_footer">
          <i class="far fa-heart changebyclick"></i><span>${x.likeCount}</span>
          <i class="far fa-comments"></i><span>${x.replyCount}</span>
        </div>
        <div class="replyContainer"></div>
      </div>
    </li>`;
  };

  const getCommunityPost = async () => {
    try {
      let response = await fetch(serverURL.article);
      let result = await response.json();
      // console.log("a_test await");
      // console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  getCommunityPost();

  const htmlCommunityMainReply = (x) => {
    return `
      <div class="replyitem">
      <img src="${x.userImgPath}">
      ${x.replyName}
      </div>
    `;
  };

  //POST假資料
  let CommunityMainFakeData = [{
      communityName: "種樹社團",
      communityIconPath: "img/sprout.png",
      userImgPath: "img/user01.jpg",
      userName: "新垣結衣",
      postTimeAgo: "1小時前",
      postContent: "好久沒有見到大家了！這次的活動是種台灣原生種牛樟樹的樹苗，讓原生樹種適地適木、複層造林，不僅種下在地居民的健康，也讓野生動物有長長久久的棲息地。",
      postImgPath: "<img src='img/user01_post.jpg' />",
      likeCount: 43,
      replyCount: 3,
    },
    {
      isRight: "class='community_main_timeline_inverted'",
      communityName: "二手換物",
      communityIconPath: "img/market.png",
      userImgPath: "img/user02.jpg",
      userName: "鞋貓劍客",
      postTimeAgo: "2小時前",
      postContent: "周末的市集超好玩！寶寶用不到的東西都清出去了，而且總算見到@王威比本尊，爽拉！",
      postImgPath: "<img src='img/user02_post.jpg' />",
      likeCount: 13,
      replyCount: 1,
    },
    {
      communityName: "神聖淨山ㄉ力量",
      communityIconPath: "img/mountain.png",
      userImgPath: "img/user04.jpg",
      userName: "吉他啦",
      postTimeAgo: "3小時前",
      postContent: "哥淨的不是山，是靈魂R",
      postImgPath: "<img src='img/user04_post.jpg' />",
      likeCount: 3,
      replyCount: null,
    },
    {
      isRight: "class='community_main_timeline_inverted'",
      communityName: "走啦去淨攤啦",
      communityIconPath: "img/reef.png",
      userImgPath: "img/user07.jpg",
      userName: "子瑜Tzu-yu",
      postTimeAgo: "4小時前",
      postContent: "今天跟達達出去逛街好開心唷！好期待下次的約會～",
      postImgPath: "<img src='img/user07_post.jpg' />",
      likeCount: 230,
      replyCount: 7,
    },
    {
      communityName: "二手換物",
      communityIconPath: "img/market.png",
      userImgPath: "img/user05.jpg",
      userName: "大安阿基師",
      postTimeAgo: "4小時前",
      postContent: "想要煮好吃的飯飯QQ，有沒有換友有鑄鐵鍋想拿出來交換的呀～",
      postImgPath: "<img src='img/user05_post.jpg' />",
      likeCount: 64,
      replyCount: 4,
    },
    {
      isRight: "class='community_main_timeline_inverted'",
      communityName: "走啦去淨攤啦",
      communityIconPath: "img/reef.png",
      userImgPath: "img/user03.jpg",
      userName: "無敵可愛8+9",
      postTimeAgo: "6小時前",
      postContent: "宵夜！！！有沒有人要吃宵夜！！！在線等！！！",
      postImgPath: "",
      likeCount: 2,
      replyCount: 7,
    },
    {
      communityName: "種樹社團",
      communityIconPath: "img/sprout.png",
      userImgPath: "img/user06.jpg",
      userName: "甜食怪",
      postTimeAgo: "5小時前",
      postContent: "不是我在說，我家薄荷長得真是頭好壯壯<3",
      postImgPath: "<img src='img/user06_post.jpg' />",
      likeCount: 39,
      replyCount: 7,
    },
  ];

  const CMpost = document.querySelector(".community_main_ul_timeline");

  CommunityMainFakeData.map((e, index) => {
    CMpost.innerHTML += htmlCommunityMainPost(e);
  });

  //字串樣板輸入完後，才可以寫icon動態
  var click123 = false;
  $(".changebyclick").click(function () {
    if (click123 == false) {
      $(".changebyclick").removeClass("far").addClass("fas");
      console.log("abb");
      click123 = true;
    } else {
      $(".changebyclick").removeClass("fas").addClass("far");
      click123 = false;
      console.log("ddddb");
    }
  });

  //跳轉至社團Detail
  document.querySelectorAll(".communityName_span").forEach((item, index) => {
    item.addEventListener("click", (event) => {
      location.hash = `#community/detail`;
    });
  });
}
const CommunityMain = new ClsCommunityMain();