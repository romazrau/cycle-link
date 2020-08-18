let HomeBannerdata =[
  {
    fImagePath:"img/A2.jpg",
    fTitle:"福隆 淨灘活動",
    fTime:"2 天 08 : 28 : 06",

  },
  {
    fImagePath:"img/A1.jpg",
    fTitle:"小琉球 淨灘活動",
    fTime:"4 天 01 : 22 : 06",

  }
]


function HomeBanner(data) {
  let postion = 0;
  function scrollPic() {
    if (postion > data.length - 1) {
      postion = 0;
      
    }
        document.getElementById("A1").src = data[postion].fImagePath;
        document.getElementById("home_top_event_p").innerHTML=data[postion].fTitle+"</br>"+data[postion].fTime;
    postion++;
      }
  setInterval(scrollPic, 2000);
}

const Home = new HomeBanner(HomeBannerdata);

document.querySelector(".home_top_event").innerHTML=`<img src="${HomeBannerdata[0].fImagePath}" id="A1">
<p id="home_top_event_p">${HomeBannerdata[0].fTitle+"</br>"+HomeBannerdata[0].fTime}</p>`






const HomePage_BuyItemCard =(o)=>{
  
  return `
  <div class="home_market_item_sell">
           <img src="${o.fImagePath}" class="home_market_item_img">
           <h3>${o.fTitle}</h3>
           <p> ${o.fContent}</p>
           <img src="${o.fIconPath}" class="home_dollar_imgs" alt=""><span>${o.fCount}</span>
   </div>`
  
}

// let HomePageItemdata = [
//   {
//   fImagePath: "img/item5.jpg",
//   fTitle: "抓寶神器",
//   fContent: "不論走路、騎車、開車都能快速抓怪，讓您輕鬆快速晉級，可設定自動領取補給站，可設定自動丟擲。",
//   fIconPath: "img/dollar.png",
//   fCount:"1,000",
// },
// {
//   fImagePath: "img/item2.jpg",
//   fTitle: "徵 杯子",
//   fContent: "杯是種大多數情況下用來盛載液體的器皿，通常用玻璃、瓷或不鏽鋼製造，在餐廳打包飲料，則常用紙杯或膠杯盛載。 杯多呈圓柱形，上面開口，中空，以供盛物。",
//   fIconPath: "img/dollar.png",
//   fCount:"1,000",
// },
// {
//   fImagePath: "img/item5.JPG",
//   fTitle: "B&O H4",
//   fContent: "純粹演繹。優美音質。時尚耳罩式耳機配備 Voice Assistant，可提供長時間的舒適感受和長達 19 小時的播放時間。",
//   fIconPath: "img/dollar.png",
//   fCount:"1,000",
// },
// {
//   fImagePath: "img/item4.jpeg",
//   fTitle: "徵 奴才",
//   fContent: "在你家裡，很明顯貓才是你的主子。你卻心甘情願的給它鏟屎，買好吃的，隨便它在家裡跑跑跳跳、肆意破壞。只要它開心，願意讓你擼擼毛就好。",
//   fIconPath: "img/dollar.png",
//   fCount:"1,000",
// },

// ]



// const BuyItemCard = document.querySelector(".home_market_item");

// HomePageItemdata.map(
//   (e, index) => {
//     BuyItemCard.innerHTML += HomePage_BuyItemCard(e);
//   }
// )

// const NewsItemBox=document.querySelector(".home_div_event")
// let HomePageNewsItemdata = [
//   {
    
//     fTitle: "潛水撿垃圾，愛海洋！",
//     fTime: "2020/07/23 13:00", 
//      fNewsItemLink:"#",
// },
// {
  
//   fTitle: "淨山撿垃圾，愛地球！",
//   fTime: "2020/08/13 13:00", 
//   fNewsItemLink:"#",
// },
// ]
// const HomePage_NewsItem =(o,index)=>{
 
//  return `
//  <div class="home_div_event_2">
//   <div class="home_div_event_num"
//       style="border-radius: 5px 5px 0px 0px;margin-bottom: 2px;">
//       <p>${index+1}</p>
//   </div>
//   <div class="home_div_event_text">
//       <a href="${o.fNewsItemLink}">${o.fTitle} 於 ${o.fTime} 開始</a>
//   </div>
// </div>`
// }


// HomePageNewsItemdata.map(
//   (e, index) => 
//   {
  
//     NewsItemBox.innerHTML +=HomePage_NewsItem(e,index);
//   }
// )
  


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

