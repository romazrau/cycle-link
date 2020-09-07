import {
  serverURL
} from "./api.js";

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
      let banner =result.data.banner;
      let recent =result.data.recent;
      let imgs =result.data.imgs;
      
      home_picturesbox.innerHTML=home_picturesItem(imgs)

      const Home = new HomeBanner(banner);
      // display_information(data);
      
      document.querySelector(".home_top_event").innerHTML = 
      `<img src="${banner[0].fImgPath}" id="A1">
        <p id="home_top_event_p">${banner[0].fActName}</p></br>
        <p id="home_top_event_p2">${banner[0].fActivityDate}</p>`
     
          
        
     
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












function HomeBanner(data) {
  let postion = 0;
  
  var timearr=[]
  for(let i=0;i<data.length;i++)
  {
    timearr.push(data[i].fActivityDate)
  }
  console.log("timearr:",timearr);

  function scrollPic() {
    if (postion > data.length - 1) {
      postion = 0;

    }
    getBannerTime(postion,timearr)
     
    document.getElementById("A1").src =`${data[postion].fImgPath}`;
    document.getElementById("home_top_event_p").innerHTML = data[postion].fActName ;


    // getBannerTime(postion);
    postion++;
  }
  setInterval(scrollPic, 5000);
  
}



function getBannerTime(t,arr)
{
  if(Interval!=null)
    clearInterval(Interval);
    
  var Interval=setInterval(function(){
  let time = new Date();
  let nowTime = time.getTime()
  let endTime = Date.parse(arr[t]);//"字串時間"
  let offsetTime = (endTime - nowTime) / 1000; // ** 以秒為單位

  let sec = parseInt(offsetTime % 60); // 秒
  let min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
  let hr = parseInt(offsetTime / 60 / 60)%60; // 時
  let day = parseInt((offsetTime / 60 / 60)%24)
  document.getElementById("home_top_event_p2").innerHTML =day+" 天 "+hr+" 時 "+min+" 分 "+sec+" 秒 "
},1000)

}




//---------------------------字串樣板--------------------------//

const home_recent_activities = (o) => {

  return `
  <div class="home_recent_activity_item">
    <div class="home_recent_activity_item_img">
    <a href="#activity/detail/${o.fId}"><img src="${o.fImgPath}"></a></div>
    <div class="home_recent_activity_item_content">
        <a href="#activity/detail/${o.fId}">${o.fActName}</a>
        <p>${o.fActivityDate}</p>
        <div class="home_recent_activity_item_content_btn">
            <i class="far fa-heart home_activity_icon"></i>
            <i class="far fa-share-square home_activity_icon"></i>
            <button>立即參加</button>
        </div>
    </div>
  </div>`
}





const recent_activities = document.querySelector(".home_recent_activities");


//------------------------------圖片---------------------------
const home_picturesbox=document.querySelector(".home_show_activities_wrapper")


const home_picturesItem =(o)=>{

 return `
 <div class="home_showAct_left">
                        <div class="home_left_top">
                        <a href="#activity/detail/${o[0].fId}"><img src=${o[0].fImgPath} class="home_left_top"></a>
                        </div>
                        <div class="home_left_bottom">
                            <div class="home_left_bottom_item1">
                            <a href="#activity/detail/${o[1].fId}"><img src=${o[1].fImgPath}></a>
                            </div>
                            <div class="home_left_bottom_item2">
                            <a href="#activity/detail/${o[2].fId}"><img src=${o[2].fImgPath}></a>
                            </div>
                        </div>
                    </div>
                    <div class="home_showAct_right">
                        <div class="home_right_left">
                        <a href="#activity/detail/${o[3].fId}"><div class="home_right_sm"><img src=${o[3].fImgPath}></a>
                        </div>
                        <a href="#activity/detail/${o[4].fId}"><div class="home_right_lg"><img src=${o[4].fImgPath}></a></div>
                        </div>
                        <div class="home_right_right">
                            <div class="home_right_lg">
                            <a href="#activity/detail/${o[5].fId}"><img src=${o[5].fImgPath}></a>
                            </div>
                            <div class="home_right_sm">
                            <a href="#activity/detail/${o[6].fId}"><img src=${o[6].fImgPath}></a></div>
                        </div>
                    </div>`
}




  
 



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

