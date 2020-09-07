import { serverURL } from "./api.js";

function ClsCommuntityDetail() {







    //calendar
    const calenderRander = (array) => {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialDate: '2020-06-12',
            editable: true,
            selectable: true,
            businessHours: true,
            dayMaxEvents: true, // allow "more" link when too many events
            events: [{
                title: 'All Day Event',
                start: '2020-06-01'
            },
            {
                title: 'Long Event',
                start: '2020-06-07',
                end: '2020-06-10'
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-06-09T16:00:00'
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-06-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2020-06-11',
                end: '2020-06-13'
            },
            {
                title: 'Meeting',
                start: '2020-06-12T10:30:00',
                end: '2020-06-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2020-06-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2020-06-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2020-06-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2020-06-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2020-06-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2020-06-28'
            }
            ]
        });

        calendar.render();
    }

    //轉換頁面
    const switchPage = function (id) {

        document.querySelectorAll(".GroupDetailPage").forEach(
            (i) => {
                i.classList.add("hide");
            }

        )

        document.querySelector(`#${id}`).classList.remove("hide");
        if (id === "GroupDetailPage_Event") {
            calenderRander();
        }
    }

    //nav bar 轉換
    const switchFocusLink = function (el) {
        document.querySelectorAll(".GroupLink").forEach(
            i => {
                i.children[0].classList.remove("GroupLinkFocus");
                i.children[0].classList.add("a:visited");

            }
        )
        // el.classList.remove("a:visited");
        el.classList.add("GroupLinkFocus");

    }


    let nodeList = document.querySelectorAll(".GroupLink");
    // console.log(nodeList);



    //click 事件綁定兩件事
    nodeList.forEach(
        (i) => {
            i.addEventListener(
                'click', (e) => {
                    let tid = e.currentTarget.getAttribute("value");
                    // console.log(e.currentTarget, tid);
                    switchPage(tid);
                    switchFocusLink(e.currentTarget.children[0]);
                }
            )
        }
    )

    //社團＿活動切換
    let pastEvent = document.getElementById("pastEvent");
    let commingEvent = document.getElementById("commingEvent");

    pastEvent.addEventListener("click", function () {
        // console.log(document.querySelector(".comingEvent"));
        document.querySelector(".comingEvent").classList.add("hide");
        document.querySelector(".pastEvent").classList.remove("hide");
    })

    commingEvent.addEventListener("click", function () {
        document.querySelector(".pastEvent").classList.add("hide");
        document.querySelector(".comingEvent").classList.remove("hide");
    })


    // 成員管理員切換
    let allMemLink = document.querySelector("#allMember");
    let rankingMemLink = document.querySelector("#rankingMember");
    // console.log(allMemLink,rankingMemLink);

    allMemLink.addEventListener("click", function () {
        // console.log(1);
        document.querySelector(".allMember").classList.remove("hide");
        document.querySelector(".rankingMember").classList.add("hide");

    });

    rankingMemLink.addEventListener("click", function () {

        document.querySelector(".allMember").classList.add("hide");
        document.querySelector(".rankingMember").classList.remove("hide");
    });


    //hover
    //社團活動左邊切換

    // function whenMouseOut(event){
    //     event.target.classList.remove("LC");
    //     event.target.classList.add("LO");
    // }


    // console.log(document.querySelectorAll(".LO"));
    document.querySelectorAll(".LO").forEach(
        i => {



            // i.addEventListener("mouseover",function(event){
            //     // console.log(112);

            //     console.log(event.target.classList.remove("LO"));
            //     event.target.classList.add("LC");
            // })

            // i.addEventListener("mouseout",whenMouseOut)

            i.addEventListener("click", function (event) {
                // console.log(i); <<< DOM element


                document.querySelectorAll(".LO").forEach(
                    i => {
                        i.classList.remove("LC");
                    }
                )


                console.log(event.target)
                event.target.classList.add("LC");
                // i.removeEventListener("mouseout",whenMouseOut);

            })




        }
    )








    // *照片牆---------------------------------------------
    //假資料
    let photoFlowData = [{
        id: 1,
        msg: "春吶善後",
        src: "01.jpg"
    },
    {
        id: 1,
        msg: "社員交流",
        src: "02.jpg"
    },
    {
        id: 1,
        msg: "市集",
        src: "03.jpg"
    },
    {
        id: 1,
        msg: "朔溪",
        src: "04.jpg"
    },
    {
        id: 1,
        msg: "嘉南平原",
        src: "05.jpg"
    },
    {
        id: 1,
        msg: "杉林溪",
        src: "06.jpg"
    },
    {
        id: 1,
        msg: "聚餐",
        src: "07.jpg"
    },
    {
        id: 1,
        msg: "談笑風生",
        src: "08.jpg"
    },
    {
        id: 1,
        msg: "彩虹勝利趴",
        src: "09.jpg"
    },
    {
        id: 1,
        msg: "大稻埕煙火",
        src: "10.jpg"
    },
    {
        id: 1,
        msg: "喝酒囉",
        src: "11.jpg"
    },
    {
        id: 1,
        msg: "最後的中餐",
        src: "12.jpg"
    },
    {
        id: 1,
        msg: "中二病",
        src: "13.jpg"
    },
    {
        id: 1,
        msg: "海洋圍觀",
        src: "14.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "01.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "06.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "01.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "02.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "03.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "04.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "02.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "06.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "01.jpg"
    },
    {
        id: 1,
        msg: "哈哈哈",
        src: "02.jpg"
    },
    ]

    //有幾條col
    const myPhotoFlowCols = [
        "photo_flow_col_1",
        "photo_flow_col_2",
        "photo_flow_col_3",
        "photo_flow_col_4",
        "photo_flow_col_5",
    ]



    //文字樣板
    const data2PhotoFlowCard = obj => {
        let result = "";
        result += `<div class="photo_flow_card">
            <img class="photo_flow_card_img" src="./img/community_demo/${obj.src}" alt="">
            <div class="photo_flow_card_wrapper">
            <div class="photo_flow_card_msg">${obj.msg}</div>
            </div>
            </div>`
        return result;
    }

    //判斷哪條col最短
    const whoIsShortest = (array) => {
        let result;
        array.map((e) => {
            if (!result || (document.querySelector(`#${e}`).offsetHeight < result.offsetHeight)) {
                result = document.querySelector(`#${e}`);
            }
        })
        // console.log(result.offsetHeight, result);
        return result;
    }


    const loadingPhotoFlow = async function loop() {
        for (let i = 0; i < photoFlowData.length; i++) {
            await new Promise(resolve => {
                whoIsShortest(myPhotoFlowCols).innerHTML += data2PhotoFlowCard(photoFlowData[i]);
                setTimeout(resolve, 10)
            });
        }
    };

    let isPhotoFlowLoaded = 0;
    document.querySelector("#Group_navlink_Picture").addEventListener(
        "click",
        () => {
            if (!isPhotoFlowLoaded) {
                loadingPhotoFlow();
                isPhotoFlowLoaded = 1;
            }
        }
    )


    //文章發文

    // document.querySelector("LeaveMessage").addEventListener('focus', function () {

    // })



    // -------------------------------------------------
    // 文字樣板




    // ----------------------------------------------Ajax----------------------------------------------------//
    //開啟特定社團頁面(社團id)
    const renderPage = async (id) => {
        try {

            let response = await fetch(serverURL.community + id, {
                method: "GET", // http request method
                headers: {           // *攜帶 http request headers 
                    "Content-Type": "application/json",
                    // "Authorization": localStorage.getItem("Cycle link token"),  // *這個屬性帶 JWT
                },
                // 以下跟身分認證有關，後端要使用session 要帶這幾項
                cache: "no-cache",
                credentials: "include",
            });
            let result = await response.json();
            // //for debug
            // console.log("%c +++++++++++++", "color: green");
            // console.log(result);
            // console.log(result.data[0].fImgPath);
            if (!result.result) {
                //# >>> 前端路由導向
                window.location.hash = "#community";
                return;
            }


            // TODO 
            document.querySelector("#CommunityPic").src = result.data[0].fImgPath;
            document.querySelector("#CommunityName").innerHTML = result.data[0].fName;
            document.querySelector("#CommunityNumberOfPeople").innerHTML = result.data[0].totalNumber;
            document.querySelector("#CommunityStatus").innerHTML = result.data[0].fSatusName;
            document.querySelector("#CommunityAboutUs").innerHTML = result.data[0].fInfo;



        }
        catch (err) {
            console.log(err);
        }

    }


    const renderPageMember = async (id) => {
        try {
            let response = await fetch(serverURL.communityManager + id, {
                method: "GET", // http request method
                headers: {
                    // http headers
                    "Content-Type": "application/json", // 請求的資料類型
                },
                // 以下跟身分認證有關，後端要使用session 要帶這幾項
                cache: "no-cache",
                credentials: "include",
            });

            let result = await response.json();
            document.querySelector("#CommunityManager").innerHTML = result.data[0].fName;



        }
        catch (err) {


            console.log(err);
        }

    }


    //this 指的是 ClsCommuntityDetail
    this.renderMainCommunityInfo = renderPage;
    this.renderMemberListInfo = renderPageMember;

}
const CommuntityDetail = new ClsCommuntityDetail();

//* 利用 hash , 如下
// * -------------------------------- hash -------------------------------- //
const communityDetailChangeHash = () => {

    //Window物件方法偵測URL改變 執行rederPage function
    let actDetailArr = window.location.hash.split('/');   // #community/detail/3  -> [ #community, detail, 3 ]
    let actDetailId = actDetailArr[2];
    if (location.hash.includes("#community/detail/")) {
        CommuntityDetail.renderMainCommunityInfo(actDetailId);
        CommuntityDetail.renderMemberListInfo(actDetailId);


    }
}

window.addEventListener("hashchange", communityDetailChangeHash);
window.addEventListener("load", communityDetailChangeHash);



