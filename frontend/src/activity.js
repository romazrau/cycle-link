const htmlActSearch = (o) => {
    return ` 
        <option value="clearsea">${o.tag}</option>`;
}
const ActSearch = document.querySelector("#activity_option");


let ActSearchData = [{
        tag: "淨海"
    },
    {
        tag: "淨山"
    },
    {
        tag: "路跑"
    },
]

ActSearchData.map(
    (e, index) => {
        ActSearch.innerHTML += htmlActSearch(e);
    }
)


const htmlActCard = (o) => {
    return ` 
    <div>
    <img src="${o.imgPath}" class="activity_event_img" alt="">
    <p>${o.date}</p>
    <h3>${o.title}</h3>
    <img src="img/icon1.svg" class="activity_icon" alt=""><span>${o.count}</span>
    </div>`;

}

const ActCard = document.querySelector(".activity_event");

//AJAX
let ActCardData = [{
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


ActCardData.map(
    (e, index) => {
        ActCard.innerHTML += htmlActCard(e);
    }
)

const htmlHisAct = (o) => {
    return `
    <div>
    <img src="${o.imgPath}" class="activity_event_img" alt="">
    <p>${o.date}</p>
    <h3>${o.title}</h3>
    <img src="img/icon1.svg" class="activity_icon" alt=""><span>${o.count}</span>
    </div>`
}

const HisAct = document.querySelector(".activity_event_history2")

let HisActData = [{
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

HisActData.map(
    (e, index) => {
        HisAct.innerHTML += htmlHisAct(e);
    }
)