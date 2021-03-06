// import {
//     serverURL
// } from "./api.js";

//用class包起來

function ClsActivityDetail() {


    function actMap(x, y) {
        var map = L.map('actmapid')
        var marker = L.marker([x, y]).addTo(map);
        map.setView(new L.LatLng(x, y), 16);
        var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osm = new L.TileLayer(osmUrl, {
            minZoom: 8,
            maxZoom: 20
        });
        map.addLayer(osm);

    }

    function actMapEdit(x, y) {
        var map = L.map('actMapEdit')
        var marker = L.marker([x, y]).addTo(map);
        map.setView(new L.LatLng(x, y), 16);
        var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osm = new L.TileLayer(osmUrl, {
            minZoom: 8,
            maxZoom: 20
        });
        map.addLayer(osm);
    }

    // * -------------- 固定右側資訊 -------------- //
    window.onscroll=function(){
        // console.log(window.pageYOffset);
        if(window.pageYOffset>100)
        document.querySelector(".activity_detail_right").setAttribute("style","margin-top:-12rem")
        else
        document.querySelector(".activity_detail_right").setAttribute("style","margin-top:1.5rem")

    }

    // * ********************************** [ START ] 文字樣板 [ START ] ********************************** //

    const activity_detail_initiatorbox = document.querySelector(".activity_detail_titlebox");
    const activity_detail_leftImg = document.querySelector(".activity_detail_text_left_img");
    const activity_detail_text_detail = document.querySelector(".activity_detail_text_detail");
    const activity_detail_bigTag = document.querySelector(".activity_detail_bigTag");
    const activity_detail_TagBox = document.querySelector(".activity_detail_TagBox");
    const actDetailRightInfo = document.querySelector(".activity_detail_right_info");
    const activity_detail_participant_All = document.querySelector(".activity_detail_participant_flex");
    const activity_detail_participant_count = document.querySelector("#activity_detail_participant_count");
    const actDetailSocieties = document.querySelector(".activity_detail_Societies");
    const activity_detail_Edit_tag = document.querySelector("#act5Tag")

    // * ---------------- 發起人 文字樣板 ---------------- //

    const activity_detail_initiatorCard = (o) => {
        return ` 
            <h2>${o.fActName}</h2>
        <div class="activity_detail_info">
        <div class="activity_detail_initiatorbox activity_detail_flex">
            <div class="activity_detail_info_img_circle" onclick="location.hash='#personal-page/${o.fMemberId}'">
                <div class="activity_detail_info_img_div">
                    <img src='http://localhost:3050/${o.fPhotoPath}' class="activity_detail_info_img">
                </div>
            </div>
            <div class="activity_detail_info_name">
                <p class="activity_detail_info_name_H">發起者</p>
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
        <img class="activity_detail_leftImg" src='http://localhost:3050/${o.fImgPath}' alt="">
        `;
    };

    const actDetail_textDetail = (o) => {
        return `
        <pre>${o.fIntroduction}</pre>
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
                    <a href="#" class="activityTag">${o.fLabelName}</a>
                </div>`;
    };
    // * ---------------- 活動參與者數量 文字樣板 ---------------- //

    const actDetail_participant_count = (o) => {
        return `<h5 id="activity_detail_participant_count" style="font-size:1.8rem;">活動參與者(${o})</h5>
                <a href="#">See All</a>
                `;
    };

    // * ---------------- 活動參與者 文字樣板 ---------------- //


    const activity_detail_participant = (o) => {
        return `<div class="activity_detail_participant" onclick="location.hash='#personal-page/${o.fMemberId}'">
                    <div class="activity_detail_info_img_circle">
                        <div class="activity_detail_info_img_div">
                            <img src='http://localhost:3050/${o.fPhotoPath}' class="activity_detail_info_img">
                        </div>
                    </div>
                    <p>${o.fName}</p>
                    <span>Member</span>
                </div>`;
    };
    // --- 參與者匯入 --- //
    const display_actDetailJoin = (o) => {
        activity_detail_participant_All.innerHTML = "";
        o.map(
            (e, index) => {
                activity_detail_participant_All.innerHTML += activity_detail_participant(e);

            }
        )
    }

    // * ---------------- 活動隸屬社團 文字樣板 ---------------- //

    const actDetailSocietiesALL = (o) => {
        return `<h5 style="margin-top: 5rem;margin-bottom:1.5rem;font-size:1.8rem;">活動所屬社團</h5>
                <div class="activity_detail_Societies2">
                <a href="#community/detail/${o.fCommunityId}" class="activity_detail_Societies_a">
                <div class="activity_detail_Societies_img_circle" style="margin-left: 1rem;">
                    <div class="activity_detail_Societies_img_div">
                        <img src='http://localhost:3050/${o.CommuntyImgPath}' class="activity_detail_Societies_img">
                    </div>
                </div>
                <div class="activity_detail_Societies_info">
                    <p>${o.CommuntyName}</p>
                    <p>see more events</p>
                </div>
                <img src="img/right.svg" alt="" width="20vw">
                </a>
                </div>`;
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
    <div class="activity_detail_right_map" id="actmapid">
    </div>
    `
    }

    // * ---------------- 文字樣板 [ 資料匯入 ] ---------------- //
    const display_actDetail = (o) => {
        actDetailSocieties.innerHTML = "";

        o.map(
            (e, index) => {
                activity_detail_initiatorbox.innerHTML = activity_detail_initiatorCard(e);
                activity_detail_leftImg.innerHTML = actDetail_img(e);
                activity_detail_text_detail.innerHTML = actDetail_textDetail(e);
                activity_detail_bigTag.innerHTML = actDetail_bigTag(e);
                actDetailRightInfo.innerHTML = actDetailRightInfoALL(e);
                actMap(e.fCoordinateX, e.fCoordinateY);
                // console.log(e.fCoordinateX)

                if (e.CommuntyName !== null) {
                    actDetailSocieties.innerHTML = actDetailSocietiesALL(e);
                    actDetailSocieties.style.display = "block";
                } else {
                    actDetailSocieties.style.display = "none";
                }

            }
        )
    }

    // --- 標籤匯入 --- //
    const display_actDetailTag = (o) => {
        activity_detail_TagBox.innerHTML = "";
        o.map(
            (e, index) => {
                activity_detail_TagBox.innerHTML += activity_detail_tag(e);
            }
        )
    }

    // --- 參與者人數匯入 --- //
    const display_actDetailJoinCount = (o) => {
        activity_detail_participant_count.innerHTML = "";
        if (o.length == 0) {
            activity_detail_participant_count.innerHTML = "";
        } else {
            activity_detail_participant_count.innerHTML = actDetail_participant_count(o[0].JoinCount);
        }
    }

    // * ********************************** [ END ] 文字樣板 [ END ] ********************************** //



    // ! ************************ [ START ] actDetail ajax [ START ] ************************ //
    const actDetail = async (id) => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.actDetail + id, {
                method: "GET", // http request method
                headers: {
                    // http headers
                    Authorization: localStorage.getItem("Cycle link token"), // 請求的資料類型
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

            // * -------------------------------- 標籤搜尋 -------------------------------- //
            let tagFroBtn = document.querySelectorAll(".activityTag")
            for (let i = 0; i < tagFroBtn.length; i++) {
                tagFroBtn[i].addEventListener('click', (e) => {
                    e.preventDefault();

                    let a = e.target.text.substr(1)
                    // console.log(a);
                    tagSearch(a)
                })
            }

            // * -------------------------------- 加入最愛判斷 -------------------------------- //
            // console.log("result.data.likes:", result.data.likes)
            if (result.data.likes.length != 0) {
                document.querySelector(".active_detail_card_heart").classList.add("actlikecolor");
            }

        } catch (err) {
            console.log(err);
            // 錯誤處理
        }
    };
    // * -------------------------------- 標籤搜尋 -------------------------------- //
    const tagSearch = async (tag) => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.actDetail + `tagSearch/${tag}`, {
                method: "GET",
                cache: "no-cache",
                credentials: "include",
            });
            let result = await response.json();
            // console.log(result.data);
            location.href = "#activity"
            document.querySelector("#act_tag_main").innerHTML = `#${tag}`;
            console.log("data", result.data.tagSearch);
            ActivityIndex.display_active(result.data.tagSearch)
            // location.reload();
        } catch (err) {
            console.log(err);
            // 錯誤處理
        }
    };

    // * -------------------------------- 創建活動 -------------------------------- //
    const CreateActivity = async () => {
        let fd = document.querySelector("#ac_date_from").value;
        let fdt = document.querySelector("#ac_date_from_time").value;
        let ed = document.querySelector("#ac_date_to").value;
        let edt = document.querySelector("#ac_date_to_time").value;
        let actFromDate = fd + " " + fdt;
        let actEndDate = ed + " " + edt;
        // console.log(localStorage.getItem("Cycle link token"));
        let nowtime = new Date();
        let date = nowtime.toLocaleDateString();

        let form = document.querySelector("#creatAct_form");
        let formData = new FormData(form);
        formData.append('fCreatDate', date);
        formData.append('fActivityDate', actFromDate);
        formData.append('fActivityEndDate', actEndDate);

        try {
            let response = await fetch(serverURL.actDetail, {
                method: "POST", // POST
                body: formData, // *攜帶的 FormData
                mode: 'cors',
                referrer: "client",
                headers: { // http headers
                    Authorization: localStorage.getItem("Cycle link token"),
                }
            })
            let result = await response.text();
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }




    // ! ************************ [ END ] actDetail ajax [ END ] ************************ //
    // --- textarea ---
    // function textareaReplace() {
    //     let acTextarea = document.querySelector("#create_active_text")
    //     acTextarea.value.replace(' ', "<br/>")
    //     console.log(acTextarea.value);
    // }




    // * ------------- 創建活動 傳送表單按鈕 ------------- //
    $("#create_active_btn_done").click((e) => {
        e.preventDefault(); // 預防跳轉
        CreateActivity(); // 傳送表單
        alert("創建成功");
        location.href = "#activity";
        // location.reload();
    })


    // * -------------------------------- 創建活動 以個人或社團 -------------------------------- //
    let actInitiatorType = document.querySelector("#actCreaterType")
    actInitiatorType.addEventListener('change', async (e) => {
        if (actInitiatorType.value == 1) {
            actCType();
        } else if (actInitiatorType.value == 0) {
            actCreaterTypeSpan.setAttribute("style", "display:none")
        }
    })

    const actCType = async () => {
        try {
            let response = await fetch(serverURL.actDetail + "create/forWho", {
                method: "GET",
                headers: {
                    // "Content-Type": "application/json", // 請求的資料類型
                    Authorization: localStorage.getItem("Cycle link token")
                },
                cache: "no-cache",
                credentials: "include",
            });
            let result = await response.json();
            // console.log(result.data);
            createSelect(result.data.createForWho);
        } catch (err) {
            console.log(err);
        }
    }

    function createSelect(d) {
        let cp = document.querySelector("#createPeople")
        let createSelect = document.createElement("select");
        createSelect.classList.add("createSelect")
        createSelect.setAttribute("name", "fCommunityId")
        createSelect.setAttribute("id", "createSelect")

        cp.appendChild(createSelect);
        const actCreaterTypeSpan = document.querySelector(".createSelect");
        d.map(
            (e, index) => {
                actCreaterTypeSpan.innerHTML += actCreaterType(e);
            }
        )
    }
    const actCreaterType = (o) => {
        return `<option value="${o.fCommunityId}">${o.fName}</option>`
    }

    // TODO: -------------------------------- textarea 會爆版 -------------------------------- //

    // TODO: -------------------------------- 刪除活動 -------------------------------- //


    //* --- 編輯時寫入標籤 --- //
    const EditActByTag = (o) => {
        return `<div class="create_active_tag">${o.fLabelName}<button class="actRemoveTag"><i class="fas fa-times"></i></button>`
    }
    const display_EditTag = (o) => {
        activity_detail_Edit_tag.innerHTML = ""
        o.map((e, index) => {
            activity_detail_Edit_tag.innerHTML += EditActByTag(e)
        })
    }
    //* --- 編輯時寫入地圖座標 --- //
    const display_EditMap = (o) => {
        actMapEdit(o.fCoordinateX, o.fCoordinateY)
    }

    // * -------------------------------- 編輯活動 -------------------------------- //
    let InitiatorEditBTN = document.querySelector("#InitiatorEdit")
    InitiatorEditBTN.addEventListener("click", async (actDetailId) => {

        window.location.hash = "#create-activity"

        document.querySelector("#creatActTitle").innerHTML = "編輯活動"
        document.querySelector("#actMapEdit").setAttribute("style", "display:block")
        document.querySelector("#createActMapId").setAttribute("style", "display:none")


        let fActivityId = this.actDetailId;
        // console.log(fActivityId)
        let response = await fetch(serverURL.actDetail + fActivityId, {
            method: "GET", // http request method
            headers: {
                // "Content-Type": "application/json", // 請求的資料類型
                Authorization: localStorage.getItem("Cycle link token")
            },
            cache: "no-cache",
            credentials: "include",
        });
        let result = await response.json();
        // console.log(result);
        let fActivityDate = result.data.detail[0].fActivityDate.split(" ")
        let fActivityEndDate = result.data.detail[0].fActivityEndDate.split(" ")
        let fCommunityId = result.data.detail[0].fCommunityId

        document.querySelector("#create_active_name").value = result.data.detail[0].fActName
        document.querySelector("#create_active_local_tags").value = result.data.detail[0].fActLocation
        document.querySelector("#create_active_text").value = result.data.detail[0].fIntroduction
        document.querySelector("#ac_date_from").value = fActivityDate[0]
        document.querySelector("#ac_date_to").value = fActivityEndDate[0]
        document.querySelector("#ac_date_from_time").value = fActivityDate[1].substring(0, 5)
        document.querySelector("#ac_date_to_time").value = fActivityEndDate[1].substring(0, 5)

        document.querySelector("#ac_date_from_div").setAttribute("style", "display:block")
        document.querySelector("#ac_date_to_div").setAttribute("style", "display:block")

        document.querySelector(".ca_img_avatar").src = `http://localhost:3050/${result.data.detail[0].fImgPath}`

        let fTypeId = result.data.detail[0].fActLabelId
        let fTypeSelect = document.querySelector("#ac_detail_type")
        console.log("fActLabelId : ", fTypeId);
        fTypeSelect.getElementsByTagName("option")[fTypeId].selected = true

        document.querySelector("#actMinPeople").value = result.data.detail[0].fMinLimit
        document.querySelector("#actMaxPeople").value = result.data.detail[0].fMaxLimit

        document.querySelector("#create_active_btn_done").setAttribute("style", "display:none")
        document.querySelector("#create_active_btn_done_edit").setAttribute("style", "display:block")

        console.log(result.data.detail[0])
        console.log(result.data.tag);

        display_EditTag(result.data.tag)
        display_EditMap(result.data.detail[0])


        if (fCommunityId > 0) {
            actCType()
            actInitiatorType.getElementsByTagName("option")[1].selected = true;
        } else {
            actCreaterTypeSpan.setAttribute("style", "display:none")
        }

        // 編輯確認按鈕
        let createActEditDone = document.querySelector("#create_active_btn_done_edit")
        createActEditDone.addEventListener("click", async (e) => {
            e.preventDefault();
            alert("編輯成功");
            location.href = "#activity";
            location.reload();

            let fd = document.querySelector("#ac_date_from").value;
            let fdt = document.querySelector("#ac_date_from_time").value;
            let ed = document.querySelector("#ac_date_to").value;
            let edt = document.querySelector("#ac_date_to_time").value;
            let actFromDate = fd + " " + fdt;
            let actEndDate = ed + " " + edt;
            // console.log(localStorage.getItem("Cycle link token"));
            // let nowtime = new Date();
            // let date = nowtime.toLocaleDateString();

            // let form = document.querySelector("#creatAct_form");
            // let formData = new FormData(form);
            // formData.append('fCreatDate', date);



            let form = document.querySelector("#creatAct_form");
            let formData = new FormData(form);
            formData.append('fId', fActivityId);
            formData.append('fActivityDate', actFromDate);
            formData.append('fActivityEndDate', actEndDate);
            // console.log("fActivityId === " + fActivityId)
            try {
                let response = await fetch(serverURL.actDetail + "Edit", {
                    method: "PUT", // http request method
                    body: formData,
                    headers: {
                        // "Content-Type": "application/json", // 請求的資料類型
                        Authorization: localStorage.getItem("Cycle link token")
                    },
                    cache: "no-cache",
                    credentials: "include",
                });
                let result = await response.json();
                console.log(result)
            } catch (err) {
                console.log(err)
            }

        })
    })


    // * -------------------------------- 是否為活動發起者 -------------------------------- //
    const OrActInitiator = async (actId) => {
        try {
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.actDetail + `OrActInitiator/${actId}`, {
                method: "GET", // http request method
                headers: {
                    // "Content-Type": "application/json", // 請求的資料類型
                    Authorization: localStorage.getItem("Cycle link token")
                },
                cache: "no-cache",
                credentials: "include",
            });
            // 用變數接 fetch結果的資料內容， 要用await等。
            let result = await response.json();
            // console.log(result);
            if (result.data.Initiator.length > 0) {
                $("#InitiatorEdit").css("display", "block");
            } else {
                $("#InitiatorEdit").css("display", "none");
            }
        } catch (err) {
            console.log(err);
        }
    };


    // * -------------------------------- 是否參加活動 -------------------------------- //
    const OrJoinAct = async (actId) => {
        try {
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.actDetail + `OrJoinAct/${actId}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("Cycle link token")
                },
                cache: "no-cache",
                credentials: "include",
            });
            let result = await response.json();
            // console.log(result);
            if (result.data.joiner.length > 0) {
                $("#joinActBtn").css("display", "none");
                $("#cancelJoinActBtn").css("display", "block")
            } else {
                $("#joinActBtn").css("display", "block");
                $("#cancelJoinActBtn").css("display", "none")
            }
        } catch (err) {
            // console.log(err);
        }
    };

    // * -------------------------------- 參加活動 -------------------------------- //
    $("#joinActBtn").click(async (e) => {
        e.preventDefault();
        var yes = confirm("確定要參加活動嗎?")
        if (yes) {
            alert('已參加活動');
        } else {
            alert('你按了取消按鈕');
        }
        let nowtime = new Date();
        let date = nowtime.toLocaleDateString();
        let actID = location.hash.split("/")[2];
        try {
            let response = await fetch(serverURL.actDetail + "joinAct", {
                method: "POST",
                body: JSON.stringify({
                    fActivityId: actID,
                    fJoinTime: date
                }),
                mode: 'cors',
                referrer: "client",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("Cycle link token"),
                }
            })
            let result = await response.text();
            console.log(result);
        } catch (err) {
            console.log(err);
        }
        $("#joinActBtn").css("display", "none");
        $("#cancelJoinActBtn").css("display", "block")

        let actDetailArr = location.hash.split("/");
        let actDetailId = actDetailArr[2];

        display_actDetailJoin(actDetail(actDetailId));
    })

    // * -------------------------------- 取消參加活動 -------------------------------- //
    $("#cancelJoinActBtn").click(async (e) => {
        e.preventDefault();
        var yes = confirm("確定要取消參加活動嗎?")
        if (yes) {
            alert('已取消參加活動');
        } else {
            alert('你按了取消按鈕');
        }
        let actID = location.hash.split("/")[2];
        try {
            let response = await fetch(serverURL.actDetail + "CancelJoinAct", {
                method: "Delete",
                body: JSON.stringify({
                    fActivityId: actID
                }),
                mode: 'cors',
                referrer: "client",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("Cycle link token"),
                }
            })
            let result = await response.text();

            console.log(result);
        } catch (err) {
            console.log(err);
        }
        $("#joinActBtn").css("display", "block");
        $("#cancelJoinActBtn").css("display", "none")
        let actDetailArr = location.hash.split("/");
        let actDetailId = actDetailArr[2];

        display_actDetailJoin(actDetail(actDetailId));
        console.log(actDetail(actDetailId))
    })







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
    //按讚功能
    var activityselectlike = document.querySelector(".active_detail_card_heart")
    var activitylikelink = document.querySelector(".active_detail_card_heart_link");

    ac_share_btn.onclick = function () {
        ac_share_bg.style.display = "block";
        ac_share_bg_div.style.display = "block";
        shareLink()
    };

    ac_share_closeBtn.onclick = function () {
        ac_share_bg.style.display = "none";
        ac_share_bg_div.style.display = "none";
        // ac_share_bg.preventDefault();
    };

    function shareLink() {
        let link = location.hash
        console.log(link);
        document.querySelector("#ac_share_info_link").setAttribute("value", `http://127.0.0.1:5500/index.html${link}`)
    }

    document.querySelector("#ac_share_info_link_btn").addEventListener("click", () => {
        alert("複製成功")
    })

    // * -------------------------------- 加入最愛活動 -------------------------------- //
    //預設跳轉取消
    activitylikelink.addEventListener("click", function (e) {
        e.preventDefault();
    })
    //icon
    activityselectlike.addEventListener("click", function () {



        let nowtime = new Date();
        let date = nowtime.toLocaleDateString();
        let timesplit = nowtime.toTimeString().split(" ");
        let time = timesplit[0];
        let now = date + " " + time;
        now = now.split("/").join(",");
        let id = location.hash.split("/")[2]

        if (activityselectlike.classList.contains("actlikecolor") == true) {
            activityselectlike.classList.remove("actlikecolor");
            removeactlikesql(id, now);
            // alert('已取消追蹤活動');
        } else {
            activityselectlike.classList.add("actlikecolor");
            addActLikeToSQL(id, now);
            // alert('已追蹤活動');
        }
    })
    const addActLikeToSQL = async (activelikeid, now) => {
        try {
            var formdata = new FormData()
            formdata.append("fActivityId", activelikeid);
            formdata.append("fJoinTypeId", 0);
            formdata.append("fJoinTime", now);
            let response = await fetch(serverURL.addActLikeToSQL, {
                method: "POST", // http request method 
                headers: { // http headers
                    //傳token
                    Authorization: localStorage.getItem("Cycle link token"),
                },
                body: formdata,
                cache: 'no-cache',
                credentials: 'include',
            });
            let result = await response.json();
            console.log(result);
        } catch (err) {
            console.log(err);
            // 錯誤處理
        }
    }

    const removeactlikesql = async (activelikeid) => {
        try {
            // console.log("================")
            // console.log("activelikeid:", activelikeid);
            var formdata = new FormData();
            formdata.append("fActivityId", activelikeid);
            let response = await fetch(serverURL.removeactlikesql, {
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
    }

    const inputDemoBTN = document.querySelector("#inputDemo");
    inputDemoBTN.addEventListener("click", function () {
        console.log("hi");
        document.querySelector("#create_active_name").value = "大安淨街慢跑 Plogg";
        // document.querySelector("#actCreaterType").value = 1
        document.querySelector("#create_active_text").value =
            `你聽過淨街慢跑（Plogging）嗎？這在歐美正火紅！它是結合慢跑和撿垃圾的新運動。
但到底該怎麼開始？快跟著我們一起 Plogging 吧，練體力、救市容就是這麼簡單！

鍛鍊身體的同時，也能救市容！淨街慢跑 (Plogging) 是一種環保又健康的創新運動。

在嘉義，一群迪卡儂夜跑團的熱血市民們，已經開始這項運動。
他們邊跑步，練心肺耐力；蹲下撿垃圾，還鍛鍊了肌肉！更重要的是，
他們成為救市容的無名英雄。他們到底怎麼做？

「在乾淨的環境中，擁有健康的身體！」這是淨街慢跑者的座右銘。

那什麼淨街慢跑者？也就是從事淨街慢跑的運動者！
            
淨街慢跑又是什麼？你沒有聽過嗎？別擔心，不認識淨街慢跑是很正常的事，
因為這是項非常新的運動潮流。`
        document.querySelector("#actMinPeople").value = "5"
        document.querySelector("#actMaxPeople").value = "20"

    })


    this.actDetail = actDetail;
    this.OrJoinAct = OrJoinAct;
    this.OrActInitiator = OrActInitiator;
    this.inputDemo = inputDemo;
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
        ActivityDetail.OrJoinAct(actDetailId);
        ActivityDetail.OrActInitiator(actDetailId);
        ActivityDetail.actDetailId = actDetailId;
        // console.log("hash ===== " + actDetailId)
    }
};

window.addEventListener("hashchange", actDetailChangeHash);
window.addEventListener("load", actDetailChangeHash);


// * 複製文字
new ClipboardJS("[data-clipboard-target]");