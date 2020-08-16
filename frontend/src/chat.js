// *圖片開關
const chatIconContainer = document.querySelector(".chat_icon_container");
const chatMainIcon = document.querySelector(".chat_icon_main");
const chatIcons = document.querySelectorAll(".chat_icon");

chatIconContainer.addEventListener("mouseenter", () => {
    chatMainIcon.classList.add("widthAndHeight2Zero");
    chatIcons.forEach((item) => {
        item.classList.remove("widthAndHeight2Zero");
    });
});

chatIconContainer.addEventListener("mouseleave", () => {
    chatMainIcon.classList.remove("widthAndHeight2Zero");
    chatIcons.forEach((item) => {
        item.classList.add("widthAndHeight2Zero");
    });
});



// *聊天室列表div-------------------------------------------
const chatListData = [
    { chatRoomId: 0, name: "哈士奇" },
    { chatRoomId: 1, name: "豆柴" },
    { chatRoomId: 2, name: "狐狸犬" },
    { chatRoomId: 3, name: "米克斯驚喜包" },
];

//文字樣板
const data2cahtList = (array) => {
    let result = "";
    array.map((e) => {
        result += `<li chatRoomId=${e.chatRoomId}>${e.name}</li>`;
    });
    return result;
};

const chatListWindow = document.querySelector(".chat_list_window");
const chatList = document.querySelector(".chat_list");
document.querySelector("#chat_friend_icon").addEventListener("click", () => {
    chatList.innerHTML = data2cahtList(chatListData);
    chatListWindow.classList.remove("hide");
});


// 聊天列表窗關
document.querySelector("#chat_list_window_close").addEventListener("click", (e) => {
        e.target.parentNode.classList.add("hide");
    });






// *聊天室div-------------------------------------------
// 關聊天室
function chatRoomClose(e){
    // console.log(e.target, e.target.classList);
    if([...e.target.classList].includes("chat_window_close")){
        e.currentTarget.remove();
    }
}


const cahtMessageData = [
    { isMe: 0, msg: "哈囉~" },
    { isMe: 0, msg: "你的狗勾好可愛" },
    { isMe: 0, msg: "可以跟他交朋友嗎 <3" },
    { isMe: 1, msg: "嘿?" },
    { isMe: 0, msg: "謝謝" },
];

//文字樣板 -- 參考 html 中聊天機器人格式
const data2cahtMessage = (array, title) => {
    let result = `<div class="chat_room_window"><img class="chat_window_close" src="./img/icons8-close-window-200.png" alt="X"><div id="chat_message_window_title" class="chat_window_title">${title}</div><div class="chat_message">`;
    array.map((e) => {
        result += `<div class=${e.isMe ? "caht_Me" : "caht_notMe"}>${e.msg}</div>`;
    });
    result += "</div></div>";
    return result;
};

const chatContainer = document.querySelector(".chat_container");
document.querySelector(".chat_list").addEventListener("click", (e) => {
    console.log(e.target, e.target.tagName);
    if (e.target.tagName !== "LI") {
        console.log(e.target);
        return;
    }

    // chatContainer += data2cahtMessage(cahtMessageData, e.target.innerHTML);
    const chatRoom = document.createElement("div");
    chatRoom.onclick = chatRoomClose;

    chatRoom.innerHTML = data2cahtMessage(cahtMessageData, e.target.innerHTML);
    chatContainer.appendChild(chatRoom);
});





// *聊天機器人div-------------------------------------------
const cahtRobotMessageData = [
    { isMe: 0, msg: "哈囉我是客服~" },
    { isMe: 0, msg: "你的狗勾好可愛" },
    { isMe: 0, msg: "可以跟他交朋友嗎 <3" },
    { isMe: 1, msg: "嘿?" },
    { isMe: 0, msg: "謝謝" },
];


//文字樣板 -- 
const data2chatRobotMessage = array => {
    let result = ""
     array.map((e) => {
        result += `<div class=${e.isMe ? "caht_Me" : "caht_notMe"}>${e.msg}</div>`;
    });
    return result;
};


//跟聊天室用一樣的新增與關閉 function
const chatRobotWindow = document.querySelector(".chat_robot_room_window");
const chatRobotMessage = document.querySelector("#chat_robot_message");
document.querySelector("#chat_robot_icon").addEventListener("click", () => {
    chatRobotMessage.innerHTML = data2chatRobotMessage(cahtRobotMessageData);
    chatRobotWindow.classList.remove("hide")
});

// 聊天列表窗關-------------------------------------------
document.querySelector("#chat_robot_window_close").addEventListener("click", (e) => {
    e.target.parentNode.classList.add("hide");
});