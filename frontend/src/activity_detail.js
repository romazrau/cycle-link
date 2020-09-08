import { serverURL } from "./api.js";

//用class包起來

function ClsActivityDetail() {
  // * -------------- 固定右側資訊 -------------- //
  function boxMove2(y) {
    // console.log(y);
    box = document.querySelector(".activity_detail_right");
    box.style.marginTop = `${y}px`;
  }
  var last_known_scroll_position = 0;
  var ticking = false;

  window.addEventListener("scroll", function (e) {
    last_known_scroll_position = window.scrollY - 150;
    if (window.scrollY > 150) {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          boxMove2(last_known_scroll_position);
          ticking = false;
        });
      }
      ticking = true;
    }
  });

  // * ********************************** 文字樣板 ********************************** //

  const activity_detail_initiatorbox = document.querySelector(
    ".activity_detail_titlebox"
  );
  const activity_detail_leftImg = document.querySelector(
    ".activity_detail_text_left_img"
  );
  const activity_detail_text_detail = document.querySelector(
    ".activity_detail_text_detail"
  );
  const activity_detail_bigTag = document.querySelector(
    ".activity_detail_bigTag"
  );
  const activity_detail_TagBox = document.querySelector(
    ".activity_detail_TagBox"
  );
  const actDetailRightInfo = document.querySelector(
    ".activity_detail_right_info"
  );
  const activity_detail_participant_All = document.querySelector(
    ".activity_detail_participant_flex"
  );
  const activity_detail_participant_count = document.querySelector(
    "#activity_detail_participant_count"
  );
  const actDetailSocieties = document.querySelector(
    ".activity_detail_Societies"
  );

  // * ---------------- 發起人 文字樣板 ---------------- //

  const activity_detail_initiatorCard = (o) => {
    return ` 
            <h2>${o.fActName}</h2>
        <div class="activity_detail_info">
        <div class="activity_detail_initiatorbox activity_detail_flex">
            <div class="activity_detail_info_img_circle" onclick="location.hash='#personal-page/${o.fMemberId}'">
                <div class="activity_detail_info_img_div">
                    <img src=${o.fPhotoPath} class="activity_detail_info_img">
                </div>
            </div>
            <div class="activity_detail_info_name">
                <p class="activity_detail_info_name_H">Hosted By</p>
                <div class=" activity_detail_flex">
                    <a href="#personal-page/${o.fMemberId}">${o.MemberName}</a>
                    <img src="./img/tick.svg" alt="tickIcon" class="activity_detail_info_status">
                </div>
            </div>
        </div>
        </div>`;
  };

  // * ---------------- 活動內容 文字樣板 ---------------- //

  const actDetail_img = (o) => {
    return `
        <img class="activity_detail_leftImg" src=${o.fImgPath} alt="">
        `;
  };

  const actDetail_textDetail = (o) => {
    return `
        <p>${o.fIntroduction}</p>
        `;
  };

  // * ---------------- 活動分類 文字樣板 ---------------- //

  const actDetail_bigTag = (o) => {
    return `
        <a href="#">${o.ActCategory}</a>
        `;
  };

  // * ---------------- 活動標籤 文字樣板 ---------------- //

  const activity_detail_tag = (o) => {
    return `<div class="activity_detail_tag">
                    <a href="#">${o.fLabelName}</a>
                </div>`;
  };
  // * ---------------- 活動參與者數量 文字樣板 ---------------- //

  const actDetail_participant_count = (o) => {
    return `<h5 id="activity_detail_participant_count">活動參與者(${o.JoinCount})</h5>
        <a href="#">See All</a>
        `;
  };

  // * ---------------- 活動參與者 文字樣板 ---------------- //

  const activity_detail_participant = (o) => {
    return `<div class="activity_detail_participant" onclick="location.hash='#personal-page/${o.fMemberId}'">
    <div class="activity_detail_info_img_circle">
        <div class="activity_detail_info_img_div">
            <img src=${o.fPhotoPath} class="activity_detail_info_img">
        </div>
    </div>
    <p>${o.fName}</p>
    <span>Member</span>
</div>`;
  };

  // * ---------------- 活動隸屬社團 文字樣板 ---------------- //

  const actDetailSocietiesALL = (o) => {
    return `<a href="#community/detail/${o.fCommunityId}" class="activity_detail_Societies_a">
                <div class="activity_detail_Societies_img_circle" style="margin-left: 1rem;">
                    <div class="activity_detail_Societies_img_div">
                        <img src=${o.CommuntyImgPath} class="activity_detail_Societies_img">
                    </div>
                </div>
                <div class="activity_detail_Societies_info">
                    <p>${o.CommuntyName}</p>
                    <p>see more events</p>
                </div>
                <img src="img/right.svg" alt="" width="20vw">
                </a>`;
  };

  // * ---------------- 活動右側內容 文字樣板 ---------------- //

  const actDetailRightInfoALL = (o) => {
    return `
    <div>
        <img src="img/860755.svg" alt="" class="activity_detail_right_icon">
        <p>${o.fActivityDate}<br>${o.fActivityEndDate}</p>
    </div>
    <div>
        <img src="img/929497.svg" alt="" class="activity_detail_right_icon">
        <p>${o.fActLocation}</p>
    </div>
    <div>
        <img src="img/certificate-solid.svg" alt="" class="activity_detail_right_icon">
         <p>${o.ActStatus}</p>
    </div>
    <div>
         <img src="img/coin.png" alt="" class="activity_detail_right_icon">
         <p>${o.fPayCoin}</p>
    </div>
    <div class="activity_detail_right_map">
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.8021294706664!2d121.53890655092397!3d25.074694842733358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac0099201ca3%3A0xe5164eddb6bbeab1!2z5aSn5L2z5rKz5r-x5YWs5ZyS!5e0!3m2!1szh-TW!2stw!4v1598202965298!5m2!1szh-TW!2stw"
        width="100%" height="250" frameborder="0" style="border:0;"
        allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    </div>
    <p>x:${o.fCoordinateX}</p>
    <p>y:${o.fCoordinateY}</p>
    `;
  };

  // * ---------------- 文字樣板 資料匯入 ---------------- //

  const display_actDetail = (o) => {
    actDetailSocieties.innerHTML = "";

    o.map((e, index) => {
      activity_detail_initiatorbox.innerHTML = activity_detail_initiatorCard(e);
      activity_detail_leftImg.innerHTML = actDetail_img(e);
      activity_detail_text_detail.innerHTML = actDetail_textDetail(e);
      activity_detail_bigTag.innerHTML = actDetail_bigTag(e);
      actDetailRightInfo.innerHTML = actDetailRightInfoALL(e);

      if (e.CommuntyName !== null) {
        actDetailSocieties.innerHTML = actDetailSocietiesALL(e);
        actDetailSocieties.style.display = "flex";
      } else {
        actDetailSocieties.style.display = "none";
      }
    });
  };

  const display_actDetailTag = (o) => {
    activity_detail_TagBox.innerHTML = "";
    o.map((e, index) => {
      activity_detail_TagBox.innerHTML += activity_detail_tag(e);
    });
  };

  const display_actDetailJoin = (o) => {
    activity_detail_participant_All.innerHTML = "";
    o.map((e, index) => {
      activity_detail_participant_All.innerHTML += activity_detail_participant(
        e
      );
    });
  };

  const display_actDetailJoinCount = (o) => {
    activity_detail_participant_count.innerHTML = "";
    o.map((e, index) => {
      activity_detail_participant_count.innerHTML = actDetail_participant_count(
        e
      );
    });
  };

  // * ---------------- actDetail ajax ---------------- //

  const actDetail = async (id) => {
    try {
      // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
      // *用變數接 fetch 結果 ，要用await等。
      let response = await fetch(serverURL.actDetail + id, {
        method: "GET", // http request method
        headers: {
          // http headers
          "Content-Type": "application/json", // 請求的資料類型
        },
        // 以下跟身分認證有關，後端要使用session 要帶這幾項
        cache: "no-cache",
        credentials: "include",
      });
      // 用變數接 fetch結果的資料內容， 要用await等。
      let result = await response.json();
      // console.log("actDetail await");
      // console.log(result);
      // *用 result  do something ...
      // console.log(result.data);
      display_actDetail(result.data.detail);
      display_actDetailTag(result.data.tag);
      display_actDetailJoin(result.data.join);
      display_actDetailJoinCount(result.data.joinCount);
    } catch (err) {
      console.log(err);
      // 錯誤處理
    }
  };

  //  TODO: -------------------------------- 為您推薦 文字樣板 -------------------------------- //
  this.htmlActCard = (o) => {
    return ` 
    <div class="active_card_container">
        <div class="active_card" >
            <i class="fas fa-heart fa-lg active_card_heart"></i>
            <div class="active_card_div">
                <img src="${o.imgPath}" alt="" class="active_card_img">
            </div>
            <div class="active_card_info">
                <p>${o.date}</p>
                <p class="active_card_title">${o.title}</p>
                <div class="active_card_location_div">
                    <img src="img/929497.svg" class="active_card_location">
                    <p>${o.local}</p>
                </div>
            </div>
        </div>
    </div>`;
  };

  const ActCard = document.querySelector("#activity_detail_see");

  let ActCardData = [
    {
      imgPath: "img/event6.png",
      date: "2020/09/15",
      title: "世界環境清潔日 - 相約海洋淨灘",
      count: 100,
      member: "王曉明",
      local: "新金山海灘",
    },
    {
      imgPath: "img/event3.jpg",
      date: "2020/09/26",
      title: "魚取漁囚 - 守護海洋行動體驗特展",
      count: 99,
      member: "洲仔於",
      local: "布袋漁港",
    },
    {
      imgPath: "img/event7.jpg",
      date: "2020/09/06",
      title: "臉部平權運動臺北國道馬拉松",
      count: 500,
      member: "時間管理大師",
      local: "中山高速公路五股 - 汐止高架段",
    },
  ];

  ActCardData.map((e, index) => {
    ActCard.innerHTML += this.htmlActCard(e);
  });

  // * -------------------------------- 留言區 -------------------------------- //
  //get the btn element by id
  let btnMessage = document.querySelector("#btnMessage");
  // btnMessage.addEventListener("mouseout", getClsChangeback);

  function getClsChangeback() {
    btnMessage.className = "massageTopButton";
  }

  //留言按鈕ONCLICK
  //btn element binding with click
  btnMessage.addEventListener("click", showMessagebox);

  function showMessagebox() {
    getClsChangeback();
    let invisibleDiv = document.querySelector("#messageInputBoxCon");

    //createElement 訪者留言
    //創一個div
    let divOfMassage = document.createElement("div");
    divOfMassage.innerHTML =
      " <div class='lineInContainer'></div>\
                <div class='massageBottomTop activity_detail_flex'>\
                <div class='massageBottomImgDefault'>\
                <img src='' alt=''>\
                </div>\
                <div class='massageBottomTopUser'>訪客</div>\
                <div class='verticalBar'></div>\
                <div class='massageBottomTopDate'>July 12</div>\
                </div>\
                <div class='divForInput'><input class='messageInputBox' id='messageInputBox' type='text'><br><button  id='btnMessageSent' class='btnMessageSent' type='button'>確定</button></div>";

    invisibleDiv.appendChild(divOfMassage);
    //這是留言方格
    document.querySelector("#messageInputBox").focus();
    getBtnSentChange();
    //call確認按鈕做事件綁定（包含把留言顯示）
    sentMassage();
  }

  //留言確定按鈕ONCLICK MOUSEOVER MOUSEOUT
  function getBtnSentChange() {
    let btnSent = document.querySelector("#btnMessageSent");
  }
  //確認按鈕做事件綁定
  function sentMassage() {
    //這是留言方格
    let invisibleDiv = document.querySelector("#messageInputBoxCon");
    //新增一個div
    let massageInputDiv = document.createElement("div");
    //這是確認按鈕
    let btnSent = document.querySelector("#btnMessageSent");
    btnSent.addEventListener("click", putMassageOn);

    //把訊息顯示在留言框
    function putMassageOn() {
      //把留言放入div
      massageInputDiv.innerHTML = document.querySelector(
        ".messageInputBox"
      ).value;
      invisibleDiv.appendChild(massageInputDiv);
      //加入class
      massageInputDiv.classList.add("inputAft");
      //刪除input tag(會再新增留言加進去以免被複寫)
      document.querySelector(".divForInput").remove();
      window.alert("留言成功！");
    }
  }

  // * -------------------------------- 分享功能 -------------------------------- //

  var ac_share_btn = document.getElementById("ac_share_btn");
  var ac_share_bg = document.getElementById("ac_share_bg");
  var ac_share_bg_div = document.getElementById("ac_share_bg_div");
  var ac_share_closeBtn = document.getElementById("ac_share_closeBtn");

  ac_share_btn.onclick = function () {
    ac_share_bg.style.display = "block";
    ac_share_bg_div.style.display = "block";
  };

  ac_share_closeBtn.onclick = function () {
    ac_share_bg.style.display = "none";
    ac_share_bg_div.style.display = "none";
    ac_share_bg.preventDefault();
  };
  this.actDetail = actDetail;
}
const ActivityDetail = new ClsActivityDetail();

//? src api actDetail: `${rootURL}/activityDetail/1`, 有給 1 才跑出資料, 如何不輸入 1 叫出 1 ???
//* 利用 hash , 如下

// * -------------------------------- hash -------------------------------- //

const actDetailChangeHash = () => {
  let actDetailArr = location.hash.split("/");
  let actDetailId = actDetailArr[2];
  if (location.hash.includes("#activity/detail")) {
    ActivityDetail.actDetail(actDetailId);
  }
};

window.addEventListener("hashchange", actDetailChangeHash);
window.addEventListener("load", actDetailChangeHash);
