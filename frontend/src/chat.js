
//圖片開關
const chatIconContainer = document.querySelector(".chat_icon_container");
const chatMainIcon = document.querySelector(".chat_icon_main");
const chatIcons = document.querySelectorAll(".chat_icon");

chatIconContainer.addEventListener(
    "mouseenter",
    ()=>{
        chatMainIcon.classList.add("widthAndHeight2Zero");
        chatIcons.forEach(
            (item) => {
                // item.classList.remove("hide");
                item.classList.remove("widthAndHeight2Zero");              
            }
        )
    }
);
chatIconContainer.addEventListener(
    "mouseleave",
    () =>{
        chatMainIcon.classList.remove("widthAndHeight2Zero");
        chatIcons.forEach(
            (item) => {
                // item.classList.add("hide");
                item.classList.add("widthAndHeight2Zero");              

            }
        )
    }
)

//聊天室列表div開
const chatListWindow = document.querySelector(".chat_list_window");
document.querySelector("#chat_friend_icon").addEventListener(
    "click",
    () =>{
            chatListWindow.classList.remove("hide");
    }
)


//聊天室div開
const chatLists = document.querySelector(".chat_list").children;
const chatRoomWindow = document.querySelector(".chat_room_window");
[...chatLists].map(
    (item) => {
        item.addEventListener(
            "click",
            () =>{
                chatRoomWindow.classList.remove("hide");
            }
        )
    }
)

//聊天室窗關
document.querySelectorAll(".chat_window_close").forEach(
    item => {
        item.addEventListener(
            "click",
            (e) => {
                e.target.parentNode.classList.add("hide");
            }
        )        
    }
)











