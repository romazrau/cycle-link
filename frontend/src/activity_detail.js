//用class包起來

function ClsActivityDetail() {
    // 有binding到  
    function getRightPartInSync() {

        let getWinOffSet = window.pageYOffset;

        let RightPart = document.getElementById("rightPart");
        let leftPart = document.querySelector('.leftPart');
        //  有抓到element

        //  console.log(typeof(getWinOffSet));

        let leftPartTop = leftPart.offsetTop;
        // console.log(leftPartTop);



        // 用css
        if (getWinOffSet >= leftPartTop) {
            RightPart.style.marginTop = `${getWinOffSet - leftPartTop}px`;
        }

        //TODO 錯誤發生 滾動太快！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！  

    }

    //正常寫法
    // window.addEventListener("scroll", 
    //   function(){
    //     getRightPartInSync(window.pageYOffset)
    //   }
    // );
    var last_known_scroll_position = 0;




    window.addEventListener('scroll', function (e) {
        window.requestAnimationFrame(
            getRightPartInSync
        );
    });


    //GOOGLE map//
    function myMap() {
        var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }




    // 留言//
    //ONMOUSEOVER
    //get the btn element by id 
    let btnMessage = document.querySelector("#btnMessage");

    //binding it with onmouseover event
    btnMessage.addEventListener("mouseover", getClsChange);
    //there are two css class massageTopButton and massageTopButton2
    btnMessage.addEventListener("mouseout", getClsChangeback);

    function getClsChange() {
        btnMessage.className = "massageTopButton2";
    }

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
        divOfMassage.innerHTML = " <div class='lineInContainer'></div>\
  <div class='massageBottomTop flex-container'>\
  <div class='DivForImg'>\
  <img src='' alt=''>\
  <div class='massageBottomImgDefault'>\
  </div>\
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

        btnSent.addEventListener("mouseover", btnSentClsChange);
        btnSent.addEventListener("mouseout", btnSentClsChangeBack);

        function btnSentClsChange() {
            btnSent.className = "btnMessageSent2";
        }

        function btnSentClsChangeBack() {
            btnSent.className = "btnMessageSent";
        }
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


    const data2html = (o) => {
        return `
    <div class="card cardMargin">
        <div class="divForCardImg">
            <img src=${o.imgPath} alt="diving">
        </div>
        <div class="cardTime">${o.time}</div>
        <div class="cardActName">${o.name}</div>
        <div class="cardBottomIcons flex-container">
            <div>
                <img src="./img/loveicon.svg" alt="loveicon" width="15px">
            </div>
            <div>${o.like}</div>
            <div>
                <img src="./img/coin.png" alt="coinicon" width="15px">
            </div>
            <div>${o.coins}</div>
        </div>
        <div class="cardBottomIcons flex-container">
            <div>
                <img src="./img/coin.png" alt="coinicon" width="15px">
            </div>
            <div>${o.member}</div>
            <div>
                <img src="./img/coin.png" alt="coinicon" width="15px">
            </div>
            <div>${o.local}</div>
        </div>
    </div>
        `;
    }



    let fakedata1 = [{
            imgPath: "./img/diving.jpeg",
            time: "2020/12/24",
            name: "潛水撿垃圾",
            like: 30,
            coins: 100,
            member:"彌勒佛",
            local:"烏石港"
        },
        {
            imgPath: "./img/diving.jpeg",
            time: "2020/12/24",
            name: "潛水撿垃圾",
            like: 30,
            coins: 100,
            member:"彌勒佛",
            local:"烏石港"
        },
        {
            imgPath: "./img/diving.jpeg",
            time: "2020/12/24",
            name: "潛水撿垃圾",
            like: 30,
            coins: 100,
            member:"彌勒佛",
            local:"烏石港"
        },
        {
            imgPath: "./img/diving.jpeg",
            time: "2020/12/24",
            name: "潛水撿垃圾",
            like: 30,
            coins: 100,
            member:"彌勒佛",
            local:"烏石港"
        },
    ];


    let fakedata2 = [{
            imgPath: "./img/diving.jpeg",
            time: "2020/12/24",
            name: "潛水撿垃圾",
            like: 30,
            coins: 100,
            member:"彌勒佛",
            local:"烏石港"
        },
        {
            imgPath: "./img/diving.jpeg",
            time: "2020/12/24",
            name: "潛水撿垃圾",
            like: 30,
            coins: 100,
            member:"彌勒佛",
            local:"烏石港"
        },
        {
            imgPath: "./img/diving.jpeg",
            time: "2020/12/24",
            name: "潛水撿垃圾",
            like: 30,
            coins: 100,
            member:"彌勒佛",
            local:"烏石港"
        },
        {
            imgPath: "./img/diving.jpeg",
            time: "2020/12/24",
            name: "潛水撿垃圾",
            like: 30,
            coins: 100,
            member:"彌勒佛",
            local:"烏石港"
        },
    ];

    let fakedata3 = [{
        imgPath: "./img/diving.jpeg",
        time: "2020/12/24",
        name: "潛水撿垃圾",
        like: 30,
        coins: 100,
        member:"彌勒佛",
        local:"烏石港"
    },
    {
        imgPath: "./img/diving.jpeg",
        time: "2020/12/24",
        name: "潛水撿垃圾",
        like: 30,
        coins: 100,
        member:"彌勒佛",
        local:"烏石港"
    },
    {
        imgPath: "./img/diving.jpeg",
        time: "2020/12/24",
        name: "潛水撿垃圾",
        like: 30,
        coins: 100,
        member:"彌勒佛",
        local:"烏石港"
    },
    {
        imgPath: "./img/diving.jpeg",
        time: "2020/12/24",
        name: "潛水撿垃圾",
        like: 30,
        coins: 100,
        member:"彌勒佛",
        local:"烏石港"
    },
];



    const fakeDataContainerRow1 = document.querySelector("#activity-detail-row-1");
    const fakeDataContainerRow2 = document.querySelector("#activity-detail-row-2");
    const fakeDataContainerRow3 = document.querySelector("#activity-detail-row-3");



    // fakedata1.map(
    //     (e, index) => {
    //         fakeDataContainerRow1.innerHTML += data2html(e)
    //     })
    fakedata2.map(
        (e, index) => {
            fakeDataContainerRow2.innerHTML += data2html(e)
        })
    fakedata3.map(
        (e, index) => {
            fakeDataContainerRow3.innerHTML += data2html(e)
        })



}
const ActivityDetail = new ClsActivityDetail();