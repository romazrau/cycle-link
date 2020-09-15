module.exports = function (io) {
    const express = require("express");
    const router = express.Router();
    const bcrypt = require("bcrypt");
    // JWT
    const jsonwebtoken = require("jsonwebtoken");

    // src 資源
    const chatSql = require("../src/SQL/chat.js");

    // socket middleware
    io.use((socket, next) => {
        try {
            const tokenOrigin = socket.handshake.query.token;
            const token = tokenOrigin.split(" ")[1];

            // console.log("Socket use*************");
            let payload = jsonwebtoken.verify(token, process.env.JWT_SECRET, { algorithms: process.env.JWT_ALGORITHMS })
            // console.group("Socket payload ++++++");
            // console.log(tokenOrigin);
            // console.log(token);
            // console.log(payload);
            // console.groupEnd("Socket payload ++++++");

            socket.userId = payload.fId;
            socket.userName = payload.fName;
            next();
        } catch (ex) {
            console.log("Socket-- io.use error");
            console.log(ex);
        }
    })


    // socket.io events ， 由 連線事件開始
    io.on("connection", function (socket) {
        console.log("Socket-- A user connected: " + socket.userId + " " + socket.userName);
        socket.join(`user_${socket.userId}`);

        socket.on('disconnect', () => {
            console.log("Socket-- Disconnected: " + socket.userId + " " + socket.userName);
        })

        // 加入聊天室事件
        socket.on("joinRoom", ({ chatroomId }) => {
            console.log(`Socket-- A user join ${chatroomId} room: ${socket.userId} ${socket.userName}`);
            socket.join(chatroomId); // *socket 房間功能，加入
        });

        socket.on("leaveRoom", ({ chatroomId }) => {
            console.log(`Socket-- A user leave ${chatroomId} room: ${socket.userId} ${socket.userName}`);
            socket.leave(chatroomId);
        });

        // 發送訊息事件
        socket.on("chatRoomMessage", async ({ chatroomId, message }) => {
            if (message.trim().length > 0) {
                let data = {
                    message,
                    userId: socket.userId,
                    userName: socket.userName,
                    time: (new Date).toLocaleDateString("zh-TW") + " " + (new Date).toLocaleTimeString("zh-TW").split(":").slice(0, 2).join(":"),
                    chatroomId,
                }
                console.log("Socket-- 向聊天室傳送訊息: " + chatroomId);
                console.log(data);
                io.to(chatroomId).emit("newMessage", data)  // *對特定房間發送事件

                if (chatroomId !== "world") {
                    let result = await chatSql.insertMessage(data);
                    console.log(result);
                }
            }
        })




    });




    // 取得聊天列表
    router.get("/", async (req, res, next) => {
        try {
            if (!req.user) {
                res.json({ result: 0, msg: "尚未登入" });
                return;
            }
            let result = await chatSql.myChatroomList(req.user.fId);


            if (result.result) {
                let newData = result.data.map(item => {
                    if (item.fMemberId1 == req.user.fId) {
                        item.fMemberId = item.fMemberId2;
                        item.fMemberName = item.fMember2Name;
                    } else {
                        item.fMemberId = item.fMemberId1;
                        item.fMemberName = item.fMember1Name;
                    }
                    delete item.fMemberId1;
                    delete item.fMemberId2;
                    delete item.fMember1Name;
                    delete item.fMember2Name;
                    return item;
                })
                result.data = newData;
            }

            res.json(result);

        } catch (ex) {
            console.log(ex);
            res.json({ result: 0, msg: "路由錯誤", data: ex });
        }
    })


    // 取得聊天內容 by room
    router.get("/messages/:room", async (req, res, next) => {
        try {
            if (!req.user) {
                res.json({ result: 0, msg: "尚未登入" });
                return;
            }

            // TODO 身分查核

            let result = await chatSql.myChatroomMessages(req.params.room);

            res.json(result);
        } catch (ex) {
            console.log(ex);
            res.json({ result: 0, msg: "路由錯誤", data: ex });
        }
    })


    // 新增聊天室
    router.post("/:id", async (req, res, next) => {
        try {
            if (!req.user) {
                res.json({ result: 0, msg: "尚未登入" });
                return;
            }

            // TODO 身分查核

            let result = await chatSql.insertChatroom(req.user.fId, req.params.id);

            if (result.result) {
                io.to(`user_${req.params.id}`).emit("newChatroom", {})  // *對特定房間發送事件
            }

            res.json(result);
        } catch (ex) {
            console.log(ex);
            res.json({ result: 0, msg: "路由錯誤", data: ex });
        }
    })




    return router;
}