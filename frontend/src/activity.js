const htmlActCard = (o) => {
    return ` 
    <div>
    <img src="${o.imgPath}" class="activity_event_img" alt="">
    <p>${o.date}</p>
    <h3>${o.title}</h3>
    <img src="img/icon1.svg" class="activity_icon" alt=""><span>${o.count}</span>
    </div>`;

}


const main = document.querySelector(".activity_event");



//AJAX
let data = [{
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
    },
    {
        imgPath: "img/event1.jpeg",
        date: "Sunday, July 30,2020,10:30",
        title: "潛水撿垃圾，愛海洋！",
        count: 999,
    },


]


data.map(
    (e, index) => {
        main.innerHTML += htmlActCard(e);
    }
)