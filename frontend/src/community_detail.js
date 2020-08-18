function ClsCommuntityDetail() {


    const switchPage = function (id) {

        document.querySelectorAll(".GroupDetailPage").forEach(
            (i) => {
                i.classList.add("hide");
            }

        )

        document.querySelector(`#${id}`).classList.remove("hide");
    }







    let nodeList = document.querySelectorAll(".GroupLink");
    // console.log(nodeList);

    nodeList.forEach(
        (i) => {
            i.addEventListener(
                'click', (e) => {
                    let tid = e.currentTarget.getAttribute("value");
                    // console.log(e.currentTarget, tid);
                    switchPage(tid);
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


    //成員管理員切換
    let allMemLink = document.getElementById("allMember");
    let rankingMemLink = document.getElementById("rankingMember");

    allMemLink.addEventListener("click",function(){
        // document.querySelector(".rankingMember").classList.add("hide");
    })











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







}
const CommuntityDetail = new ClsCommuntityDetail();