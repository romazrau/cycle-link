// import {
//     serverURL
// } from "./api.js";

function ClsActivity() {




    // * --------------- GO搜尋結果 ----------------

    var activity_search_go = document.getElementById("activity_search_go");
    var activity_card_ALL = document.getElementById("activity_card_ALL");
    var activity_main = document.querySelector(".activity_main");
    var activity_option = document.getElementById("activity_option");
    var searchtext = document.getElementById("search_txt");
    let searchAnsContainer = document.querySelector("#activesearchresult");
    var activity_searchtext=7;
    activity_option.addEventListener("click",function(){
        
        activity_searchtext=activity_option.value
        console.log("activity_searchtext:",activity_searchtext);
    })


    activity_search_go.addEventListener('click', function () {
        //丟進
        var typeId = activity_searchtext;
        console.log("typeId:",typeId);


        var searchtxt = searchtext.value;

        if (!searchtxt) {
            activity_card_ALL.classList.remove("hide");
            searchAnsContainer.classList.add("hide");
            search_container.classList.add("search_hidden");

            activity_main.style.display = 'flex';

            return;
        }

        activity_card_ALL.classList.add("hide");
        searchAnsContainer.classList.remove("hide");

        activity_main.style.display = 'block';
        activeSearchGoAwait(typeId, searchtxt);
        //點擊go後 顯示進階搜尋
        search_container.classList.remove("search_hidden");
    })





    // * ---------------- 文字樣板 -----------------

    const htmlActSearch = (o) => {
        return ` 
        <option class="ActivitySearchOption" value="${o.fId}">${o.fLabelName}</option>`;
    }
    const ActSearch = document.querySelector("#activity_option");




    const display_active_main_level = (o) => {
        ActSearch.innerHTML = "";
        o.map(
            (e, index) => {
                ActSearch.innerHTML += htmlActSearch(e);
            }
        )
    };

    const activemainlevelAwait = async () => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.activemainlevel, {
                method: "GET", // http request method 
                headers: { // http headers
                    'Content-Type': 'application/json' // 請求的資料類型
                },
                // 以下跟身分認證有關，後端要使用session 要帶這幾項
                cache: 'no-cache',
                credentials: 'include',
            });
            // 用變數接 fetch結果的資料內容， 要用await等。
            let result = await response.json();
            display_active_main_level(result.data);

            console.log(object);
            
            // for(let i=0;i<ActivitySearchOption.length;i++)
            // {
            //     console.log("ActivitySearchOption[i]:",ActivitySearchOption[i].innerHTML);
            //     ActivitySearchOption[i].addEventListener("click",function(){
            //         activity_searchtext= ActivitySearchOption[i].innerHTML;
            //         console.log("activity_searchtext",activity_searchtext)
            //     })
            // }
            
            // *用 result  do something ...

        } catch (err) {
            console.log(err);
            // 錯誤處理

        }
    }

    activemainlevelAwait();



    const activeSearchGoAwait = async (id, text) => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  ),
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(`${serverURL.active}/${id}/${text}`, {
                method: "GET", // http request method 
                headers: { // http headers
                    'Content-Type': 'application/json' // 請求的資料類型
                },
                // 以下跟身分認證有關，後端要使用session 要帶這幾項
                cache: 'no-cache',
                credentials: 'include',
            });
            // 用變數接 fetch結果的資料內容， 要用await等。
            let result = await response.json();
            display_search_go(result.data);
            // *用 result  do something ...
            getsearchdata(result.data);

            

            // search_result_arr =  result.data ; 

        } catch (err) {
            console.log(err);
            // 錯誤處理
        }
    }


    var search_result_arr;

    function getsearchdata(arr) {
        search_result_arr = arr;
        console.log(search_result_arr);

    }



    //*進階搜尋區 天 ---------------------------------------------------------
    //show
    document.querySelector("#activity_advence_show").addEventListener(
        "click",
        () => {
            document.querySelector(".activity_advence_search_container").classList.toggle("hide");
            document.querySelector(".activity_advence_t").classList.toggle("upside_down")

        }
    );

    //日期

    //防止冒泡
    const stopdate = document.querySelectorAll(".ui-state-default");
    for (var i = 0; i < stopdate.length; i++) {
        stopdate[i].addEventListener("click", function (e) {
            console.log("WTF");
            e.preventDefault();
        })
    }

    //舉辦縣市
    const activityCityData = [
        "台北市",
        "新北市",
        "桃園市",
        "台中市",
        "台南市",
        "高雄市",
        "澎湖縣",
        "連江縣",
        "金門縣"
    ]

    const data2CityCheckbox = array => {
        let result = ""
        array.map((e) => {
            result += `<div class='activity_search_city'><input type="checkbox"  name="city" value="${e}">
                       <span>${e}</span></div>`
        })
        return result;
    }




    //顯示進階搜尋
    // document.querySelector('#active_advance_search_city').innerHTML = data2CityCheckbox(activityCityData);
    let search_container = document.querySelector(".search_container");
    search_container.addEventListener('click', function () {

    })







    // 進階搜尋_DA
    //抓取地址
    var btncity = document.getElementById("search_city");
    var btncitydetial = document.getElementById("search_citydetial");
    btncity.addEventListener('click', function () {
        btncity.classList.add("search_hidden");
        $("#search_citydetial").fadeIn("5000")
        btncitydetial.classList.remove("search_hidden");;

        // btncitydetial.classList.add("search_hidden");

    });
    var list = document.getElementsByTagName("li");
    var searchcitytext = "";
    var btncitytext = document.getElementById("search_city_text");
    var datearr;
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener('click', function () {
            // searchcitytext = this.innerHTML;
            $("#search_citydetial").fadeOut("5000");
            btncitydetial.classList.add("search_hidden");
            btncity.classList.remove("search_hidden");
            btncity.classList.add("bccolorwhite");
            btncitytext.innerHTML = this.textContent;

            //判斷目前活動是否符合進階搜尋的城市
            var result_arr = search_result_arr.filter(function (item) {
                return (item.fActLocation.indexOf(btncitytext.innerHTML.substr(0, 2))) >= 0;
            })

            display_search_go(result_arr);
            //將搜尋結果另外存一個陣列給日期使用
            datearr = result_arr;
            // likelistfromsql();
        })
    }
    // ----------------------------------------------------------------
    var btndate = document.getElementById("search_date");
    var btndatedetial = document.getElementById("search_datedetial");
    btndate.addEventListener('click', function () {
        btndate.classList.add("search_hidden");

        $("#search_datedetial").fadeIn("5000");
        btndatedetial.classList.remove("search_hidden");

    });
    // 抓時間
    $(function () {

        //jQuery datepicker 設定限制日期最小最大 minDate maxDate hideIfNoPrevNext
        $("#ac_date_start_from").datepicker({
            onSelect: function (dateText, inst) {
                var dateAsString = dateText; //the first parameter of this function
                var dateAsObject = $(this).datepicker('getDate'); //the getDate method
                getstartdate(dateAsString);
                // startdate(dateAsString);
                var startdate = dateText;

            },
            //顯示上個月日期 及下個月日期 ，但是不可選的。
            //default:false
            showOtherMonths: true,
            // 設置當沒有上一個/下一個可選擇的情況下，隱藏掉相應的按鈕。（默認為不可用）
            //配合有設定最大最小時使用
            //default:false
            hideIfNoPrevNext: true,
            //設置一個最小的可選日期。可以是Date對象，或者是數字（從今天算起，例如+7），
            //或者有效的字符串('y'代表年, 'm'代表月, 'w'代表周, 'd'代表日, 例如：'+1m +7d')。
            minDate: "+7d",
            //  設置一個最大的可選日期。可以是Date對象，或者是數字（從今天算起，例如+7），
            //或者有效的字符串('y'代表年, 'm'代表月, 'w'代表周, 'd'代表日, 例如：'+1m +7d')。
            maxDate: "+1m",

            onclick: function () {
               
            }
        });

        //日期

        $("#ac_date_end_from").datepicker({
            onSelect: function (dateText, inst) {
                var dateAsString = dateText; //the first parameter of this function
                var dateAsObject = $(this).datepicker('getDate'); //the getDate method
                getenddate(dateAsString);

                // displaydate();
            },
            //顯示上個月日期 及下個月日期 ，但是不可選的。
            //default:false
            showOtherMonths: true,
            // 設置當沒有上一個/下一個可選擇的情況下，隱藏掉相應的按鈕。（默認為不可用）
            //配合有設定最大最小時使用
            //default:false
            hideIfNoPrevNext: true,
            //設置一個最小的可選日期。可以是Date對象，或者是數字（從今天算起，例如+7），
            //或者有效的字符串('y'代表年, 'm'代表月, 'w'代表周, 'd'代表日, 例如：'+1m +7d')。
            minDate: "+7d",
            //  設置一個最大的可選日期。可以是Date對象，或者是數字（從今天算起，例如+7），
            //或者有效的字符串('y'代表年, 'm'代表月, 'w'代表周, 'd'代表日, 例如：'+1m +7d')。
            maxDate: "+1m",
        });

    });

    var datestart;
    var newdatestart;
    var datestartarr;
    var dateend;
    var newdateend;
    var dateendarr;
    //抓取時間
    function getstartdate(startdate) {
        var startdatetext = document.getElementById("search_date_text");
        startdatetext.innerHTML = "起始日" + "  " + startdate+ "  " ;
    }


    var startinput = document.querySelector("#ac_date_start_from");
    var endinput = document.querySelector("#ac_date_end_from");
    var btncheckdate = document.querySelector(".btn_check_date");
    // var startinput = document.querySelector(".ui-state-default");
    var resultdate_arr = [];
    btncheckdate.addEventListener("click", function (e) {

        if (datearr.length > 0) {
            console.log("datearr:", datearr);
            for (var i = 0; i < datearr.length; i++) {

                // let acttime = Date.parse(datearr[i].fActivityDate);
                let acttime = Date.parse(datearr[i].fActivityDate);
                datestart = startinput.value;
                datestartarr = datestart.split("/");
                newdatestart = datestartarr[2] + "/" + datestartarr[0] + "/" + datestartarr[1];
                dateend = endinput.value;
                dateendarr = dateend.split("/");
                newdateend = dateendarr[2] + "/" + dateendarr[0] + "/" + dateendarr[1];
                let satrttime = Date.parse(newdatestart);
                let endtime = Date.parse(newdateend);
                if (acttime > satrttime && acttime < endtime) {
                    resultdate_arr.push(datearr[i]);
                }

            }
            display_search_go(resultdate_arr);
            displaydate();
        }
    })
    //)
    function getenddate(enddate) {
        var enddatetext = document.getElementById("search_date_text");
        enddatetext.innerHTML += "結束日" + "  " + enddate;
        dateend = enddate;
        dateendarr = dateend.split("/");
        newdateend = dateendarr[2] + dateendarr[0] + dateendarr[1];
    }


    function displaydate() {
        $("#search_datedetial").fadeOut("5000");
        btndatedetial.classList.add("search_hidden");
        btndate.classList.remove("search_hidden");
        btndate.classList.add("bccolorwhite");
    }
    let nowtime = new Date();
    let date = nowtime.toLocaleDateString();
    let timesplit = nowtime.toTimeString().split(" ");
    let time = timesplit[0];
    let now = date;


    // 活動樣板
    const htmlActCard = (o) => {

        return ` 
            <div class="">
            <a  href="#activity/detail/${o.fId}" class="activecard">
                 <div class="active_card_container">
                 <div class="active_card" >
                     <div class="addlike">
                         <i class="fas fa-heart fa-lg active_card_heart "></i>
                     </div>
                     <div class="active_card_div">
                         <img src="http://localhost:3050/${o.fImgPath}" alt="" class="active_card_img">
                     </div>
                     
                     <div class="active_card_info">
                         <p>${o.fActivityDate}</p>
                         <p class="active_card_title">${o.fActName}</p>
                 
                     <div class="active_card_location_div">
                         <img src="img/929497.svg" class="active_card_location">
                         <p>${o.fActLocation}</p>
                     </div>
                 </div>
                 </div>
                 </div>
             </a>
             </div>`;
        
    }



    //瀏覽過的活動
    const htmlActCardseen = (o) => {
        if (o.fJoinTypeId == 0) {
            return ` 
            <div class="">
            <a  href="#activity/detail/${o.fActivityId}" class="activecard">
                 <div class="active_card_container">
                 <div class="active_card" >
                     <div class="addlike">
                         <i class="fas fa-heart fa-lg active_card_heart actlikecolor "></i>
                     </div>
                     <div class="active_card_div">
                         <img src="http://localhost:3050/${o.fImgPath}" alt="" class="active_card_img">
                     </div>
                     
                     <div class="active_card_info">
                         <p>${o.fActivityDate}</p>
                         <p class="active_card_title">${o.fActName}</p>
                 
                     <div class="active_card_location_div">
                         <img src="img/929497.svg" class="active_card_location">
                         <p>${o.fActLocation}</p>
                     </div>
                 </div>
                 </div>
                 </div>
             </a>
             </div>`;
        } else {
            return ` 
            <div class="">
            <a  href="#activity/detail/${o.fActivityId}" class="activecard">
                 <div class="active_card_container">
                 <div class="active_card" >
                     <div class="addlike">
                         <i class="fas fa-heart fa-lg active_card_heart "></i>
                     </div>
                     <div class="active_card_div">
                         <img src="http://localhost:3050/${o.fImgPath}" alt="" class="active_card_img">
                     </div>
                     
                     <div class="active_card_info">
                         <p>${o.fActivityDate}</p>
                         <p class="active_card_title">${o.fActName}</p>
                 
                     <div class="active_card_location_div">
                         <img src="img/929497.svg" class="active_card_location">
                         <p>${o.fActLocation}</p>
                     </div>
                 </div>
                 </div>
                 </div>
             </a>
             </div>`;
        }

    }


    // //為您推薦樣板
    // const htmlActCard2 = (o) => {
    //     return ` <a  href="#activity/detail/${o.fId}" class="activecard2">
    // <div class="active_card_container">
    //     <div class="active_card" >
    //         <i class="fas fa-heart fa-lg active_card_heart"></i>
    //         <div class="active_card_div">
    //             <img src="${o.fImgPath}" alt="" class="active_card_img">
    //         </div>
    //         <div class="active_card_info">
    //             <p>${o.fActivityDate}</p>
    //             <p class="active_card_title">${o.fActName}</p>
    //             <div class="active_card_location_div">
    //                 <img src="img/929497.svg" class="active_card_location">
    //                 <p>${o.fActLocation}</p>
    //             </div>
    //         </div>
    //     </div>
    // </div></a>`;
    // }

    // 搜尋結果
    //todo 圖片路徑 目前是寫死的 如有更新後需更改為動態
    const htmlActSearchgo = (o) => {
        return `
        
        <a  href="#activity/detail/${o.fId}" >
        <div class="active_card_container">
            <div class="active_card" >
                <i class="fas fa-heart fa-lg active_card_heart"></i>
                <div class="active_card_div">
                    <img src="http://localhost:3050/${o.fImgPath}" alt="" class="active_card_img">
                </div>
                <div class="active_card_info">
                    <p>${o.fActivityDate}</p>
                    <p class="active_card_title">${o.fActName}</p>
                    <div class="active_card_location_div">
                        <img src="img/929497.svg" class="active_card_location">
                        <p>${o.fActLocation}</p>
                    </div>
                </div>
            </div>
        </div></a>               
        `
    }

    //ActCardData
    //* ------------------------------------- 文字樣板 -------------------------------------
    const display_active = (o) => {
      
        ActCard.innerHTML = "";
        
        o.map(
            (e, index) => {
                
                //todo 
                {
                    ActCard.innerHTML += htmlActCard(e);
                }

            }
        )
        
    }


    const ActSeen = document.getElementById("activity_event_history")
    const actDetailSeen = document.getElementById("activity_detail_see")

    const display_active_seen = (o) => {
        ActSeen.innerHTML = "";
        actDetailSeen.innerHTML = "";
        o.map((e, index) => {
            ActSeen.innerHTML += htmlActCardseen(e);
            actDetailSeen.innerHTML += htmlActCardseen(e);
        })
    }

    const ActSearchresult = document.getElementById("activesearchresult");
    const Actforyou = document.getElementById("activity_event_recommend");
    const display_active_foryou = (o) => {
        Actforyou.innerHTML = "";
        o.map(
            (e, index) => {
                Actforyou.innerHTML += htmlActCard(e);
            }
        )

    }

    const display_search_go = (o) => {
        ActSearchresult.innerHTML = "";
        o.map((e, index) => {

            ActSearchresult.innerHTML += htmlActSearchgo(e);
        })
    }

    const activeAwait = async () => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.active, {
                method: "GET", // http request method 
                headers: { // http headers
                    'Content-Type': 'application/json' // 請求的資料類型
                },
                // 以下跟身分認證有關，後端要使用session 要帶這幾項
                cache: 'no-cache',
                credentials: 'include',
            });
            // 用變數接 fetch結果的資料內容， 要用await等。
            let result = await response.json();

            display_active(result.data);
            likelistfromsql();
            // getactid();
        } catch (err) {
            console.log(err);
            // 錯誤處理
        }
    }
    activeAwait();
    // todo 為您推薦 
    const activeforyou = async () => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.activeforyou, {
                method: "GET", // http request method 
                headers: { // http headers
                    'Content-Type': 'application/json' // 請求的資料類型
                },
                // 以下跟身分認證有關，後端要使用session 要帶這幾項
                cache: 'no-cache',
                credentials: 'include',
            });
            // 用變數接 fetch結果的資料內容， 要用await等。
            let result = await response.json();

            display_active_foryou(result.data);

            getactid();
            likelistfromsql();
        } catch (err) {
            console.log(err);
            // 錯誤處理

        }
    }
    activeforyou();


    // 瀏覽過的活動
    const activeseenAwait = async () => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.activeseen, {
                method: "GET", // http request method 
                headers: { // http headers
                    'Content-Type': 'application/json', // 請求的資料類型
                    Authorization: localStorage.getItem("Cycle link token"),
                },
                // 以下跟身分認證有關，後端要使用session 要帶這幾項
                cache: 'no-cache',
                credentials: 'include',
            });
            // 用變數接 fetch結果的資料內容， 要用await等。
            let result = await response.json();
            //文字樣板
            display_active_seen(result.data);
            getactid();
            // *用 result  do something ...

        } catch (err) {
            console.log(err);
            // 錯誤處理

        }
    }
    activeseenAwait();



    //取的瀏覽紀錄的活動id 時間
    function getactid() {
        var selectactive = document.querySelectorAll(".activecard");
        var selectactivelike = document.querySelectorAll(".active_card_heart");
        var removelike = document.querySelectorAll(".actlikecolor");
        // var active_card_heart = document.querySelectorAll(".active_card_heart");
        let nowtime = new Date();
        let date = nowtime.toLocaleDateString();
        let datearr = date.split("/");
        if (datearr[1] < 10) {
            datearr[1] = "0" + datearr[1];
        }
        let newdate = datearr[0] + "/" + datearr[1] + "/" + datearr[2];
        let timesplit = nowtime.toTimeString().split(" ");
        let time = timesplit[0];
        let now = newdate + " " + time;
        now = now.split("/").join(",");

        let activeseenId;
        for (let i = 0; i < selectactive.length; i++) {
            selectactive[i].onclick = function (e) {
                let ahref = selectactive[i].href;
                var hrefsplit = ahref.split("/");
                activeseenId = hrefsplit[hrefsplit.length - 1];
                activeinsertseensql(activeseenId, now);
            }
        }
        let activelikeid;
        for (let i = 0; i < selectactivelike.length; i++) {


            selectactivelike[i].onclick = function (e) {

                e.preventDefault();
                e.stopPropagation();
                let ahref = selectactive[i].href;
                var hrefsplit2 = ahref.split("/");
                activelikeid = hrefsplit2[hrefsplit2.length - 1];
                if (selectactivelike[i].classList.contains("actlikecolor") == true) {
                    selectactivelike[i].classList.remove("actlikecolor");
                    remove(activelikeid);
                } else {
                    selectactivelike[i].classList.add("actlikecolor");
                    addActLikeToSQL(activelikeid, now);
                }

            }
        }

        function remove(activelikeid) {
            removeactlikesql(activelikeid);

        }
      
    };


    // activeinsertseenSQL 瀏覽過的資料寫入資料庫
    const activeinsertseensql = async (activeseenId, now) => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(`${serverURL.activeinsertseensql}${activeseenId}/${now}`, {
                method: "GET", // http request method 
                headers: { // http headers
                    'Content-Type': 'application/json', // 請求的資料類型
                    Authorization: localStorage.getItem("Cycle link token"),
                },
                // 以下跟身分認證有關，後端要使用session 要帶這幾項
                cache: 'no-cache',
                credentials: 'include',
            });
            // 用變數接 fetch結果的資料內容， 要用await等。
            let result = await response.json();
            //文字樣板
            // *用 result  do something ...

        } catch (err) {
            console.log(err);
            // 錯誤處理
        }
    }

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
    const ActCard = document.querySelector("#activity_event_top");
    //todo 刪除
    const removeactlikesql = async (activelikeid) => {
        try {
            console.log("================")
            console.log("activelikeid:", activelikeid);
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


    const ActCard2 = document.querySelector("#activity_event_recommend");

    //AJAX



    ActCardData2.map(
        (e, index) => {

            ActCard2.innerHTML += htmlActCard(e);
        }
    )
    /*---------------YM修改活動 */
    const likelistfromsql = async () => {
        try {
            let response = await fetch(serverURL.active + "likeListSQL", {
                method: "GET", // http request method
                headers: {
                    // http headers
                    Authorization: localStorage.getItem("Cycle link token"),
                },
                cache: "no-cache",
                credentials: "include",
            });
            let result = await response.json();

            // console.log("result:",result);
            let heart_arr = document.querySelectorAll(".active_card_heart ")

            for (let i = 0; i < heart_arr.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (heart_arr[i].parentNode.parentNode.parentNode.parentNode.href.split("il/")[1] == result[j].fId) {

                        heart_arr[i].classList.add("actlikecolor");
                    }
                }
            }
        } catch (err) {
            console.log(err);
            // 錯誤處理
        }
    }






    //------------------------------------------------------  

    document.querySelectorAll(".active_card_container").forEach(
        (item, index) => {
            item.addEventListener(
                "click",
                (event) => {
                    location.hash = `#activity/detail`
                }
            )
        }
    )
    this.render = () => {
        activeseenAwait()
    };
    this.display_active = display_active;
    this.reRender = () => {
        activity_card_ALL.classList.remove("hide");
        searchAnsContainer.classList.add("hide");
        search_container.classList.add("search_hidden");

        activity_main.style.display = 'flex';

        // searchtext.value = "";
        activity_option.value = ""
    }
}

let ActivityIndex;

//* 利用 hash , 如下

// * -------------------------------- hash -------------------------------- //

const activityChangeHash = () => {
    if (location.hash === "#activity") {
        // ActivityIndex.render();
        ActivityIndex = new ClsActivity();
        ActivityIndex.reRender();
    }
}

window.addEventListener("hashchange", activityChangeHash);
window.addEventListener("load", activityChangeHash);