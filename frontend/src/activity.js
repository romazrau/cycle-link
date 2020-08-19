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







    const htmlActCard = (o) => {
        return ` 
    <div id="ActCard" class="activity_event_card">
    <img src="${o.imgPath}" class="activity_event_img" alt="">
    <p>${o.date}</p>
    <h3>${o.title}</h3>
    <div class="activity_event_card_icons">
    <div>
    <img src="img/icon1.svg" class="activity_icon" alt=""><span>${o.count}</span>
    </div><div>
    <img src="img/icon_user.svg" class="activity_icon" alt=""><span>${o.member}</span>
    </div><div>
    <img src="img/icon_gps.svg" class="activity_icon" alt=""><span>${o.local}</span>
    </div>
    </div>
    </div>`;

    }

    const ActCard = document.querySelector(".activity_event");

    //AJAX
    let ActCardData = [{
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
        member: "林志引",
        local: "福隆"
    },
    {
        imgPath: "img/event2.jpg",
        date: "Sunday, June 20,2010,08:30",
        title: "螢光夜跑",
        count: 100,
        member: "王曉明",
        local: "新北大道"
    },
    {
        imgPath: "img/event3.jpg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 99,
        member: "洲仔於",
        local: "布袋漁港"
    },
    {
        imgPath: "img/event4.jpg",
        date: "Sunday, July 30,2020,10:30",
        title: "飢餓三十！",
        count: 500,
        member: "時間管理大師",
        local: "桃園"
    }

    ]


    ActCardData.map(
        (e, index) => {
            ActCard.innerHTML += htmlActCard(e);
        }
    )


    //------------------------------------------------------

    const htmlActCard2 = (o) => {
        return ` 
<div id="ActCard2">
<img src="${o.imgPath}" class="activity_event_img" alt="">
<p>${o.date}</p>
<h3>${o.title}</h3>
<img src="img/icon1.svg" class="activity_icon" alt=""><span>${o.count}</span>
</div>`;

    }

    const ActCard2 = document.querySelector(".activity_event2");

    //AJAX
    let ActCardData2 = [{
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
        member: "彌勒佛",
        local: "烏石港"
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
        member: "彌勒佛",
        local: "烏石港"
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
        member: "彌勒佛",
        local: "烏石港"
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
        member: "彌勒佛",
        local: "烏石港"
    }

    ]


    ActCardData2.map(
        (e, index) => {
            ActCard2.innerHTML += htmlActCard(e);
        }
    )

    //------------------------------------------------------

    const HisAct = document.querySelector(".activity_event_history2")

    let HisActData = [{
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
        member: "林志引",
        local: "福隆"
    },
    {
        imgPath: "img/event2.jpg",
        date: "Sunday, June 20,2010,08:30",
        title: "螢光夜跑",
        count: 100,
        member: "王曉明",
        local: "新北大道"
    },
    {
        imgPath: "img/event3.jpg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 99,
        member: "洲仔於",
        local: "布袋漁港"
    },
    {
        imgPath: "img/event4.jpg",
        date: "Sunday, July 30,2020,10:30",
        title: "飢餓三十！",
        count: 500,
        member: "時間管理大師",
        local: "桃園"
    }
    ]

    HisActData.map(
        (e, index) => {
            HisAct.innerHTML += htmlActCard(e);
        }
    )

    // #activity/detail

    document.querySelectorAll("#ActCard").forEach(
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