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
 
}





 function  ClsMap(){
 
    
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
    
    
    
    
    
    
    function map_ChangeDistance(){
      cleanMarker();
      L.marker([ OriginalPlacelat, OriginalPlacelng], {icon: myIcon},{title:"現在位置"}).addTo(map);
      
    let val=document.getElementById("map_Setdistance").value;
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
          
            document.getElementById("map_activityintroduction").innerHTML=ActivityList[i].fIntroduction;
            document.querySelector(".map_imgbox").src=ActivityList[i].fImgPath;
            document.querySelector(".map_link").href=`#activity/detail/${ActivityList[i].fId}`
    
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
      let radLat1 = rad(lat1);
      let radLat2 = rad(lat2);
      let a=radLat1-radLat2;
      let b= rad(lng1)-rad(lng2);
      let s=2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
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
     
 

    }, 500)
    
  }
  });


  window.addEventListener("load", () => {
if (location.hash==="#map" && !MapPage)
  {

    setTimeout(async()=>{
      await MapActivityAwait();
      MapPage = new ClsMap();
     

    }, 300)
    
  }
});



