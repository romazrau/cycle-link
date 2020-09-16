import {
    checkLogin,
    serverURL
} from "./api.js";

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

    // 開啟特定社團頁面(社團id)
    // todo開放或私密 用社團16做測試 
    const renderPage = async (id) => {

        try {


            let response = await fetch(serverURL.community + id, {
                method: "GET", // http request method
                //token
                headers: {
                    "Authorization": localStorage.getItem("Cycle link token"),
                },
                cache: "no-cache",
                credentials: "include",
            });

            // 含有從token拿的fId
            let result = await response.json();



            // 錯誤處理:沒有回傳資料導回原頁面 
            if (!result.result) {
                //# >>> 前端路由導向
                window.location.hash = "#community";
                return;
            }

            // //for debug
            // console.log("%c +++++++++++++", "color: green");
            // console.log(result);

            // 訪者身分
            // ----從result取出訪者身分
            // ----抓三個btnElement把CLS屬性設隱藏
            // ----sitch 打開要得btn
            let user = result.data[0].user;

            document.querySelector("#ApplyBtn").setAttribute("class", "hide");
            document.querySelector("#ManagerBtn").setAttribute("class", "hide");
            document.querySelector("#MemberBtn").setAttribute("class", "hide");

            // console.log(user);
            // 管理員 社員 非社員(含訪客)
            switch (user) {
                case "管理員":
                    document.querySelector("#ManagerBtn").classList.remove("hide");
                    break
                case "社員":
                    document.querySelector("#MemberBtn").classList.remove("hide");
                    break
                case "非社員":
                    document.querySelector("#ApplyBtn").classList.remove("hide");
                    break
            }







          
            document.querySelector("#CommunityPic").src = serverURL.root + "/" + result.data[0].fImgPath;
            document.querySelector("#CommunityName").innerHTML = result.data[0].fName;
            document.querySelector("#CommunityNumberOfPeople").innerHTML = result.data[0].totalNumber;

            if (!result.data[0].totalNumber) {
                document.querySelector("#NumOfMem").innerHTML = `(0)`;

            } else {
                document.querySelector("#NumOfMem").innerHTML = `(${result.data[0].totalNumber})`;

            }
            document.querySelector("#CommunityStatus").innerHTML = result.data[0].fSatusName;
            document.querySelector("#CommunityAboutUs").innerHTML = result.data[0].fInfo;

            // console.log("+++++++++++++++++++++++++++");
            // console.log(result.data);

            //todo
            //result.data[0].fStatusId: 2    or   result.data[0]."私密"
            //私密的話把 let MemberContainer = document.querySelector("#CommunityMember") 增加隱藏Class
            //移除 <div id="CommunityMemberNone" class="CommunityMemberNone">


        } catch (err) {
            console.log(err);
        }

    }

    const renderPageManager = async (id) => {
        try {

            let response = await fetch(serverURL.communityManager + id, {
                method: "GET", // http request method
                // 以下跟身分認證有關，後端要使用session 要帶這幾項
                cache: "no-cache",
                credentials: "include",
            });

            let result = await response.json();
            // console.log("+++++++++++++++++++++++++++");
            // console.log(result.data);


            let MemberContainer = document.querySelector("#MemberTemplate");
            MemberContainer.innerHTML = "";

            if (result.result) {
                result.data.map((item) => {
                    MemberContainer.innerHTML += data2manageImg(item);
                    // console.log(item);
                })
            }

            // document.querySelector("#CommunityManager").innerHTML = result.data[0].fName;
        } catch (err) {
            console.log(err);
        }



    }
    const renderPageMember = async (id) => {
        try {
            // console.log(`${serverURL.communityMember}${id}`);
            let response = await fetch(`${serverURL.communityMember}${id}`, {
                cache: "no-cache",
                headers: {
                    "Authorization": localStorage.getItem("Cycle link token"),
                },
            });

            let result = await response.json();

            //----------------------------------成員---------------------------------------




            document.querySelector("#MemberPageTemplateContainer").innerHTML = "";
            document.querySelector("#MemberPageTemplateContainerM").innerHTML = "";


            if (result.result) {

                result.data.forEach((items) => {
                    if (items.ifManager == 0) {

                        document.querySelector("#MemberPageTemplateContainer").innerHTML += data2memCard(items);
                    } else {
                        document.querySelector("#MemberPageTemplateContainerM").innerHTML += data2memCard(items);
                    }
                })

            }












            //----------------------------------介紹---------------------------------------
            let MemberContainer = document.querySelector("#CommunityMember");
            MemberContainer.innerHTML = "";
            // console.log(result);
            if (result.result) {

                result.data.map((item) => {
                    MemberContainer.innerHTML += data2memImg(item);
                    // console.log(item);
                })


            }

            //顯示處理
            if (result.data.length < 4) {
                document.querySelector("#CommunityMember").classList.remove("Group_FlexJustifyContentSB");
                document.querySelector("#GroupMemberPicLessThan4").classList.add("GroupMemberPicLessThan4");
            }





        } catch (err) {
            console.log(err);
        }

    }


    // todo 修改社團
    // 編輯按鈕Onclick
    // 導向編輯社團頁面
    // 撈資料放進資料
    // 抓到fCommunityId放進去formdata
    let fCommunityId;
    document.querySelectorAll(".js_editCommunity").forEach(items => {

        items.addEventListener("click", async () => {
            console.group("修改社團");
            try {

                // 導向社團編輯頁面
                // -----# >>> 前端路由導向
                window.location.hash = "#create-community";
                // 更改頁面DOM處理
                // 更改頁面名稱
                document.querySelector("#UpdatePageName").innerHTML = "修改社團";
                document.querySelector("#approveCommunityTitle").innerHTML = "成員修改";
                document.querySelector("#memTitle").innerHTML = "刪除成員";
                // 打開審核頁
                document.querySelector("#approveMember").classList.remove("hide");
                document.querySelector("#approveMemberSide").classList.remove("hide");
                // 藏起next pre done btn
                document.querySelector("#create_community_btn_next").classList.add("hide");
                document.querySelector("#create_community_btn_pre").classList.add("hide");
                document.querySelector("#create_community_btn_done").classList.add("hide");

                // 打開detail managerBlcok Blcok
                document.querySelector("#detailBlock").style.display = "block";
                document.querySelector("#managerBlcok").style.display = "block";

                // 抓到fCommunityId放進去formdata
                fCommunityId = this.cumDetailId;
                console.log("%c" + fCommunityId, "color:blue;font-size:20px;");
                console.log("resultAccessRight+++++++++++");

                // fetch舊資料_社團基本資料
                let response = await fetch(serverURL.community + fCommunityId, {
                    method: "GET", // http request method
                    //token
                    headers: {
                        "Authorization": localStorage.getItem("Cycle link token"),
                    },
                    cache: "no-cache",
                    credentials: "include",
                });
                // console.log("resultAccessRight+++++++++++");

                let result = await response.json();
                // console.log(result.data[0]);
                // {fId: 6
                // fImgPath: "img/community/01.jpg"
                // fInfo: "這裡是一個提供所有社會大眾、服務性社團、志工團隊、志工運用單位相互交流的平台！"
                // fName: "北部地區志工活動資訊交流站"
                // fSatusName: "開放"
                // fStatusId: 1
                // totalNumber: 2
                // user: "非社員"}
                // console.log(response);

                // 把舊資料放入前端頁面_社團基本資料
                document.querySelector("#create_community_text").innerHTML = result.data[0].fInfo;
                document.querySelector("#create_community_name").value = result.data[0].fName;
                document.querySelector("#selectStatus").value = result.data[0].fStatusId + "";
                document.querySelector("#communityImg").src = result.data[0].fImgPath;




                // fetch舊資料_管理員基本資料
                let responseManager = await fetch(serverURL.communityManager + fCommunityId, {
                    method: "GET", // http request method
                    //token
                    headers: {
                        "Authorization": localStorage.getItem("Cycle link token"),
                    },
                    cache: "no-cache",
                    credentials: "include",
                });

                let resultManager = await responseManager.json();
                // console.log(resultMember.data);
                // 1: {
                //     fId: 9,
                //     fName: "黑白熊",
                //     fPhotoPath: "img/member/id5.png"
                // }

                // console.log("resultManager+++++++++++++++++");
                // console.log(resultManager);

                // 把舊資料放入前端頁面_管理員基本資料
                // 管理員管理員
                // 去除管理員
                let ManagerContainer = document.querySelector("#ManagerContainer");
                let ManagerRemoveContainer = document.querySelector("#re");

                ManagerContainer.innerHTML = "";
                ManagerRemoveContainer.innerHTML = "";
                if (resultManager.result) {

                    resultManager.data.forEach((items) => {
                        console.log(items);
                        console.log("-----------------------------------!!!!!!!!!!!!!!!!!!");
                        ManagerContainer.innerHTML += modifiedManager(items);

                        if (resultManager.data.length > 1) {
                            ManagerRemoveContainer.innerHTML += modifiedRemoveManagerThis(items);
                        }

                    })
                } else {
                    console.log("假資料錯誤，沒有管理員");
                }

                // fetch＿社團id搜尋待審核會員
                let responseAccessRight = await fetch(serverURL.communityMemberAccessRight + fCommunityId, {
                    method: "GET", // http request method
                    //token
                    headers: {
                        "Authorization": localStorage.getItem("Cycle link token"),
                    },
                    cache: "no-cache",
                    credentials: "include",
                });
                let resultAccessRight = await responseAccessRight.json();
                // console.log(responseAccessRight);


                //把舊資料放入前端頁面_待審核會員資料
                let penddingMemberContainer = document.querySelector("#penddingMemberContainer");
                penddingMemberContainer.innerHTML = "";
                if (resultAccessRight.result) {
                    resultAccessRight.data.forEach((o, i) => {
                        if (resultAccessRight.data[i].fAccessRightId == 1) {
                            penddingMemberContainer.innerHTML += modifiedRemoveManager(o);
                        }
                    })
                } else {
                    console.log("沒有待審核社員");
                }


                // fetch舊資料_社員基本資料
                let responseMember = await fetch(serverURL.communityMember + fCommunityId, {
                    method: "GET", // http request method
                    //token
                    headers: {
                        "Authorization": localStorage.getItem("Cycle link token"),
                    },
                    cache: "no-cache",
                    credentials: "include",
                });
                let resultMember = await responseMember.json();
                // resultMember會員帶的資料
                // console.log(resultMember);
                // fJoinDate: "2020/7/18"
                // fMemberId: 10
                // fName: "過激貓"
                // fPhotoPath: "img/member/id6.png"
                // ifManager: 0

                // 把舊資料放入前端頁面_社員基本資料
                // 用How to Save the World by 2030 社團測試
                // 新增管理員
                // 刪除成員
                let AddManagerContainer = document.querySelector("#addManager");
                let deletMemberContainer = document.querySelector("#deletMem");
                AddManagerContainer.innerHTML = "";
                deletMemberContainer.innerHTML = "";
                if (resultMember.result) {
                
                    // console.log(resultAccessRight.data);
                    resultMember.data.forEach((o) => {
                        //不是管理員
                        if (o.ifManager == 0) {
                            // console.log(o);
                            // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                            // console.log(resultMember.data);
                            // is  Normal member
                            let isNormalMember = true;
                            if (resultAccessRight.result == 1) {
                                for (let x of resultAccessRight.data) {
                                    if (o.fMemberId == x.fMemberId) {
                                        isNormalMember = false;
                                        break;
                                    }
                                }
                            }

                            if (isNormalMember) {
                                // 新增管理員
                                // 刪除管理員
                         
                                AddManagerContainer.innerHTML += modifiedAddManager(o);
                                deletMemberContainer.innerHTML += modifiedRemoveManager(o);

                            }
                        }

                    })
                } else {
                    console.log("假資料錯誤，沒有社員");
                }


            } catch (err) {
                console.log(err);
            }
            console.groupEnd("修改社團");

        })
    })

    // 處理使用者輸入Null值
    document.querySelector("#create_community_name").addEventListener("input", () => {
        if (document.querySelector("#create_community_name").value == 0) {
            // done Btn 失靈 放棄
            // document.querySelector("#create_community_btn_done").disabled = true;
            document.querySelector("#fakeDoneBtn").addEventListener("click", () => {
                alert("請輸入社團名稱!")
            })
        }
        else {
            // document.querySelector("#create_community_btn_done").disabled = false;
            console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        }
    })



    // 完成按鈕Onclik
    // 放進資料
    // 送出資料
    // 通知使用者修改資料成功
    // 刷新頁面
    document.querySelector("#fakeDoneBtn").addEventListener("click", async () => {
        try {



            // 頁面拿到新的社團資料
            let form = document.querySelector("#formOfCreate"); // form element
            let formData = new FormData(form); // FormData
            formData.append("fCommunityId", fCommunityId)
            // 頁面拿到新的會員資料
            let formMem = document.querySelector("#formPending");
            let formDataMem = new FormData(formMem);
            formDataMem.append("fCommunityId", fCommunityId);
            //** */ fetch_修改tCommunity資料
            let responseput = await fetch("http://localhost:3050/community/", {
                method: "PUT",
                // Adding body or contents to send 
                body: formData,
                // Adding headers to the request 
                headers: {
                    // formdata 不是用這種解析方式
                    // "Content-type": "application/json; charset=UTF-8",
                    "Authorization": localStorage.getItem("Cycle link token"),
                },
                cache: "no-cache",
                credentials: "include",
            })
            let resultput = await responseput.json();
            // 錯誤處理:沒有回傳資料導回原頁面 

            if (!resultput.result) {
                console.log(resultput);
            }

        
            // 如果有身份被修改
            // fetch_修改tMemberList
            //** */ 1.修改審核會員
            let responseAccessRight = await fetch(serverURL.communityMember + fCommunityId, {
                method: "PUT",
                // Adding body or contents to send 
                body: formDataMem,
                // Adding headers to the request 
                headers: {
                    // formdata 不是用這種解析方式
                    // "Content-type": "application/json; charset=UTF-8",
                    "Authorization": localStorage.getItem("Cycle link token"),
                },
                cache: "no-cache",
                credentials: "include",
            })
            let resultAccessRight = await responseAccessRight.json();

            if (!resultAccessRight.result) {
                console.log(resultAccessRight.result);
            }


            //** */ 2.社團剔除社員
            // 頁面拿到新的剔除社員資料        
            let formDel = document.querySelector("#formDelMember"); // form element
            let formDataDel = new FormData(formDel);
            formDataDel.append("fCommunityId", fCommunityId);
            let responseDeleteMem = await fetch(serverURL.communityMemberAccessRight, {
                method: "Delete",
                // Adding body or contents to send 
                body: formDataDel,
                // Adding headers to the request 
                headers: {
                    // formdata 不是用這種解析方式
                    // "Content-type": "application/json; charset=UTF-8",
                    "Authorization": localStorage.getItem("Cycle link token"),
                },
                cache: "no-cache",
                credentials: "include",
            })
            let resultDeleteMem = await responseDeleteMem.json();

            // console.log(resultDeleteMem);
            if (!resultDeleteMem.result) {
                console.log(resultDeleteMem);
            }


            //** */ 3.修改增加管理員 

            // 寫錯方向
            // let selectedMem = document.querySelector(".js_checkBoxClass");
            // console.log(selectedMem.value);
            // let promoted; 
            // // console.log(selectedMem.checked );
            //  if(selectedMem.checked){
            //     promoted = selectedMem.value;
            //  }
            // //  console.log(promoted);
            let formAddManager =  document.querySelector("#formAddManager");
            let formDataAdd = new FormData(formAddManager);
            formDataAdd.append("fCommunityId", fCommunityId);

            let responseAddManager = await fetch(serverURL.communityMemberAccessRight,{
                method: "PUT",
                // Adding body or contents to send 
                body: formDataAdd,
                // Adding headers to the request 
                headers: {
                    // formdata 不是用這種解析方式
                    // "Content-type": "application/json; charset=UTF-8",
                    "Authorization": localStorage.getItem("Cycle link token"),
                },
                cache: "no-cache",
                credentials: "include",
            })
            let resultAddManager = await responseAddManager.json();

            console.log(resultAddManager);
            if (!resultAddManager.result) {
                console.log(resultAddManager);
            }


            //** */ 修改去除管理員

            let formRemoveManager = document.querySelector("#formDelManager");
            let formDataRemove = new FormData(formRemoveManager);
            formDataRemove.append("fCommunityId", fCommunityId);

            let responseRemoveManager = await fetch(serverURL.communityMemberAccessRight,{
                method: "PUT",
                // Adding body or contents to send 
                body: formDataRemove,
                // Adding headers to the request 
                headers: {
                    // formdata 不是用這種解析方式
                    // "Content-type": "application/json; charset=UTF-8",
                    "Authorization": localStorage.getItem("Cycle link token"),
                },
                cache: "no-cache",
                credentials: "include",
            })
            let resultRemoveManager = await responseRemoveManager.json();

            console.log(resultRemoveManager);
            if (!resultRemoveManager.result) {
                console.log(resultRemoveManager);
            } 
            






            alert("資料修改成功!");
            //刷新頁面
            window.location.hash = `#community/detail/${fCommunityId}`;


        }
        catch (err) {
            console.log(err);
        }


    })








    // 還原社團編輯頁面
    document.querySelector("#changeBack").addEventListener("click", () => {
        document.querySelector("#UpdatePageName").innerHTML = "創建社團";
        document.querySelector("#approveCommunityTitle").innerHTML = "詳細資料";
        document.querySelector("#memTitle").innerHTML = "社團成員&nbsp;(&nbsp;6&nbsp;)";


        // 關閉審核頁
        document.querySelector("#approveMember").classList.add("hide");
        document.querySelector("#approveMemberSide").classList.add("hide");
        // next pre done btn打開
        document.querySelector("#create_community_btn_next").classList.remove("hide");
        document.querySelector("#create_community_btn_pre").classList.remove("hide");
        document.querySelector("#create_community_btn_done").classList.remove("hide");
        // 關掉 managerBlcok detail Blcok
        document.querySelector("#detailBlock").style.display = "none";
        document.querySelector("#managerBlcok").style.display = "none";

    })



    // TODO 加入社團by使用者id,社團id

    // 介紹分頁-- 管理員頭像的文字樣板
    const data2manageImg = (o) => {

        // console.log(o.fPhotoPath);
        return `<div class="activity_detail_info_img_circle">
         <div class="activity_detail_info_img_div">
             <img src="${serverURL.root}/${o.fPhotoPath}" class="activity_detail_info_img">
         </div>
         </div>
         <div class="GroupRightInfo FlexContainer GroupRightInfoText">
         <a id="CommunityManager" href="#" class="GroupHolderName">${o.fName}</a>
         <a class="GroupEnglishFont GroupRightInfoM" href="#">
         <img src="./img/icon_chat.svg" width="20"></a>
         </div>`;
    };

    // 介紹分頁-- 會員頭像的文字樣板
    // 照片路徑存取後端資料夾
    const data2memImg = (o) => {
        return ` <div id="GroupMemberPicLessThan4" class="activity_detail_info_img_circle GroupMemberPic GroupMemberPicLessThan4">
        <div class="activity_detail_info_img_div">
            <img class="activity_detail_info_img GoupRightInfoPhoto" src="${serverURL.root}/${o.fPhotoPath}"
                width="30">
        </div>
    </div>`
    }

    // 成員分頁-- 會員卡的文字樣板
    const data2memCard = (o) => {
        return ` <div
        class="BottomRightMemberCard FlexContainer GroupEventMemberCard Group_FlexJustifyContentSB ">
        <div class="FlexContainer">
            <a href="#" class="DivForImg">
                <div class="activity_detail_info_img_circle">
                    <div class="activity_detail_info_img_div">
                        <img src=${serverURL.root}/${o.fPhotoPath}
                            class="activity_detail_info_img">
                    </div>
                </div>
            </a>
            <div class="GroupMemberCardInfo">
                <a href="#">${o.fName}</a>
                <div class="FlexContainer">
                    <div>${o.fJoinDate}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;加入此社團</div>
                </div>
            </div>
        </div>
        <a href="#">
            <img class="Size20IconMarginRight" src="./img/icon_chat.svg"
                width="20">
        </a>
    </div>`
    }

    // 修改社團--管理員文字樣板
    const modifiedManager = (o) => {
        return ` <div class="create_community_check">
        <img src = "${serverURL.root}/${o.fPhotoPath}" 
        style = "border-radius: 50%; width:50px" />
            <p style="white-space:nowrap">${o.fName}</p>
            </div>`;
    }

    // 修改社團--刪除管理員文字樣板
    // 修改社團--刪除會員文字樣板
    // 修改社團--審核會員文字樣板
    const modifiedRemoveManager = (o) => {
        // console.log(o);
        return `<div class="create_community_flex">
                <input name="fId" type="checkbox" value=${o.fMemberId} style="align-self: center;" />
                <div class="create_community_check">
                    <img src ="${serverURL.root}/${o.fPhotoPath}"
                    style = "border-radius: 50%; width:50px"/>
                    <p>${o.fName} </p>
                    </div>`;
    }

    const modifiedRemoveManagerThis = (o) => {
        // console.log(o);
        return `<div class="create_community_flex">
                <input name="fId" type="checkbox" value=${o.fId} style="align-self: center;" />
                <div class="create_community_check">
                    <img src ="${serverURL.root}/${o.fPhotoPath}"
                    style = "border-radius: 50%; width:50px"/>
                    <p>${o.fName} </p>
                    </div>`;
    }

    // 修改社團--增加管理員文字樣版
    const modifiedAddManager = (o) => {
        // console.log(o);
        return `<div class="create_community_flex">
                <input class="js_checkBoxClass" name="fId" type="checkbox" value=${o.fMemberId} style="align-self: center;" />
                <div class="create_community_check">
                    <img src ="${serverURL.root}/${o.fPhotoPath}"
                    style = "border-radius: 50%; width:50px"/>
                    <p>${o.fName} </p>
                    </div>`;
    }


    // this 指的是 ClsCommuntityDetail
    this.renderMainCommunityInfo = renderPage;
    this.renderManagerListInfo = renderPageManager;
    this.renderMemberListInfo = renderPageMember;

}



const CommuntityDetail = new ClsCommuntityDetail();

// * 利用 hash , 如下
// * -------------------------------- hash -------------------------------- //
const communityDetailChangeHash = () => {

    //!Window物件方法偵測URL改變 執行rederPage function
    let cumDetailArr = window.location.hash.split('/'); // #community/detail/3  -> [ #community, detail, 3 ]
    let cumDetailId = cumDetailArr[2];
    if (location.hash.includes("#community/detail/")) {
        CommuntityDetail.renderMainCommunityInfo(cumDetailId);
        CommuntityDetail.renderManagerListInfo(cumDetailId);
        CommuntityDetail.renderMemberListInfo(cumDetailId);
        CommuntityDetail.cumDetailId = cumDetailId;
    }

}

window.addEventListener("hashchange", communityDetailChangeHash);
window.addEventListener("load", communityDetailChangeHash);