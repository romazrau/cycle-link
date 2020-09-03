let HomeBannerdata = [{
    fImagePath: "img/home_topEvent_02.jpg",
    fTitle: "世界環境清潔日",
    fTime: "2 天 08 : 28 : 06",

  },
  {
    fImagePath: "img/home_topEvent_01.jpg",
    fTitle: "保護海龜",
    fTime: "4 天 01 : 22 : 06",

  }
]


function HomeBanner(data) {
  let postion = 0;

  function scrollPic() {
    if (postion > data.length - 1) {
      postion = 0;

    }
    document.getElementById("A1").src = data[postion].fImagePath;
    document.getElementById("home_top_event_p").innerHTML = data[postion].fTitle + "</br>" + data[postion].fTime;
    postion++;
  }
  setInterval(scrollPic, 5000);
}

const Home = new HomeBanner(HomeBannerdata);

document.querySelector(".home_top_event").innerHTML = `<img src="${HomeBannerdata[0].fImagePath}" id="A1">
<p id="home_top_event_p">${HomeBannerdata[0].fTitle+"</br>"+HomeBannerdata[0].fTime}</p>`




//---------------------------字串樣板--------------------------//

const home_recent_activities = (o) => {

  return `
  <div class="home_recent_activity_item">
    <div class="home_recent_activity_item_img">
        <img src="${o.fImagePath}"></div>
    <div class="home_recent_activity_item_content">
        <a href="#activity/detail">${o.fActName}</a>
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
  fImagePath:"./img/home02.jpg",
  fActName:"世界環境日",
  fActivityDate:"2020/08/20 14:00"
  },
  {
    fImagePath:"./img/home03.jpg",
  fActName:"大安區丹堤讀書會",
  fActivityDate:"2020/08/20 19:00"

  }
]



const recent_activities = document.querySelector(".home_recent_activities");

home_recent_activities_data.map(
  (e, index) => {
    recent_activities.innerHTML += home_recent_activities(e);
  }
)
//------------------------------圖片---------------------------
const home_picturesbox=document.querySelector(".home_show_activities_wrapper")
let  home_picturesdata = [
  {
    fImagePath:"./img/home04.JPG"
},{
  fImagePath:"./img/home05.JPG"
},{
  fImagePath:"./img/home06.JPG"
},{
  fImagePath:"./img/home07.JPG"
},{
  fImagePath:"./img/home08.JPG"
},{
  fImagePath:"./img/home08.JPG"
},{
  fImagePath:"./img/home07.JPG"
}
]

const home_picturesItem =(o)=>{

 return `
 <div class="home_showAct_left">
                        <div class="home_left_top">
                            <img src=${o[0].fImagePath} class="home_left_top">
                        </div>
                        <div class="home_left_bottom">
                            <div class="home_left_bottom_item1">
                                <img src=${o[1].fImagePath}>
                            </div>
                            <div class="home_left_bottom_item2">
                                <img src=${o[2].fImagePath}>
                            </div>
                        </div>
                    </div>
                    <div class="home_showAct_right">
                        <div class="home_right_left">
                            <div class="home_right_sm"><img src=${o[3].fImagePath}></div>
                            <div class="home_right_lg"><img src=${o[4].fImagePath}></div>
                        </div>
                        <div class="home_right_right">
                            <div class="home_right_lg">
                                <img src=${o[5].fImagePath}>
                            </div>
                            <div class="home_right_sm"><img src=${o[6].fImagePath}></div>
                        </div>
                    </div>`
}

home_picturesbox.innerHTML=home_picturesItem(home_picturesdata)


  
 



// const NewsRightBox=document.querySelector(".home_div_news")

// const HomePage_NewsRightBox= (o)=>{
//   return `<div>
//   <img src="img/qk1.png" class="home_icon" alt="">
//   <h3>${o.fTitle}</h3>

//   <img src="./img/qk2.png" class="home_icon" alt="">
// </div>
// <img src="${o.fImagePath}" class="home_div_news_img" alt="">
// <p>${o.fNewsContent}
// </p>
// <a href="${o.fNewsLink}">See more...</a>   `

// }

// let NewsRightData=[{
//   fTitle: "有機咖啡豆",
//   fImagePath: "img/coffee.jpg", 
//   fNewsContent:"咖啡越新鮮越好…對吧？這個說法其實不完全對。雖然沒有人想喝過期的老豆，但烘焙好的咖啡豆直接沖煮，其風味一定會讓你失望，因為咖啡這時仍在大量排氣的狀態。不論你是烘焙者還是沖煮者，你都必須了解排氣，本文讓我們了解什麼是排氣（養豆），排氣如何影響你沖的咖啡、以及要如何進行這些動作。",
//   fNewsLink:"#",
// },]
// NewsRightData.map((e,index) =>{
//   NewsRightBox.innerHTML+=HomePage_NewsRightBox(e);
// })