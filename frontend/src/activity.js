function ClsActivity() {

    // *second nav bar
    let pageY = window.pageYOffset;
    const activityNavbar = document.querySelector("#activity_navbar");
    window.addEventListener(
        'scroll',
        () => {
            if (window.pageYOffset - pageY > 0) {
                activityNavbar.classList.remove("transYsWidthTo0Bottom");
            } else {
                activityNavbar.classList.add("transYsWidthTo0Bottom");

            }

            pageY = window.pageYOffset;
        }
    );




    const htmlActSearch = (o) => {
        return ` 
        <option value="clearsea">${o.tag}</option>`;
    }
    const ActSearch = document.querySelector("#activity_option");


    let ActSearchData = [{
            tag: "淨海"
        },
        {
            tag: "淨山"
        },
        {
            tag: "路跑"
        },
    ]

    ActSearchData.map(
        (e, index) => {
            ActSearch.innerHTML += htmlActSearch(e);
        }
    )


    //*進階搜尋區 ---------------------------------------------------------
    //show
    document.querySelector("#activity_advence_show").addEventListener(
        "click",
        () => {
            document.querySelector(".activity_advence_search_container").classList.toggle("hide");
            document.querySelector(".activity_advence_t").classList.toggle("upside_down")
        }
    );


    //日期
    



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
    document.querySelector('#active_advance_search_city').innerHTML = data2CityCheckbox(activityCityData);







    // 進階搜尋_DA
    //抓取地址
    var btncity = document.getElementById("search_city");
    var btncitydetial = document.getElementById("search_citydetial");
    btncity.addEventListener('click', function () {
        btncity.classList.add("search_hidden");
        btncitydetial.classList.remove("search_hidden");
    });
    var list = document.getElementsByTagName("li");
    var searchcitytext = "";
    var btncitytext = document.getElementById("search_city_text");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener('click', function () {
            // searchcitytext = this.innerHTML;
            btncitydetial.classList.add("search_hidden");
            btncity.classList.remove("search_hidden");
            btncitytext.innerHTML = this.innerHTML;
        })
    }
    // ----------------------------------------------------------------
    var btndate = document.getElementById("search_date");
    var btndatedetial = document.getElementById("search_datedetial");
    btndate.addEventListener('click', function () {
        btndate.classList.add("search_hidden");
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
                startdate = dateText;
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
            maxDate: "+1m"
        });
        
        $("#ac_date_end_from").datepicker({
            onSelect: function (dateText, inst) {
                var dateAsString = dateText; //the first parameter of this function
                var dateAsObject = $(this).datepicker('getDate'); //the getDate method
                getenddate(dateAsString);
                displaydate();
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
            maxDate: "+1m"

        });
        
        

    });
    //抓取時間
    function getstartdate(startdate)
    {
        var startdatetext = document.getElementById("search_date_text");
        startdatetext.innerHTML ="起始日 <br>"+ startdate +'<br>';
    }
    
    function getenddate(enddate)
    {
        var enddatetext = document.getElementById("search_date_text");
        enddatetext.innerHTML += "結束日 <br>"+ enddate;
    }

    function displaydate(){
        btndatedetial.classList.add("search_hidden");
        btndate.classList.remove("search_hidden");
    }









    //* ------------------------------------- 文字樣板 -------------------------------------
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



    // const htmlActCard = (o) => {
    //     return ` 
    // <div id="ActCard" class="activity_event_card">
    // <img src="${o.imgPath}" class="activity_event_img" alt="">
    // <p>${o.date}</p>
    // <h3>${o.title}</h3>
    // <div class="activity_event_card_icons">
    // <div>
    // <img src="img/icon_gps.svg" class="activity_icon" alt=""><span>${o.local}</span>
    // </div>
    // </div>
    // </div>`;

    // }

    const ActCard = document.querySelector("#activity_event_top");

    //AJAX
    let ActCardData = [{
            imgPath: "img/event5.jpg",
            date: "2020/08/09",
            title: "國家地理路跑 - 世界地球日50週年",
            count: 999,
            member: "林志引",
            local: "大佳河濱公園"
        },
        {
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
        },
        {
            imgPath: "img/event12.png",
            date: "2020/10/03",
            title: "環保潛水隊-隊員招募中",
            count: 500,
            member: "時間管理大師",
            local: "東北角 - 龍洞"
        },
        {
            imgPath: "img/event8.png",
            date: "2020/11/04",
            title: "PUMA - 螢光夜跑",
            count: 500,
            member: "時間管理大師",
            local: "大佳河濱公園"
        }

    ]


    ActCardData.map(
        (e, index) => {
            ActCard.innerHTML += this.htmlActCard(e);
        }
    )


    //------------------------------------------------------

    // const htmlActCard2 = (o) => {
    //     return ` 
    // <div id="ActCard2">
    // <img src="${o.imgPath}" class="activity_event_img" alt="">
    // <p>${o.date}</p>
    // <h3>${o.title}</h3>
    // <img src="img/icon1.svg" class="activity_icon" alt=""><span>${o.count}</span>
    // </div>`;

    // }

    const ActCard2 = document.querySelector("#activity_event_recommend");

    //AJAX
    let ActCardData2 = [{
            imgPath: "img/event9.jpg",
            date: "2020/11/19",
            title: "城市獵人 - 生態公園夜觀",
            count: 999,
            member: "彌勒佛",
            local: "玉山國家公園"
        },
        {
            imgPath: "img/event10.jpg",
            date: "2020/08/20",
            title: "綠的手作坊 - 漂流木新生命",
            count: 999,
            member: "彌勒佛",
            local: "紅樹林"
        },
        {
            imgPath: "img/event11.png",
            date: "2020/10/16",
            title: "海洋危機，拯救機會",
            count: 999,
            member: "彌勒佛",
            local: "烏石港"
        }

    ]


    ActCardData2.map(
        (e, index) => {
            ActCard2.innerHTML += this.htmlActCard(e);
        }
    )

    //------------------------------------------------------




    const HisAct = document.querySelector("#activity_event_history")

    let HisActData = [{
            imgPath: "img/event2.jpg",
            date: "2020/09/26",
            title: "螢光夜跑",
            count: 100,
            member: "王曉明",
            local: "新北大道"
        },
        {
            imgPath: "img/event3.jpg",
            date: "2020/09/26",
            title: "潛水撿垃圾，愛海洋！",
            count: 99,
            member: "洲仔於",
            local: "布袋漁港"
        },
        {
            imgPath: "img/event4.jpg",
            date: "2020/09/26",
            title: "飢餓三十！",
            count: 500,
            member: "時間管理大師",
            local: "桃園"
        }
    ]

    HisActData.map(
        (e, index) => {
            HisAct.innerHTML += this.htmlActCard(e);
        }
    )


    // 跳轉 #activity/detail

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
}

const Activity = new ClsActivity();