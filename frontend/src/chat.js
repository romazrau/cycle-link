import { serverURL } from "./api.js";
// import io from "socket.io-client";



function ClsChat() {

    // socket.io 訊息與物件儲存 區域
    let socket;
    const setSocket = (obj) => {
        socket = obj;
    }

    // world room 用
    let messages = [{
        isMe: 0,
        name: "系統",
        msg: "歡迎加入公開頻道~",
        time: (new Date).toLocaleDateString("zh-TW") + " " + (new Date).toLocaleTimeString("zh-TW").split(":").slice(0, 2).join(":")
    }, {
        isMe: 0,
        name: "系統",
        msg: "保持頻道開啟，接收新訊息",
        time: (new Date).toLocaleDateString("zh-TW") + " " + (new Date).toLocaleTimeString("zh-TW").split(":").slice(0, 2).join(":")
    }];
    // world room 用
    const setMessages = (msgObj) => {
        messages.push(msgObj);
        let room = document.querySelector("#chat_robot_message");
        room.innerHTML = data2chatRobotMessage(messages);
        room.scrollTo(0, room.scrollHeight);
    }
    // world room 用
    const worldRoomReconnect = () => {
        if (!chatRobotWindow.classList.contains("hide")) {
            console.log("世界頻道 open");
            socket.emit("joinRoom", { chatroomId: "world" });
        }
    }

    // 私人聊天室列表
    let chatroomList = [];
    const setChatroomList = (roomListObj) => {
        chatroomList.push(roomListObj);
    }
    const initChatroomList = async () => {
        chatroomList = [];
        const chatList = document.querySelector(".chat_list");
        chatList.innerHTML = "";
        try {
            let respones = await fetch(serverURL.getChatroom, {
                cache: "no-cache",
                headers: {
                    Authorization: localStorage.getItem("Cycle link token"),
                }
            })
            let result = await respones.json();
            if (!result.result) {
                chatList.innerHTML = `<div>${result.msg}</div>`
                return;
            }

            // console.group("chatroom List");
            result.data.map(item => {
                item.fIsReaded = item.fIsMeLastChat
                setChatroomList(item);
                // console.log("joinRoom: " + item.fId);
                socket.emit("joinRoom", { chatroomId: item.fId });
            })

            // console.groupEnd("chatroom List");
            document.querySelector(".chat_list").innerHTML = data2cahtList(chatroomList);
        } catch (ex) {
            console.log(ex);
            chatList.innerHTML = `<div>連線錯誤</div>`;
        }
    }
    const reFlashChatroomList = (chatroomId, isMe = 0) => {
        let index = chatroomList.findIndex((item) => item.fId == chatroomId);
        let pop = chatroomList.splice(index, 1)[0];
        pop.fIsReaded = isMe;
        chatroomList.unshift(pop);

        const chatList = document.querySelector(".chat_list");
        chatList.innerHTML = "";

        document.querySelector(".chat_list").innerHTML = data2cahtList(chatroomList);

        // console.group("reFlashChatroomList");
        // console.log(index);
        // console.log(pop);
        // console.log(chatroomList);
        // console.groupEnd("reFlashChatroomList");
    }
    const isfriendOnline = (chatroomId, isOnline) => {
        try {
            let theChatList = document.querySelector(`#chat-list-${chatroomId} > .chat_list_online`);
            let index = chatroomList.findIndex((item) => item.fId == chatroomId);

            if (isOnline) {
                chatroomList[index].isOnline = 1;
                theChatList.innerHTML = "●";
            }else{
                chatroomList[index].isOnline = 0;
                theChatList.innerHTML = "";
            }
            return true;
        }
        catch (ex) {
            console.log(ex);
            return false;
        }
    }

    // 私人聊天室用
    const setMessagesTo = (chatroomId, msgObj) => {
        let roomElement = document.querySelector(`#chatRoomId_${chatroomId}`);
        if (roomElement) {
            let messagesContainer = roomElement.querySelector('.chat_message');
            let prevDate = messagesContainer.dataset.prevDate;
            let msgDate = msgObj.time.split(" ")[0];
            if (prevDate !== msgDate) {
                messagesContainer.innerHTML += `<div class="chat_info_message">${msgDate}</div>`
            }
            messagesContainer.dataset.prevDate = msgDate;

            messagesContainer.innerHTML += data2chatMessages(msgObj);
            messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
        }

        // TODO 未讀訊息

    }


    const makeToast = (title, msg) => {
        console.log("%c" + title + "  " + msg, "color:green;font-size:16px;");
    }

    // *設定 socket ---------------------------------------------------------------------
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
                // setSocket(null);
                // setTimeout(setupSocket, 3000);
                makeToast("error", "Socket Disconnected!");
                socket.removeAllListeners("newMessage");
            });

            newSocket.on("connect", () => {
                setSocket(newSocket);
                makeToast("success", "Socket Connected!");
                initChatroomList();
                worldRoomReconnect();

                socket.on("newMessage", ({ message, userId, userName, time, chatroomId }) => {
                    console.log("get msg:" + message + " ||from: " + userName + " ||room: " + chatroomId);
                    let data = {
                        isMe: localStorage.getItem("Cycle link user data") == userName ? 1 : 0,
                        name: userName,
                        msg: message,
                        time,
                    }
                    if (chatroomId === "world") {
                        setMessages(data);
                    } else {
                        reFlashChatroomList(chatroomId, data.isMe);
                        setMessagesTo(chatroomId, data);
                    }

                })
                // socket.removeAllListeners("newMessage");

                socket.on("newChatroom", () => {
                    initChatroomList();
                    console.log("new Chatroom create");
                })

                socket.on("friendOnline", ({chatroomId, userName}) => {
                    if(userName === localStorage.getItem("Cycle link user data")) return;

                    let timer = setInterval(() => {
                        let result = isfriendOnline(chatroomId, true);
                        if (result) clearInterval(timer); 
                    }, 3000);
                    console.log("friend Online :)");
                    socket.emit("FriendOnlineToo", chatroomId)
                })

                socket.on("friendOffline", (chatroomId) => {
                    let timer = setInterval(() => {
                        let result = isfriendOnline(chatroomId, false);
                        if (result) clearInterval(timer); 
                    }, 3000);
                    console.log("friend Offline :(");
                })

                socket.on("friendOnlineTooYa", (chatroomId) => {
                    let timer = setInterval(() => {
                        let result = isfriendOnline(chatroomId, true);
                        if (result) clearInterval(timer); 
                    }, 3000);
                    console.log("my friend online too :)");
                })



            });

        } else {
            makeToast("", "Socket can't connect!");
        }
        // console.groupEnd("socket-----------");
    }

    // 發送訊息
    const sendMessage = (message, chatroomId) => {
        if (socket) {
            console.log(`send message to ${chatroomId}`);
            socket.emit("chatRoomMessage", {
                chatroomId,
                message
            })
        }
    }

    // 以上設定 socket ---------------------------------------------------------------------




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
            result += `<li id="chat-list-${e.fId}" data-chatRoom-id=${e.fId} data-title=${e.fMemberName}>
                            <span class="chat_list_online">${e.isOnline ? "●" : ""}</span>
                            ${e.fMemberName}
                            <span class="chat_list_o">${e.fIsReaded ? "" : '<i class="far fa-comment-dots"></i>'}</span>
                        </li>`;
        });
        return result;
    };

    //點擊 icon 打開
    const chatListWindow = document.querySelector(".chat_list_window");
    document.querySelector("#chat_friend_icon").addEventListener("click", () => {
        chatListWindow.classList.toggle("hide");
    });


    // 聊天列表窗關
    document.querySelector("#chat_list_window_close").addEventListener("click", (e) => {
        e.target.parentNode.classList.add("hide");
    });






    // *聊天室div-------------------------------------------
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

    // 關聊天室
    function chatRoomClose(e) {
        // console.log(e.target, e.target.classList);
        if ([...e.target.classList].includes("chat_window_close")) {
            e.currentTarget.remove();
        }
    }

    // 聊天室發訊息
    const EventSendChatMessage = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            let room = e.target.dataset ? e.target.dataset.chatroomId || "world" : "world";
            sendMessage(e.target.value, room);
            // console.log(`send message to ${room}`);
            e.target.value = "";
        }
    }


    //文字樣板 -- 參考 html 中聊天機器人格式
    const data2chatroom = (array, title, chatRoomId) => {
        let prevDate = "1911/01/01";
        let msgs = array.map((e) => {
            let date = e.time.split(" ")[0];

            let result = "";
            if (prevDate !== date) {
                result += `<div class="chat_info_message">${date}</div>`
            }
            prevDate = date;
            result += data2chatMessages(e);
            return result
        });

        let result = `<div id="chatRoomId_${chatRoomId}" class="chat_room_window"><img class="chat_window_close" src="./img/times-solid.svg" alt="X"><div id="chat_message_window_title" class="chat_window_title">${title}</div><div data-prev-date=${prevDate} class="chat_message">`;
        result += msgs.join("");
        result += `</div><div class="chat_input">
                    <textarea data-chatRoom-id=${chatRoomId} placeholder="想說什麼呢?" onfocus="this.placeholder=''" onblur="this.placeholder='想說什麼呢?'" row="2"></textarea>
                   </div></div>`;
        return result;
    };

    const data2chatMessages = (data) => (
        `<div class=${data.isMe ? "caht_Me" : "caht_notMe"}>${data.msg}<div class="caht_arrow2"></div></div>
        <div class="${data.isMe ? "caht_Me_time" : "caht_notMe_time"}">${data.time.split(" ")[1]}</div>`
    )



    //點擊 聊天列表 打開
    const chatContainer = document.querySelector(".chat_container");
    document.querySelector(".chat_list").addEventListener("click", async (e) => {
        // console.log(e.target, e.target.tagName);
        // 點擊的是否是li
        if (e.target.tagName !== "LI") {
            // console.log(e.target);
            return;
        }

        //檢查是否已開啟
        if (document.querySelector(`#chatRoomId_${e.target.dataset.chatroomId}`)) {
            return;
        };

        // 容器與事件綁定
        const chatRoom = document.createElement("div");
        chatRoom.addEventListener("click", chatRoomClose);
        chatRoom.addEventListener("keydown", EventSendChatMessage);

        e.target.querySelector(".chat_list_o").innerHTML = "";

        let response = await fetch(serverURL.getChatmessage + e.target.dataset.chatroomId, {
            method: "GET",
            cache: "no-cache",
            headers: {
                Authorization: localStorage.getItem("Cycle link token"),
            },
        })

        if (!response.ok) {
            chatRoom.innerHTML = data2chatroom(cahtMessageData, e.target.dataset.title, e.target.dataset.chatroomId);
        } else {
            let result = await response.json();
            if (!result.result) {
                chatRoom.innerHTML = data2chatroom([], e.target.dataset.title, e.target.dataset.chatroomId);  // {isMe: 0,msg: result.msg,time: ""}
            } else {
                let messagesData = result.data.map((item) => ({
                    isMe: item.fName === localStorage.getItem("Cycle link user data"),
                    msg: item.fContent,
                    time: item.fTime
                })
                )
                chatRoom.innerHTML = data2chatroom(messagesData, e.target.dataset.title, e.target.dataset.chatroomId);
            }
        }

        chatContainer.appendChild(chatRoom);
        let messagesContainer = chatRoom.querySelector('.chat_message');
        messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
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
        let result = "";
        array.map((e) => {
            result += `<div class=${e.isMe ? "caht_Me" : "caht_notMe"}>${e.isMe ? "" : e.name + ": "}${e.msg}<div class="caht_arrow"></div></div>
                        <div class="${e.isMe ? "caht_Me_time" : "caht_notMe_time"}">${e.time ? e.time.split(" ")[1] : ""}</div>`;
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
            }

        } else {
            if (socket) {
                console.log("世界頻道 close");
                socket.emit("leaveRoom", { chatroomId: "world" });
            }
        }

        chatRobotWindow.classList.toggle("hide");
    });

    // 世界頻道div 發訊息
    document.querySelector("#chat_robot_textarea").addEventListener("keydown", EventSendChatMessage)




    // 世界頻道div-------------------------------------------
    document.querySelector("#chat_robot_window_close").addEventListener("click", (e) => {
        e.target.parentNode.classList.add("hide");

        if (socket) {
            console.log("世界頻道 close");
            socket.emit("leaveRoom", { chatroomId: "world" });
        }
    });



    // 初始化區域
    // socket.io
    if (localStorage.getItem('Cycle link token')) {
        setupSocket();
    }
    // TODO 登入後開啟

}
const Chat = new ClsChat();


