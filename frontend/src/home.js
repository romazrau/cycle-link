// import {
//   serverURL
// } from "./api.js";

const GetHomePageBannerActivity = async () => {
  try {
    // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
    // *用變數接 fetch 結果 ，要用await等。
    let response = await fetch(serverURL.homePages, {
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
    let banner = result.data.banner;
    let recent = result.data.recent;
    let imgs = result.data.imgs;
    home_picturesbox.innerHTML = home_picturesItem(imgs)
    //大圖匯入
    document.querySelector(".home_top_event").innerHTML = "";
    banner.map(function (e, index) {
      document.querySelector(".home_top_event").innerHTML += home_bannerimgs(e)
    })
    //輪播
    CarouselBanner(banner);
    recent_activities.innerHTML = "";
    recent.map(
      (e, index) => {
        recent_activities.innerHTML += home_recent_activities(e);
      }
    )
  } catch (err) {
    console.log(err);
    // 錯誤處理
  }
}
GetHomePageBannerActivity();

const GetHomePageWeather = async () => {
  try {
    // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
    // *用變數接 fetch 結果 ，要用await等。
    let response = await fetch(serverURL.homePages + "weather", {
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


    // console.group("----------------")
    //顯示天氣
    // console.log(result)
    HomePageWeather(result);

    // console.groupEnd("----------------")



  } catch (err) {
    console.log(err);
    // console.groupEnd("----------------")

  }
}

GetHomePageWeather();

function HomePageWeather(data) {
  let city = data.records.locations[0].locationsName;
  let WeatherTitle = document.querySelector(".home_recent_weather_title h2");
  WeatherTitle.innerHTML = city;
  //區域:District 大安區
  let District = data.records.locations[0].location[7].locationName;
  WeatherTitle.innerHTML += District;
  //大安區 天氣篩選 wx天氣,PoP12h降雨機率,T溫度
  let locationData = data.records.locations[0].location[7];
  let neededElements = [];
  const weatherElements = locationData.weatherElement.reduce(
    (neededElements, item) => {
      if (['Wx', 'PoP12h', 'T', 'WS', 'RH'].includes(item.elementName)) {
        neededElements[item.elementName] = item
      }
      return neededElements;
    }, {}
  );
  // console.log("weatherElements:", weatherElements);

  var day_list = ['日', '一', '二', '三', '四', '五', '六'];
  let nowtime = new Date();
  let date = nowtime.toLocaleDateString();
  let timesplit = nowtime.toTimeString().split(" ");
  let time = timesplit[0];
  let day = nowtime.getDay();
  let hour = time.split(":")[0];
    
  let WeatherTitle2 = document.querySelector(".home_recent_weather_title p");
  let WeatherTitleimg = document.getElementById("weather_img");
  WeatherTitle2.innerHTML = date +" 星期" + day_list[day] + " "
  WeatherTitle2.innerHTML += hour + "時<br/>"
  WeatherTitle2.innerHTML += weatherElements.Wx.time[0].elementValue[0].value;
  let weitherid = weatherElements.Wx.time[0].elementValue[1].value;
  // console.log(weitherid);
  if (weitherid == '01' || weitherid == '02' || weitherid == '03') {
    WeatherTitleimg.src = "/img/sun.svg";
  } else if (weitherid == '04' || weitherid == '05' || weitherid == '06') {
    WeatherTitleimg.src = "/img/cloud.svg";
  } else {
    WeatherTitleimg.src = "/img/rain.svg";
  }
  
  display_home_weather(weatherElements.Wx, weatherElements.T,day);
  //天氣描述:weatherElements.Wx.time[0].elementValue[0].value
  //代碼:weatherElements.Wx.time[0].elementValue[1].value
  
}


var bannerdata

function CarouselBanner(data) {
  let home_bannerboxs = $(".home_bannerbox")
  let postion = -1;
  bannerdata = data



  setInterval(function () {
    postion++;
    if (postion > data.length - 1)
      postion = 0
    home_bannerboxs.eq(postion).css("display", "block").siblings().css("display", "none");
  }, 5000)
}
setInterval(getBannerTime, 1000)


function getBannerTime(t, index) {

  let time = new Date();
  let nowTime = time.getTime()


  for (let i = 0; i < bannerdata.length; i++) {
    let endTime = Date.parse(bannerdata[i].fActivityDate); //"字串時間"
    let offsetTime = (endTime - nowTime) / 1000; // ** 以秒為單位

    let sec = parseInt(offsetTime % 60); // 秒
    let min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
    let hr = parseInt(offsetTime / 60 / 60/60) ; // 時
    let day = parseInt((offsetTime / 60 / 60) / 24)
    if(hr<10)
    {hr="0"+hr}
    if(min<10)
    {min="0"+min}
    if(sec<10)
    {sec="0"+sec}

    $(".home_top_event_p2").eq(i).html(`倒數${day}天${hr}時${min}分${sec}秒`)

  }

}

//---------------------------字串樣板--------------------------//
const home_bannerimgs = (o) => {
  return `
  <div class="home_bannerbox">
    <img src="http://localhost:3050/${o.fImgPath}" alt=""> 
    <p class="home_top_event_p">${o.fActName}</p>  
    <p class="home_top_event_p2"></p>                 
  </div>`
}

const home_recent_activities = (o) => {

  return `
  <div class="home_recent_activity_item">
    <div class="home_recent_activity_item_img">
    <a href="#activity/detail/${o.fId}"><img src="http://localhost:3050/${o.fImgPath}"></a></div>
    <div class="home_recent_activity_item_content">
        <a href="#activity/detail/${o.fId}">${o.fActName}</a>
        <p>${o.fActivityDate}</p>
        <div class="home_recent_activity_item_content_btn">
            <i class="far fa-heart home_activity_icon"></i>
            <i class="far fa-share-square home_activity_icon"></i>
            <button>參加</button>
        </div>
    </div>
  </div>`
}

const recent_activities = document.querySelector(".home_recent_activities");

//------------------------------圖片---------------------------
const home_picturesbox = document.querySelector(".home_show_activities_wrapper");


const home_picturesItem = (o) => {

  return `
 <div class="home_showAct_left">
                        <div class="home_left_top">
                        <a href="#activity/detail/${o[0].fId}"><img src='http://localhost:3050/${o[0].fImgPath}' class="home_left_top"></a>
                        </div>
                        <div class="home_left_bottom">
                            <div class="home_left_bottom_item1">
                            <a href="#activity/detail/${o[1].fId}"><img src='http://localhost:3050/${o[1].fImgPath}'></a>
                            </div>
                            <div class="home_left_bottom_item2">
                            <a href="#activity/detail/${o[2].fId}"><img src='http://localhost:3050/${o[2].fImgPath}'></a>
                            </div>
                        </div>
                    </div>
                    <div class="home_showAct_right">
                        <div class="home_right_left">
                        <a href="#activity/detail/${o[3].fId}"><div class="home_right_sm"><img src='http://localhost:3050/${o[3].fImgPath}'></a>
                        </div>
                        <a href="#activity/detail/${o[4].fId}"><div class="home_right_lg"><img src='http://localhost:3050/${o[4].fImgPath}'></a></div>
                        </div>
                        <div class="home_right_right">
                            <div class="home_right_lg">
                            <a href="#activity/detail/${o[5].fId}"><img src='http://localhost:3050/${o[5].fImgPath}'></a>
                            </div>
                            <div class="home_right_sm">
                            <a href="#activity/detail/${o[6].fId}"><img src='http://localhost:3050/${o[6].fImgPath}'></a></div>
                        </div>
                    </div>`
}
//todo
const display_home_weather = (o, t,day) => {

  o.time.map((e, index) => {
        // console.log(e.elementValue[1].value,index)
        if (index % 2 == 0)
          {
            document.querySelector(".Wcontainer").innerHTML += home_weather(e.elementValue[1].value);
            var day_list = ['日', '一', '二', '三', '四', '五', '六'];
            // for(let i=0;i<)
            let homepage_weather_day =document.querySelectorAll(".homepage_weather_day")
            document.querySelectorAll(".homepage_weather_day")[homepage_weather_day.length-1].innerHTML="星期"+day_list[day]
            day++;
            // if(day>day_list.length)
            //  day=0;
          }
    }    ),
    t.time.map((e, index) => {
      // console.log(e.elementValue[0].value);
      // if(index%2 == 0) 
      document.querySelector(".WTcontainer").innerHTML += home_weather_t(e.elementValue[0].value,index);
    })
};

// o.T.map((e,index) =>{ 
//   document.querySelector(".Wcontainer").innerHTML+= home_weather(e);
//   }
// )}

const home_weather = (o,index) => {
  var day_list = ['日', '一', '二', '三', '四', '五', '六'];
  let nowtime = new Date();
  let day = nowtime.getDay();
  console.log(index);
  
  if (o == '01' || o == '02' || o == '03') {
    return `
    
    <div class="divtest_weather" >
        <div class="homepage_weather_day"></div>
        <div class="weather_img_css" style="width:50px; height:50px ; margin:10px 0" >
          <img id="" src="/img/sun.svg"" alt="">
        </div>
    </div>
    `
  } else if (o == '04' || o == '05' || o == '06' || o == '07') {
    return `
    <div class="divtest_weather" >
        <div class="homepage_weather_day"></div>
        <div class="weather_img_css" style="width:50px; height:50px ; margin:10px 0" >
          <img id="" src="/img/cloud.svg"" alt="">
        </div>
    </div>
    `
  } else {
    return `
    <div class="divtest_weather" >
        <div class="homepage_weather_day"></div>
        <div class="weather_img_css" style="width:50px; height:50px ; margin:10px 0" >
          <img id="" src="/img/rain.svg"" alt="">
        </div>
    </div>
    `
  }

}

//todo 折線圖
const home_weather_line = (o) => {
  return ``
}
const home_weather_t = (o) => {
  return `
    <div class="divtest_Tweather">
      <div>${o}℃</div>
    </div>
  `
}
// <div class="weather_img_css" style="width:50px; height:50px">
//       <img  src="" alt="" >
//     </div>
//${o.Wx.time.elementValue[1].value}
// ${o.T.time.elementValue.value}




// const NewsRightBox=document.querySelector(".home_div_news")

// const HomePage_NewsRightBox= (o)=>{
//   return `<div>
//   <img src="img/qk1.png" class="home_icon" alt="">
//   <h3>${o.fActName}</h3>

//   <img src="./img/qk2.png" class="home_icon" alt="">
// </div>
// <img src="${o.fImgPath}" class="home_div_news_img" alt="">
// <p>${o.fNewsContent}
// </p>
// <a href="${o.fNewsLink}">See more...</a>   `

// }

// let NewsRightData=[{
//   fActName: "有機咖啡豆",
//   fImgPath: "img/coffee.jpg", 
//   fNewsContent:"咖啡越新鮮越好…對吧？這個說法其實不完全對。雖然沒有人想喝過期的老豆，但烘焙好的咖啡豆直接沖煮，其風味一定會讓你失望，因為咖啡這時仍在大量排氣的狀態。不論你是烘焙者還是沖煮者，你都必須了解排氣，本文讓我們了解什麼是排氣（養豆），排氣如何影響你沖的咖啡、以及要如何進行這些動作。",
//   fNewsLink:"#",
// },]
// NewsRightData.map((e,index) =>{
//   NewsRightBox.innerHTML+=HomePage_NewsRightBox(e);
// })