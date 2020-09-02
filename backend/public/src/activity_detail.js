import {
    serverURL
} from "./api.js"


//用class包起來

function ClsActivityDetail() {

    // ajax
    const actDetail = async () => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.actDetail);
            // 用變數接 fetch結果的資料內容， 要用await等。
            let result = await response.json();
            console.log("actDetail await");
            console.log(result);
            // *用 result  do something ...

        } catch (err) {
            console.log(err);
            // 錯誤處理
        }
    }
    actDetail()

    const actDetailTag = async () => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.actDetailTag);
            // 用變數接 fetch結果的資料內容， 要用await等。
            let result = await response.json();
            console.log("actDetailTag await");
            console.log(result);
            // *用 result  do something ...

        } catch (err) {
            console.log(err);
            // 錯誤處理
        }
    }
    actDetailTag()




    // -------------- 固定右側資訊 --------------
    function boxMove2(y) {
        // console.log(y);
        box = document.querySelector('.activity_detail_right')
        box.style.marginTop = `${y}px`;
    }
    var last_known_scroll_position = 0;
    var ticking = false;



    window.addEventListener('scroll', function (e) {
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



    // * -------------- 留言區 ------------- //
    //ONMOUSEOVER
    //get the btn element by id 
    let btnMessage = document.querySelector("#btnMessage");
    btnMessage.addEventListener("mouseout", getClsChangeback);

    function getClsChangeback() {
        btnMessage.className = "massageTopButton";
    }

    //留言按鈕ONCLICK
    //btn element binding with click 
    btnMessage.addEventListener("click", showMessagebox);




    function showMessagebox() {
        //change the btn background
        getClsChangeback();

        //get the div "id="messageInputBox" and keep putting in innerHtml
        //怎麼重複利用訪者留言與插入>>createlement

        //這是要放進去的div
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

        //     btnSent.addEventListener("mouseover", btnSentClsChange);
        //     btnSent.addEventListener("mouseout", btnSentClsChangeBack);

        //     function btnSentClsChange() {
        //         btnSent.className = "btnMessageSent2";
        //     }

        //     function btnSentClsChangeBack() {
        //         btnSent.className = "btnMessageSent";
        //     }
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
            massageInputDiv.innerHTML = document.querySelector(".messageInputBox").value;
            invisibleDiv.appendChild(massageInputDiv);
            //加入class
            massageInputDiv.classList.add("inputAft");
            //刪除input tag(會再新增留言加進去以免被複寫)
            document.querySelector('.divForInput').remove();

            //!!把divForInput innderHtml置換成 留言<div>
            //!!!!!!!!!divForInput會抓到上一個留言的divForInput
            // document.querySelector(".divForInput").innerHTML=`<div class="inputAft">${inputMassage}</div>`;


            window.alert("留言成功！");
        }
    }


    // * -------------------------------- 文字樣板 ----------------------------------------
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

    }

    const ActCard = document.querySelector("#activity_detail_see");

    //AJAX
    let ActCardData = [{
            imgPath: "img/event6.png",
            date: "2020/09/15",
            title: "世界環境清潔日 - 相約海洋淨灘",
            count: 100,
            member: "王曉明",
            local: "新金山海灘"
        },
        {
            imgPath: "img/event3.jpg",
            date: "2020/09/26",
            title: "魚取漁囚 - 守護海洋行動體驗特展",
            count: 99,
            member: "洲仔於",
            local: "布袋漁港"
        },
        {
            imgPath: "img/event7.jpg",
            date: "2020/09/06",
            title: "臉部平權運動臺北國道馬拉松",
            count: 500,
            member: "時間管理大師",
            local: "中山高速公路五股 - 汐止高架段"
        }
    ]


    ActCardData.map(
        (e, index) => {
            ActCard.innerHTML += this.htmlActCard(e);
        }
    )
    //---------------top_發起人-------------------

    const activity_detail_initiatorbox = document.querySelector(".activity_detail_initiatorbox")
    let activity_detail_initiatorData = {
        fId: 1,
        fPhotoPath: "./img/c1.jpeg",
        fName: "蘇菲唐納"
    }

    const activity_detail_initiatorCard = (o) => {

        return ` 
            <div class="activity_detail_info_img_circle" onclick="location.hash='#personal-page/${o.fId}'">
                <div class="activity_detail_info_img_div">
                    <img src=${o.fPhotoPath} class="activity_detail_info_img">
                </div>
            </div>
            <div class="activity_detail_info_name">
                <p class="activity_detail_info_name_H">Hosted By</p>
                <div class=" activity_detail_flex">
                    <a href="#">${o.fName}</a>
                    <img src="./img/tick.svg" alt="tickIcon" class="activity_detail_info_status">
                </div>
            </div>`;
    }
    activity_detail_initiatorbox.innerHTML += activity_detail_initiatorCard(activity_detail_initiatorData);


    //---------------------活動匯入---------------------

    const activity_detail_AllData = {
        fActName: '2020 國家地理路跑 - 世界地球日 50 週年',
        //h2
        fImgPath: 'img/event12.jpg',
        // fLabelName:["路跑","#2020","#國家地理","#就差你一個"]   需要更改!!!!!
        content: `  (Chinese level requirement: A1 level up)
            <br>
            Taiwanese love singing karaoke so much. KTV in Taiwan is a night out that you won’t
            want
            to
            miss!
            Everyone should try it at least once.
            <br>
            Come to this workshop, you can learn sentences and popular words commonly spoken,
            then
            integrate
            into Taiwanese life!
            <br>
            <br>
            📆 Date: 28 August<br>
            🕘 Time: 19:30-21:30 on Friday<br>
            📍Location: ShuoHao Language Center<br>
            💁🏻‍♀‍ 4 people for the minimum<br>
            💲Tuition fee: 400 NTD. (Pay the tuition in advance.)<br>
            <br>
            Application here ：https://forms.gle/JWHYuZvY17LGvNxH9
            <br>
            Location: 台北市大安區復興南路二段 82 號<br>
            8F., No. 82, Sec. 2, Fuxing S. Rd., Da’an Dist., Taipei City 106, Taiwan (R.O.C.)
            <br>
            <br>
            Phone:[masked]<br>
            FB: https://www.facebook.com/SHLanguageCenter/<br>
            Time: 19:30-21:30pm (2hrs)
            <br>
            <br>
            主辦單位保有隨時修改及終止本活動之權利。於所辦任何活動上所拍攝之照片影片均有權永久使用於主辦單位之所有活動頁面及網頁。
            When attending this event organizers reserve the right to refuse service to anyone
            for
            any
            reason
            and to take and use photos or videos for an unlimited period of time.`,

    }

    document.querySelector(".activity_detail_titlebox h2").innerHTML = activity_detail_AllData.fActName;
    document.querySelector(".activity_detail_leftImg").src = activity_detail_AllData.fImgPath;
    document.querySelector(".activity_detail_text_detail").innerHTML = activity_detail_AllData.content;
    document.querySelector(".activity_detail_bigTag a").innerHTML = activity_detail_AllData.fLabelName[0];




    // activity_detail_Tag(activity_detail_AllData.fLabelName)
    // document.querySelector(".activity_detail_TagBox").innerHTML=activity_detail_Tag(activity_detail_AllData)













    // --------------- 分享功能 ---------------

    var ac_share_btn = document.getElementById("ac_share_btn");
    var ac_share_bg = document.getElementById("ac_share_bg");
    var ac_share_bg_div = document.getElementById("ac_share_bg_div");
    var ac_share_closeBtn = document.getElementById("ac_share_closeBtn");

    ac_share_btn.onclick = function () {
        ac_share_bg.style.display = 'block';
        ac_share_bg_div.style.display = 'block';
    }

    ac_share_closeBtn.onclick = function () {
        ac_share_bg.style.display = 'none';
        ac_share_bg_div.style.display = 'none';
        ac_share_bg.preventDefault();
    }




    //     window.onload = function () {
    //         var accc_zhezhao = document.getElementById("accc_zhezhao");
    //         var accc_login = document.getElementById("accc_login");
    //         var accc_bt = document.getElementById("accc_bt");
    //         var accc_btclose = document.getElementById("accc_btclose");

    //         accc_bt.onclick = function () {
    //             accc_zhezhao.style.display = "block";
    //             accc_login.style.display = "block";
    //         }
    //         accc_btclose.onclick = function () {
    //             accc_zhezhao.style.display = "none";
    //             accc_login.style.display = "none";
    //         }
    //     }


}
const ActivityDetail = new ClsActivityDetail();

// function ActivityChangeStatus() {
//     //  if 以登入 執行下列
//     let btn = document.getElementById("rightPartTop_button");
//     btn.disabled = true;
//     btn.style.backgroundColor = "#979494";
//     btn.style.color = "#D9AAB7";
//     btn.innerHTML = "審核中";

//     //else{加入會員}
// }