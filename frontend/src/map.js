import { serverURL } from "./api.js";

const MapActivityAwait = async () => {
  try {
      // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
      // *用變數接 fetch 結果 ，要用await等。
      let response = await fetch(serverURL.maps, {
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
      
      map_GetActivityList(result.data);
      // *用 result  do something ...

  } catch (err) {
      console.log(err);
      // 錯誤處理

  }
}
var ActivityList;
// MapActivityAwait();

function map_GetActivityList(o){

  ActivityList =o;
  console.log("func");
  console.log(ActivityList);
}





 function  ClsMap(){
  console.log(ActivityList);
  // const ActivityList =[
  //   {name:'2020國家地理路跑-世界地球日50週年',type:"路跑",lat:25.071874,lng: 121.5802,introduction:"路跑123457777777sddddd",src:"./img/tainan.jpg"},
  //   {name:'魚取漁囚 - 守護海洋行動體驗特展',type:"淨海",lat:25.007839,lng:121.494713,introduction:"資料淨海",src:"./img/tainan.jpg"},
  //   {name:'Plogging淨街慢跑-迪化街',type:"路跑",lat:25.133756, lng:121.36425,introduction:"路跑123457777777sddddd",src:"./img/tainan.jpg"},
  //   {name:'環保潛水隊-隊員招募中',type:"淨海",lat:25.283227,  lng:121.525955,introduction:"資料淨海",src:"./img/tainan.jpg"},
  //   {name:'臉部平權運動臺北國道馬拉松',type:"路跑",lat:24.979212, lng:121.624832,introduction:"路跑123457777777sddddd",src:"./img/tainan.jpg"},
  //   {name:'世界環境清潔日 相約海洋淨灘',type:"淨海",lat:25.230442,lng: 121.645088,introduction:"資料淨海",src:"./img/tainan.jpg"},
  //   {name:'天母二手市集',type:"環境",lat:25.117735, lng: 121.528873,introduction:"天母二手市集",src:"./img/tainan.jpg"},
  //   {name:'鳥兒哪裡去?2020/8/22八里濕地野鳥觀察',type:"淨山",lat:25.116668,lng: 121.383476 ,introduction:"鳥兒哪裡去?2020/8/22八里濕地野鳥觀察",src:"./img/tainan.jpg"},
  //   {name:'城市獵人-富陽生態公園夜觀',type:"淨山",lat:25.0151,lng:121.5593,introduction:"城市獵人-富陽生態公園夜觀",src:"./img/tainan.jpg"},
  //   {name:'荒野保護協會【2020工作假期】萬里工作日',type:"淨山",lat:25.178855,lng: 121.673241 ,introduction:"荒野保護協會【2020工作假期】萬里工作日",src:"./img/tainan.jpg"},
  //   {name:'大風吹，吹什麼? 園藝寶貝交換活動',type:"環境",lat:24.161435,lng: 120.670738,introduction:"園藝寶貝交換活動",src:"./img/tainan.jpg"},
  //   {name:'【愛海無距~誰是沙害者】~ 2020國際淨灘行動',type:"淨海",lat:24.175516,  lng:120.475388,introduction:" 2020國際淨灘行動",src:"./img/tainan.jpg"},
  //   {name:'2020筏子溪常態性淨溪',type:"淨海",lat:24.152464, lng: 120.621943,introduction:"2020筏子溪常態性淨溪",src:"./img/tainan.jpg"},
  //   {name:'2020植樹',type:"淨山",lat:24.167682, lng: 120.755196,introduction:"2020植樹",src:"./img/tainan.jpg"},
  //   {name:'PUMA環保愛地球 ',type:"環境",lat:24.193377, lng: 120.732193,introduction:"PUMA環保愛地球",src:"./img/tainan.jpg"},
  //   {name:'換換二手衣物換換愛',type:"環境",lat:24.17301, lng: 120.665932,introduction:"換換二手衣物換換愛",src:"./img/tainan.jpg"},
  //   {name:'綠的手作坊-漂流木新生命',type:"淨海",lat:24.20309,  lng:120.618896,introduction:"綠的手作坊-漂流木新生命",src:"./img/tainan.jpg"},
  //   {name:'偏鄉關懷，愛心捐物',type:"環境",lat:24.11126, lng: 120.642929,introduction:"偏鄉關懷，愛心捐物",src:"./img/tainan.jpg"}
    
    
  //   ]
    
    const CityList =[
    {name:'台北',lat:25.024018,lng:121.524239,introduction:"台灣的首都位於台北，這個充滿現代感的城市融合了日本殖民時期遺留的街巷、繁忙的購物商街及當代風格的建築。",src:"./img/tapei.jpg"},
    {name:'台中',lat:24.16179,lng:120.64639,introduction:"臺中市，通稱臺中，簡稱「中」，是中華民國的直轄市，臺灣六都之一，是中臺灣唯一的直轄市。",src:"./img/taichung.jpg"},
    {name:'台南',lat:22.990951,lng:120.189228,introduction:"臺南市，通稱臺南，簡稱「南」，是中華民國的直轄市，臺灣六都之一，位於臺灣西南部",src:"./img/tainan.jpg"},
    {name:'高雄',lat:22.618923,lng:120.315238,introduction:"高雄市，通稱高雄，簡稱「高」，是中華民國的直轄市，「六都」之一，位於臺灣的西南部",src:"./img/kaohsiung.png"},
    {name:'桃園',lat:24.988548,lng:121.301785,introduction:"桃園市，通稱桃園，簡稱「桃」，是中華民國的直轄市，臺灣六都之一。桃園是位於臺灣本島西北部的雙核心都市",src:"./img/taoyuan.jpg"},
    {name:'宜蘭',lat:24.749949,lng:121.754538,introduction:"宜蘭縣，是中華民國臺灣省的縣，位於臺灣本島東北部，與新北市、桃園市、新竹縣、臺中市、花蓮縣相鄰，東臨太平洋",src:"./img/yilan.jpg"}]
        
    
    const myIcon= L.icon({
            iconUrl:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
            shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
    });
    
    var OriginalPlacelat=23.705867;
    var OriginalPlacelng=120.959473;
    
    var map = L.map('mapid');
    // 設定地圖來源
    var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    //範圍
                                                /*minZoom: 初始 maxZoom:放大多少*/
    var osm = new L.TileLayer(osmUrl, {minZoom: 7, maxZoom: 16});
    map.addLayer(osm);
    var popup = L.popup(); 
    
    map.setView(new L.LatLng(OriginalPlacelat, OriginalPlacelng),7 );
    
    /**載入地圖 */
    function MapLoad(){
     cleanMarker();
    // 經緯度座標
    
    map.setView(new L.LatLng(OriginalPlacelat, OriginalPlacelng),11 );
    
    L.marker([OriginalPlacelat,OriginalPlacelng], {icon: myIcon},{name:"目前位置"}).addTo(map);
    /**限定範圍 */
     
    }
    
    var leftdown ;
    var rightup ;
    var leftup ;
    var rightdown ;
    map_drag()
    
      /*獲取當前地圖座標 */
      function map_drag() {
        leftdown ={ lng:map.getBounds().getSouthWest().lng,lat: map.getBounds().getSouthWest().lat}
        rightup ={ lng:map.getBounds().getNorthEast().lng,lat:map.getBounds().getNorthEast().lat}
         leftup ={ lng:map.getBounds().getNorthWest().lng,lat: map.getBounds().getNorthWest().lat}
        rightdown = {mlng:map.getBounds().getSouthEast().lng ,lat:map.getBounds().getSouthEast().lat}
    
     
     }
    
    
    
    
    
    /*點擊地圖 */
    function onMapClick(e) {
      //清除多餘標籤
      map_drag();
      cleanMarker();
      popup.setLatLng(e.latlng)
      .openOn(map) //開小窗
      .setContent("你點擊的位置：" + e.latlng.toString())//設定小窗
     
     
      
     
      L.marker(e.latlng, {icon: myIcon}).addTo(map);
    
    
      OriginalPlacelat=e.latlng.lat;
      OriginalPlacelng=e.latlng.lng;
     
    }
    map.on('click', onMapClick);
    
    
    
    
    
    
    
    
    /*清除標記*/ 
    function cleanMarker(){
      map.eachLayer((layer)=>{
       if(layer instanceof L.Marker){
           map.removeLayer(layer)
          }
          
       })
    }
    
    
    
    
    
    /*--------------控制項----------- */
    /*城市區 */
    var map_cities = document.querySelectorAll(".map_city");
          /*取消跳轉*/
          document
            .querySelector(".map_controllBar a")
            .addEventListener("click", (e) => {
              e.preventDefault();
            });
    
          /*顯示選單*/
          document.querySelector(".map_controllBar").addEventListener("click", () => {
            
            document.querySelector(".map_citymenu").style.display = "block";
          });
    
          /*離開選單消失*/
          document.querySelector(".map_citymenu")
            .addEventListener("mouseleave", () => {
              
              document.querySelector(".map_citymenu").style.display = "none";
            });
          /*點擊顯示*/
          for (let i = 0; i < map_cities.length; i++) {
            map_cities[i].addEventListener("click", (e) => {
              e.preventDefault();
              document.getElementById("map_cityspan").innerHTML =
                map_cities[i].textContent;
                
                /*移動地圖----城市 */
                 for(let j=0;j<CityList.length;j++)
                {
                
                 if( CityList[j].name==map_cities[i].textContent){
                    
                    OriginalPlacelat=CityList[j].lat;
                    OriginalPlacelng=CityList[j].lng;
                    
                    document.getElementById("map_activityintroduction").innerHTML=CityList[j].introduction;
                    document.querySelector(".map_imgbox").src=CityList[j].src;
                }
                 MapLoad();
                }
                
    
            });
          }
    
    /*-----------------------------------------END--------------------- */
    /**距離搜尋 */
    document.getElementById("map_Setdistance").addEventListener("input",map_ChangeDistance)
    
    
    var map_InputDistance=document.getElementById("map_Setdistance").value;
    
    
    
    function map_ChangeDistance(){
      cleanMarker();
      L.marker([ OriginalPlacelat, OriginalPlacelng], {icon: myIcon},{title:"現在位置"}).addTo(map);
      
    val=document.getElementById("map_Setdistance").value;
    document.getElementById("Activitydistance").innerHTML=val;
    
    map_NearbyMarkShow(val,ActivityList);
    }
    
    
    function map_NearbyMarkShow(val,arr){
      cleanMarker();
      L.marker([OriginalPlacelat,OriginalPlacelng], {icon: myIcon},{name:"目前位置"}).addTo(map);
    var NearbyActivityList=arr.filter(function(item, index, array){
       return map_Calcdistance(item.fCoordinateX,item.fCoordinateY,OriginalPlacelat,OriginalPlacelng)<val;
    })
    
    NearbyActivityList.forEach(function(item, index, array){
       
      L.marker([item.fCoordinateX,item.fCoordinateY], {icon: ActivityIcon}).addTo(map).bindPopup(item.fActName).addEventListener("click",function (event) {
        var marker=event.target;
        var latlng = marker.getLatLng();
        map_setInformation(latlng.lat,latlng.lng);
        map.setView(new L.LatLng(latlng.lat,latlng.lng), 11)
       
      });
    
    
      
      })
    }
    
    /*類型搜尋 */
    
    
    
    
    var typeBtn=document.querySelectorAll(".map_typeBtn")
    for(let i=0;i<typeBtn.length;i++)
    {
      typeBtn[i].addEventListener("click",(e)=>
    {
    
        e.preventDefault();
        map.setView(new L.LatLng(OriginalPlacelat, OriginalPlacelng), 11);
    
    
    
    
        let type=typeBtn[i].textContent;
        
    
        map_TypeMarkShow(type,ActivityList)
    
    })
    }
    
    
    
    
    function map_TypeMarkShow(str,arr){
      cleanMarker();
      L.marker([OriginalPlacelat,OriginalPlacelng], {icon: myIcon},{name:"目前位置"}).addTo(map);
      var resultList=arr.filter(function(item, index, array){
        
          return item.fLabelName==str ;
          ;
       
      })
      resultList.forEach(function(item, index, array){
       
        if(str=="志工活動")
        L.marker([item.fCoordinateX,item.fCoordinateY], {icon: SeaIcon},).addTo(map).bindPopup(item.fActName).addEventListener("click",function (event) {
          
          var marker=event.target;
          var latlng = marker.getLatLng();
          map_setInformation(latlng.lat,latlng.lng);
          map.setView(new L.LatLng(latlng.lat,latlng.lng), 11)
         
        });
    
        if(str=="環境清潔")
        L.marker([item.fCoordinateX,item.fCoordinateY], {icon: RunningIcon},).addTo(map).bindPopup(item.fActName).addEventListener("click",function (event) {
          var marker=event.target;
          var latlng = marker.getLatLng();
          map_setInformation(latlng.lat,latlng.lng);
          map.setView(new L.LatLng(latlng.lat,latlng.lng), 11)
         
        });
        if(str=="運動")
        L.marker([item.fCoordinateX,item.fCoordinateY], {icon: evIcon},).addTo(map).bindPopup(item.fActName).addEventListener("click",function (event) {  
          var marker=event.target;
          
          var latlng = marker.getLatLng();
         
          map_setInformation(latlng.lat,latlng.lng);
          map.setView(new L.LatLng(latlng.lat,latlng.lng), 11) 
        });
     })
    }
    
    
    function map_setInformation(lat,lng)
    {
        for(let i=0;i<ActivityList.length;i++)
        {
          if( ActivityList[i].fCoordinateX==lat &&ActivityList[i].fCoordinateY==lng )
          {
            console.log(ActivityList[i].fIntroduction);
            document.getElementById("map_activityintroduction").innerHTML=ActivityList[i].fIntroduction;
            document.querySelector(".map_imgbox").src=ActivityList[i].fImgPath;
    
          }
        }
    }
    
    
    
    
    //設定markingicon
    const ActivityIcon= L.icon({
      iconUrl:
              "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
    });
    const SeaIcon= L.icon({
      iconUrl:
              "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
    });
    const RunningIcon= L.icon({
      iconUrl:
              "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
    });
    const evIcon= L.icon({
      iconUrl:
              "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
    });
    
    
    //距離公式
    const EARTH_RADIUS = 6378.137;
    
    function rad(d){
      return d*Math.PI/180.0
    }
    function map_Calcdistance(lat1, lng1, lat2,lng2){
      radLat1 = rad(lat1);
      radLat2 = rad(lat2);
      a=radLat1-radLat2;
      b= rad(lng1)-rad(lng2);
      s=2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
      s=s*EARTH_RADIUS;
      s=Math.round(s*10000)/10000;
      return s;
    
    }
}    




// 每當 hash 變動的時候
let MapPage;
window.addEventListener("hashchange", () => {
if (location.hash==="#map" && !MapPage)
  {

    setTimeout(async()=>{
      await MapActivityAwait();
      MapPage = new ClsMap();
     
      console.log(MapPage)

    }, 500)
    
  }
  });


  window.addEventListener("load", () => {
if (location.hash==="#map" && !MapPage)
  {

    setTimeout(async()=>{
      await MapActivityAwait();
      MapPage = new ClsMap();
      console.log(MapPage)

    }, 300)
    
  }
});



