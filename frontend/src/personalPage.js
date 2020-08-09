function ClsPersonalPage(){
 
    const htmlPerCard = o =>
    {
        return ` 
        <div>
        <img src="${o.imgPath}" class="personal_event_img" alt="">
        <p>${o.date}</p>
        <h3>${o.title}</h3>
        <img src="img/icon1.svg" class="personal_icon" alt=""><span>${o.count}</span>
        </div>`;

    }

   const GetSqlData = (classname) =>{
    if(classname == "class1")
    {
        return [
            {
                imgPath:"img/event1.jpeg",
                date: "Sunday, July 30,2020,10:30",
                title: "潛水撿垃圾，愛海洋！",
                count: classname,
            },
            {
                imgPath:"img/event1.jpeg",
                date: "Sunday, July 30,2020,10:30",
                title: "潛水撿垃圾，愛海洋！",
                count: 999,
            },
            {
                imgPath:"img/event1.jpeg",
                date: "Sunday, July 30,2020,10:30",
                title: "潛水撿垃圾，愛海洋！",
                count: 999,
            }
        ]
    }
    else if(classname == "class2"){
        return [
            {
                imgPath:"img/event1.jpeg",
                date: "Sunday, July 30,2020,10:30",
                title: "潛水撿垃圾，愛海洋！",
                count: classname,
            },
            {
                imgPath:"img/event1.jpeg",
                date: "Sunday, July 30,2020,10:30",
                title: "潛水撿垃圾，愛海洋！",
                count: 999,
            },
            {
                imgPath:"img/event1.jpeg",
                date: "Sunday, July 30,2020,10:30",
                title: "潛水撿垃圾，愛海洋！",
                count: 999,
            }
        ]
    }
    else if(classname == "class3"){
        return [
            {
                imgPath:"img/event1.jpeg",
                date: "Sunday, July 30,2020,10:30",
                title: "潛水撿垃圾，愛海洋！",
                count: classname,
            },
            {
                imgPath:"img/event1.jpeg",
                date: "Sunday, July 30,2020,10:30",
                title: "潛水撿垃圾，愛海洋！",
                count: 999,
            },
            {
                imgPath:"img/event1.jpeg",
                date: "Sunday, July 30,2020,10:30",
                title: "潛水撿垃圾，愛海洋！",
                count: 999,
            }
        ]
    }
     

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





}

//預設testbtn 這個class頁面一加載後執行click();的動作。也就是點擊了testbtn有這個class的按鈕來執行上方寫的function 
const PersonalPage = new ClsPersonalPage();
var mybtn = document.getElementsByClassName("personal_testbtn")[0];
    mybtn.click();