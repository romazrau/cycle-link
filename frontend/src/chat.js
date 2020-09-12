import { serverURL } from "./api.js";
// import io from "socket.io-client";



function ClsChat() {

    // socket.io 區域
    let socket;
    const setSocket = (obj) => {
        socket = obj;
    }
    let messages = [{
        isMe: 0,
        name: "系統",
        msg: "歡迎加入公開頻道~"
    }];
    const setMessages = (msg) => {
        messages.push(msg);
        document.querySelector("#chat_robot_message").innerHTML = data2chatRobotMessage(messages);
    }

    const makeToast = (title, msg) => {
        console.log("%c" + title + "  " + msg, "color:green;font-size:16px;");
    }

    // 設定 socket
    var setupSocket = () => {
        const token = localStorage.getItem('Cycle link token');
        // console.group("socket-----------");
        // console.log(socket);
        if (token && !socket) {  // 
            const newSocket = io(serverURL.root, {
                query: {
                    token: localStorage.getItem('Cycle link token'),
                }
            });
            // console.log(newSocket);

            newSocket.on("disconnect", () => {
                setSocket(null);
                setTimeout(setupSocket, 3000);
                makeToast("error", "Socket Disconnected!");
            });


            newSocket.on("connect", () => {
                makeToast("success", "Socket Connected!");
            });

            setSocket(newSocket);
        }
        // console.groupEnd("socket-----------");
    }


    const sendMessage = (msg) => {
        if (socket) {
            console.log("send msg");
            socket.emit("chatRoomMessage", {
                chatroomId: "world",
                message: msg
            })
        }
    }


    // socket.io
    if (localStorage.getItem('Cycle link token')) {
        setupSocket();
    }
    // TODO 登入後開啟




    // 置頂
    $(document).ready(function () {
        $(".upTop").click(function () {
            $("html,body").animate({
                scrollTop: $("body").offset().top - 120
            }, 900);
        });
    });


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
    const chatListData = [{
        fId: 0,
        fMemberName: "哈士奇"
    },
    {
        fId: 1,
        fMemberName: "豆柴"
    },
    {
        fId: 2,
        fMemberName: "狐狸犬"
    },
    {
        fId: 3,
        fMemberName: "米克斯驚喜包"
    },
    ];

    // 聊天列表 文字樣板
    const data2cahtList = (array) => {
        let result = "";
        array.map((e) => {
            result += `<li chatRoomId=${e.fId}>${e.fMemberName}</li>`;
        });
        return result;
    };

    //點擊 icon 打開
    const chatListWindow = document.querySelector(".chat_list_window");
    const chatList = document.querySelector(".chat_list");
    document.querySelector("#chat_friend_icon").addEventListener("click", async () => {
        try {
            chatList.innerHTML = "";
            let respones = await fetch(serverURL.getChatroom, {
                cache: "no-cache",
                headers: {
                    Authorization: localStorage.getItem("Cycle link token"),
                }
            })
            let result = await respones.json();
            if (result.result) {
                chatList.innerHTML = data2cahtList(result.data);
            } else {
                chatList.innerHTML = `<div>${result.msg}</div>`
            }

        } catch (ex) {
            console.log(ex);
            chatList.innerHTML = data2cahtList(chatListData);
        }
        chatListWindow.classList.toggle("hide");
    });


    // 聊天列表窗關
    document.querySelector("#chat_list_window_close").addEventListener("click", (e) => {
        e.target.parentNode.classList.add("hide");
    });






    // *聊天室div-------------------------------------------
    // 關聊天室
    function chatRoomClose(e) {
        // console.log(e.target, e.target.classList);
        if ([...e.target.classList].includes("chat_window_close")) {
            e.currentTarget.remove();
        }
    }


    const cahtMessageData = [{
        isMe: 0,
        msg: "哈囉~",
        time: "16:35"
    },
    {
        isMe: 0,
        msg: "你的狗勾好可愛",
        time: "16:35"
    },
    {
        isMe: 0,
        msg: "可以跟他交朋友嗎 <3",
        time: "16:35"
    },
    {
        isMe: 1,
        msg: "嘿?",
        time: "16:38"
    },
    {
        isMe: 0,
        msg: "謝謝",
        time: "16:39"
    },
    ];

    //文字樣板 -- 參考 html 中聊天機器人格式
    const data2cahtMessage = (array, title) => {
        let result = `<div id="chatRommWith_${title}" class="chat_room_window"><img class="chat_window_close" src="./img/times-solid.svg" alt="X"><div id="chat_message_window_title" class="chat_window_title">${title}</div><div class="chat_message">`;
        array.map((e) => {
            result += `<div class=${e.isMe ? "caht_Me" : "caht_notMe"}>${e.msg}<div class="caht_arrow2"></div></div><div class="${e.isMe ? "caht_Me_time" : "caht_notMe_time"}">${e.time}</div>`;
        });
        result += `</div><div class="chat_input">
                    <textarea placeholder="想說什麼呢?" onfocus="this.placeholder=''" onblur="this.placeholder='想說什麼呢?'" row="2"></textarea>
                   </div></div>`;
        return result;
    };

    //點擊 聊天列表 打開
    const chatContainer = document.querySelector(".chat_container");
    document.querySelector(".chat_list").addEventListener("click", (e) => {
        // console.log(e.target, e.target.tagName);
        // 點擊的是否是li
        if (e.target.tagName !== "LI") {
            console.log(e.target);
            return;
        }

        //檢查是否已開啟
        if (document.querySelector(`#chatRommWith_${e.target.innerHTML}`)) {
            return;
        };

        // chatContainer += data2cahtMessage(cahtMessageData, e.target.innerHTML);
        const chatRoom = document.createElement("div");
        chatRoom.onclick = chatRoomClose;

        chatRoom.innerHTML = data2cahtMessage(cahtMessageData, e.target.innerHTML);
        chatContainer.appendChild(chatRoom);
    });





    // *世界頻道div-------------------------------------------
    const cahtRobotMessageData = [{
        isMe: 0,
        msg: "哈囉我是客服~"
    },
    {
        isMe: 0,
        msg: "你的狗勾好可愛"
    },
    {
        isMe: 0,
        msg: "可以跟他交朋友嗎 <3"
    },
    {
        isMe: 1,
        msg: "嘿?"
    },
    {
        isMe: 0,
        msg: "謝謝"
    },
    ];


    //文字樣板 -- 
    const data2chatRobotMessage = array => {
        let result = ""
        array.map((e) => {
            result += `<div class=${e.isMe ? "caht_Me" : "caht_notMe"}>${e.isMe ? "" : e.name + ": "}${e.msg}<div class="caht_arrow"></div></div>`;
        });
        return result;
    };


    //點擊 icon 打開  世界頻道與 socket . io
    const chatRobotWindow = document.querySelector(".chat_robot_room_window");
    const chatRobotMessage = document.querySelector("#chat_robot_message");
    document.querySelector("#chat_robot_icon").addEventListener("click", () => {

        if (chatRobotWindow.classList.contains("hide")) {
            chatRobotMessage.innerHTML = data2chatRobotMessage(messages);

            if (socket) {
                console.log("世界頻道 open");
                socket.emit("joinRoom", { chatroomId: "world" });
                socket.on("newMessage", ({ message, userId, userName }) => {
                    console.log("get msg:" + message + "||from: " + userName);
                    setMessages({
                        isMe: localStorage.getItem("Cycle link user data") == userName ? 1 : 0,
                        name: userName,
                        msg: message,
                    });
                })
            }

        } else {
            if (socket) {
                console.log("世界頻道 close");
                socket.emit("leaveRoom", { chatroomId: "world" });
                socket.removeAllListeners("newMessage");
            }
        }

        chatRobotWindow.classList.toggle("hide");
    });

    // 世界頻道div 發訊息
    document.querySelector("#chat_robot_textarea").addEventListener("keydown", (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            // sendMessage 
            sendMessage(e.target.value);
            e.target.value = "";
        }
    })




    // 世界頻道div-------------------------------------------
    document.querySelector("#chat_robot_window_close").addEventListener("click", (e) => {
        e.target.parentNode.classList.add("hide");

        if (socket) {
            console.log("世界頻道 close");
            socket.emit("leaveRoom", { chatroomId: "world" });
            socket.removeAllListeners("newMessage");
        }
    });



}
const Chat = new ClsChat();

