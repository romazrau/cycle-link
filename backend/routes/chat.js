module.exports = function (io) {
    const express = require("express");
    const router = express.Router();
    const bcrypt = require("bcrypt");
    // JWT
    const jsonwebtoken = require("jsonwebtoken");

    // src 資源
    const chatSql = require("../src/SQL/chat.js");


    io.use((socket, next) => {
        try {
            const tokenOrigin = socket.handshake.query.token;
            const token = tokenOrigin.split(" ")[1];

            console.log("Socket use*************");
            let payload = jsonwebtoken.verify(token, process.env.JWT_SECRET, { algorithms: process.env.JWT_ALGORITHMS })
            console.group("Socket payload ++++++");
            // console.log(tokenOrigin);
            // console.log(token);
            console.log(payload);
            console.groupEnd("Socket payload ++++++");

            socket.userId = payload.fId;
            socket.userName = payload.fName;
            next();
        } catch (ex) {
            console.log(ex);
        }
    })


    // socket.io events
    io.on("connection", function (socket) {
        console.log("Socket-- A user connected: " + socket.userId + " " + socket.userName);

        socket.on('disconnect', () => {
            console.log("Socket-- Disconnected: " + socket.userId + " " + socket.userName);
        })

        socket.on("joinRoom", (data) => {
            console.log("Socket-- A user join world room: " + socket.userId + " " + socket.userName);
            console.log(data);
        });

        socket.on("leaveRoom", (data) => {
            console.log("Socket-- A user leave world room: " + socket.userId + " " + socket.userName);
            console.log(data);
        });

        socket.on("leaveRoom", (data) => {
            console.log("Socket-- A user leave world room: " + socket.userId + " " + socket.userName);
            console.log(data);
        });

        socket.on("chatRoomMessage", async ({ chatroomIdm, message }) => {

            if (message.trim().length > 0) {
                io.to(chatroomIdm).emit("newMessage", {
                    message,
                    userId: socket.userId,
                    userName: socket.userName,
                })
            }
        })
    });





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

    return router;
}