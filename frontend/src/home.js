function ClsHome() {
  var k = 0;
  var img = new Array();
  img[0] = "img/A2.jpg";
  img[1] = "img/A1.jpg";

  function scrollPic() {
    if (k > img.length - 1) {
      k = 0;
    }
    for (var i = 0; i < img.length; i++) {
      if (i == k) {
        document.getElementById("A1").src = img[i];
      }
    }
    k++;
  }
  setInterval(scrollPic, 5000);
}
const Home = new ClsHome();


const HomePageItemCard =(o)=>{
  
  return `
  <div class="home_market_item_sell">
           <img src="${o.fImagePath}" class="home_market_item_img">
           <h3>${o.fTitle}</h3>
           <p> ${o.fContent}</p>
           <img src="${o.fIconPath}" class="home_dollar_imgs" alt=""><span>${o.fCount}</span>
   </div>`
  
}

let HomePageItemdata = [
  {
  fImagePath: "img/item5.jpg",
  fTitle: "抓寶神器",
  fContent: "不論走路、騎車、開車都能快速抓怪，讓您輕鬆快速晉級，可設定自動領取補給站，可設定自動丟擲。",
  fIconPath: "img/dollar.png",
  fCount:"1,000",
},
{
  fImagePath: "img/item2.jpg",
  fTitle: "徵 杯子",
  fContent: "杯是種大多數情況下用來盛載液體的器皿，通常用玻璃、瓷或不鏽鋼製造，在餐廳打包飲料，則常用紙杯或膠杯盛載。 杯多呈圓柱形，上面開口，中空，以供盛物。",
  fIconPath: "img/dollar.png",
  fCount:"1,000",
},
{
  fImagePath: "img/item5.JPG",
  fTitle: "B&O H4",
  fContent: "純粹演繹。優美音質。時尚耳罩式耳機配備 Voice Assistant，可提供長時間的舒適感受和長達 19 小時的播放時間。",
  fIconPath: "img/dollar.png",
  fCount:"1,000",
},
{
  fImagePath: "img/item4.jpeg",
  fTitle: "徵 奴才",
  fContent: "在你家裡，很明顯貓才是你的主子。你卻心甘情願的給它鏟屎，買好吃的，隨便它在家裡跑跑跳跳、肆意破壞。只要它開心，願意讓你擼擼毛就好。",
  fIconPath: "img/dollar.png",
  fCount:"1,000",
},

]
const ItemCard = document.querySelector(".home_market_item");
HomePageItemdata.map(
  (e, index) => {
    ItemCard.innerHTML += HomePageItemCard(e);
  }
)