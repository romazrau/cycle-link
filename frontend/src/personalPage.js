import { serverURL } from "./api.js";









function ClsPersonalPage(){
 
    const GetPersonalPageMember = async (id) => {
        try {
            // fetch 接兩個參數 ( "請求網址",  { 參數物件，可省略 }  )
            // *用變數接 fetch 結果 ，要用await等。
            let response = await fetch(serverURL.personalPages+id, {
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
            let data = result.data;
            display_information(data);
            
            
    
           
      
        } catch (err) {
            console.log(err);
            // 錯誤處理
      
        }
    }
    function display_information(data)
    {
        personalpage_information.innerHTML=htmlPerCard(data[0]);
        personal_community.innerHTML="";
        data.map(function(e,index){
           
            personal_community.innerHTML+=htmlPerCommunityCard(e);
        })
        personal_imgbox.innerHTML=htmlPerImgCard(data[0])
    }
   
    
   
    this.openClass= function(evt, className) {
        var i, x, tablinks;

       
        // x抓取頁面中的class="class"
        x = document.getElementsByClassName("personal_class");
        //將所有的personal_class的display變成none
        // for (i = 0; i < x.length; i++) {
        //     x[i].style.display = "none";
        // }
        //tablinks 抓取頁面中的tablink
        tablinks = document.getElementsByClassName("personal_tablink");
        //將tablinks代入for循環中並利用classList.remove刪除class="red" ，就是每執行一次function的時候就進行全部tablinks移除class="red"
        for (i = 0; i < x.length; i++) {
            tablinks[i].classList.remove("personal_barcolor");
        }
        //document.getElementById=className(函數帶進來的參數)樣式設定為display:block; 當前點擊的a link執行function 顯示出來對應的內容。
        
        var main = document.querySelector(".personal_event");
        main.innerHTML = "";


        let data = GetSqlData(className);
        data.map(
            (e, index) => {
                main.innerHTML += htmlPerCard(e);
            }
        )

        // document.getElementById(className).style.display = "block";

        //並對當前點擊的 a link 新增“red” 這個class
        evt.currentTarget.classList.add("personal_barcolor");
    }   



// 字串樣板
// const htmlPerCard = o =>
//     {
//         return ` 
//         <div>
//         <img src="${o.imgPath}" class="personal_event_img" alt="">
//         <p>${o.date}</p>
//         <h3>${o.title}</h3>
//         <img src="img/icon1.svg" class="personal_icon" alt=""><span>${o.count}</span>
//         </div>`;

//     }

//    const GetSqlData = (classname) =>{
//     if(classname == "class1")
//     {
//         return [
//             {
//                 imgPath:"img/event1.jpeg",
//                 date: "Sunday, July 30,2020,10:30",
//                 title: "潛水撿垃圾，愛海洋！",
//                 count: classname,
//             },
//             {
//                 imgPath:"img/event1.jpeg",
//                 date: "Sunday, July 30,2020,10:30",
//                 title: "潛水撿垃圾，愛海洋！",
//                 count: 999,
//             },
//             {
//                 imgPath:"img/event1.jpeg",
//                 date: "Sunday, July 30,2020,10:30",
//                 title: "潛水撿垃圾，愛海洋！",
//                 count: 999,
//             }
//         ]
//     }
//     else if(classname == "class2"){
//         return [
//             {
//                 imgPath:"img/event1.jpeg",
//                 date: "Sunday, July 30,2020,10:30",
//                 title: "潛水撿垃圾，愛海洋！",
//                 count: classname,
//             },
//             {
//                 imgPath:"img/event1.jpeg",
//                 date: "Sunday, July 30,2020,10:30",
//                 title: "潛水撿垃圾，愛海洋！",
//                 count: 999,
//             },
//             {
//                 imgPath:"img/event1.jpeg",
//                 date: "Sunday, July 30,2020,10:30",
//                 title: "潛水撿垃圾，愛海洋！",
//                 count: 999,
//             }
//         ]
//     }
//     else if(classname == "class3"){
//         return [
//             {
//                 imgPath:"img/event1.jpeg",
//                 date: "Sunday, July 30,2020,10:30",
//                 title: "潛水撿垃圾，愛海洋！",
//                 count: classname,
//             },
//             {
//                 imgPath:"img/event1.jpeg",
//                 date: "Sunday, July 30,2020,10:30",
//                 title: "潛水撿垃圾，愛海洋！",
//                 count: 999,
//             },
//             {
//                 imgPath:"img/event1.jpeg",
//                 date: "Sunday, July 30,2020,10:30",
//                 title: "潛水撿垃圾，愛海洋！",
//                 count: 999,
//             }
//         ]
//     }
//    }


const personalpage_information=document.querySelector(".personal_information")


const htmlPerCard = o =>
    {
        return `
                <div>
                    <h3>${o.fName}(${o.fAccount})</h3>
                    <p>${o.fIntroduction}</p>
                </div>
                <div class="personal_pro_file">
                    <ul>
                        
                        <li>
                            <span class="personal_file_title">上次登入時間</span>
                            <span class="personal_file_middle">:</span>
                            <span class="personal_file_text">${o.fLastTime}</span>
                        </li>
                        <li>
                            <span class="personal_file_title">所在縣市</span>
                            <span class="personal_file_middle">:</span>
                            <span class="personal_file_text">${o.fCity}</span>
                        </li>
                        <li>
                            <span class="personal_file_title">會員等級</span>
                            <span class="personal_file_middle">:</span>
                            <span class="personal_file_text">${o.fAccountType}</span>
                        </li>
                        <li>
                            <span class="personal_file_title">加入的社團</span>
                            <span class="personal_file_middle">:</span>
                            <span class="personal_file_text"></span>
                        </li>
                    </ul>
                </div>
                `;
    }




   const personal_community=document.querySelector(".personal_Flex")
   

   const htmlPerCommunityCard = o =>
   {    
      
        return `<div class="personal_detail_Societies_img_circle">
                <a href="#community/detail/${o.fCommunityId}">
                    <div class="personal_detail_Societies_img_div">
                        <img src="${o.fImgPath}" class="personal_detail_Societies_img">
                    </div>
                    </a>
                </div>
                `
  
    }

    const personal_imgbox=document.querySelector(".personal_imgbox")


    const htmlPerImgCard = o =>
   {    
        return `
             <img src="${o.fPhotoPath}" alt="">
            `
  
    }
    
    this.GetPersonalPageMember = GetPersonalPageMember;
}

//預設testbtn 這個class頁面一加載後執行click();的動作。也就是點擊了testbtn有這個class的按鈕來執行上方寫的function 
const PersonalPage = new ClsPersonalPage();
// var mybtn = document.getElementsByClassName("personal_testbtn")[0];
//     mybtn.click();

// * -------------------------------- hash -------------------------------- //

const personalChangeHash = () => {

    let  personalArr = location.hash.split('/');
    let personalId = personalArr[1];
    
    if (location.hash.includes("#personal-page/")) {
        
        PersonalPage.GetPersonalPageMember(personalId);


    }
}


window.addEventListener("hashchange", personalChangeHash);
window.addEventListener("load", personalChangeHash);
