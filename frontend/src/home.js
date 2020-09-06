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
      let banner =result.data.banner
      let recent =result.data.recent
      console.log("data:",result)
      

      const Home = new HomeBanner(banner);
      // display_information(data);
      
      document.querySelector(".home_top_event").innerHTML = `<img src="${banner[0].fImgPath}" id="A1">
        <p id="home_top_event_p">${banner[0].fActName+"</br>"+banner[0].fActivityDate}</p>`

     
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











// let HomeBannerdata = [{
//     fImgPath: "img/home_topEvent_02.jpg",
//     fActName: "世界環境清潔日",
//     fActivityDate: "2 天 08 : 28 : 06",

//   },
//   {
//     fImgPath: "img/home_topEvent_01.jpg",
//     fActName: "保護海龜",
//     fActivityDate: "4 天 01 : 22 : 06",

//   },
//   {
//     fImgPath: "img/home_topEvent_02.jpg",
//     fActName: "世界環境清潔日2",
//     fActivityDate: "2 天 08 : 28 : 06",

//   }


// ]


function HomeBanner(data) {
  let postion = 0;
  
  

  function scrollPic() {
    if (postion > data.length - 1) {
      postion = 0;

    }
    
     
    document.getElementById("A1").src =`${data[postion].fImgPath}`;
    document.getElementById("home_top_event_p").innerHTML = data[postion].fActName + "</br>" + data[postion].fActivityDate;
    postion++;
  }
  setInterval(scrollPic, 5000);
}



// getBannerTime(t)
// {



// }




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

let home_recent_activities_data = [
  {
  fImgPath:"./img/home02.jpg",
  fActName:"世界環境日",
  fActivityDate:"2020/08/20 14:00"
  },
  {
    fImgPath:"./img/home03.jpg",
  fActName:"大安區丹堤讀書會",
  fActivityDate:"2020/08/20 19:00"

  }
]



const recent_activities = document.querySelector(".home_recent_activities");


//------------------------------圖片---------------------------
const home_picturesbox=document.querySelector(".home_show_activities_wrapper")
let  home_picturesdata = [
  {
    fImgPath:"./img/home04.JPG"
},{
  fImgPath:"./img/home05.JPG"
},{
  fImgPath:"./img/home06.JPG"
},{
  fImgPath:"./img/home07.JPG"
},{
  fImgPath:"./img/home08.JPG"
},{
  fImgPath:"./img/home08.JPG"
},{
  fImgPath:"./img/home07.JPG"
}
]

const home_picturesItem =(o)=>{

 return `
 <div class="home_showAct_left">
                        <div class="home_left_top">
                            <img src=${o[0].fImgPath} class="home_left_top">
                        </div>
                        <div class="home_left_bottom">
                            <div class="home_left_bottom_item1">
                                <img src=${o[1].fImgPath}>
                            </div>
                            <div class="home_left_bottom_item2">
                                <img src=${o[2].fImgPath}>
                            </div>
                        </div>
                    </div>
                    <div class="home_showAct_right">
                        <div class="home_right_left">
                            <div class="home_right_sm"><img src=${o[3].fImgPath}></div>
                            <div class="home_right_lg"><img src=${o[4].fImgPath}></div>
                        </div>
                        <div class="home_right_right">
                            <div class="home_right_lg">
                                <img src=${o[5].fImgPath}>
                            </div>
                            <div class="home_right_sm"><img src=${o[6].fImgPath}></div>
                        </div>
                    </div>`
}

home_picturesbox.innerHTML=home_picturesItem(home_picturesdata)


  
 



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

