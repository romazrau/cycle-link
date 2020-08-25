function ClsCommunityMain() {
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
        <a href="#" title="${x.communityName}" class="CM_groupIcon_wrap">
          <img class="CM_groupIcon_img" src="${x.communityIconPath}" />
        </a>
      </div>
      <div class="community_main_timeline_panel">
        <div class="CM_timeline_heading">
          <div class="CM_timeline_heading_img_container">
            <img class="CM_timeline_heading_img" src="${x.userImgPath}" />
          </div>
          <div class="CM_timeline_heading_userinfo">
            <p>${x.userName}</p>
            <span>${x.postTimeAgo}</span>
            <span>@${x.communityName}</span>
          </div>
        </div>
        <div class="CM_timeline_body">
          <p>
          ${x.postContent}
          </p>
          <div class="CM_timeline_body_img">
            ${x.postImgPath}
          </div>
        </div>
        <div class="CM_timeline_footer">
          <i class="far fa-heart"></i>
          <i class="far fa-comments"></i>
        </div>
      </div>
    </li>`;
  };

  //POST假資料
  let CommunityMainFakeData = [
    {
      communityName: "種樹社團",
      communityIconPath: "img/sprout.png",
      userImgPath: "img/user01.jpg",
      userName: "新垣結衣",
      postTimeAgo: "1小時前",
      postContent:
        "好久沒有見到大家了！這次的活動是種台灣原生種牛樟樹的樹苗，讓原生樹種適地適木、複層造林，不僅種下在地居民的健康，也讓野生動物有長長久久的棲息地。",
      postImgPath: "<img src='img/user01_post.jpg' />",
    },
    {
      isRight: "class='community_main_timeline_inverted'",
      communityName: "二手換物",
      communityIconPath: "img/market.png",
      userImgPath: "img/user02.jpg",
      userName: "鞋貓劍客",
      postTimeAgo: "2小時前",
      postContent:
        "周末的市集超好玩！寶寶用不到的東西都清出去了，而且總算見到@王威比本尊，爽拉！",
      postImgPath: "<img src='img/user02_post.jpg' />",
    },
    {
      communityName: "神聖淨山ㄉ力量",
      communityIconPath: "img/mountain.png",
      userImgPath: "img/user04.jpg",
      userName: "吉他啦",
      postTimeAgo: "3小時前",
      postContent: "哥淨的不是山，是靈魂R",
      postImgPath: "<img src='img/user04_post.jpg' />",
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
    },
    {
      communityName: "二手換物",
      communityIconPath: "img/market.png",
      userImgPath: "img/user05.jpg",
      userName: "大安阿基師",
      postTimeAgo: "4小時前",
      postContent: "想要煮好吃的飯飯QQ，有沒有換友有鑄鐵鍋想拿出來交換的呀～",
      postImgPath: "<img src='img/user05_post.jpg' />",
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
    },
    {
      communityName: "種樹社團",
      communityIconPath: "img/sprout.png",
      userImgPath: "img/user06.jpg",
      userName: "甜食怪",
      postTimeAgo: "5小時前",
      postContent: "不是我在說，我家薄荷長得真是頭好壯壯<3",
      postImgPath: "<img src='img/user06_post.jpg' />",
    },
  ];

  const CMpost = document.querySelector(".community_main_ul_timeline");

  CommunityMainFakeData.map((e, index) => {
    CMpost.innerHTML += htmlCommunityMainPost(e);
  });
}
const CommunityMain = new ClsCommunityMain();
