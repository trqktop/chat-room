const express = require("express");
const app = express();
const http = require("http", {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const server = http.createServer(app);
const {
    Server
} = require("socket.io");

const io = new Server(server);
const count = io.engine.clientsCount;
const chat = {
    messages: [],
    users: [],
};



io.on("connection", (socket) => {
    socket.emit("chat/updateMessages", chat.messages);
    socket.on("chat/AddMessage", (value, userName) => {
        chat.messages.push({
            user: userName,
            text: value
        });
        io.emit("chat/updateMessages", chat.messages);
    });

    socket.on("chat/userName", (name) => {
        console.log(chat.users);
        chat.users.push({
            id: socket.id,
            name: name,
        });
        io.emit(
            "chat/activeUsers",
            chat.users.map((item) => item.name)
        );
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        chat.users = [
            ...chat.users.filter((user) => {
                return user.id !== socket.id;
            }),
        ];
        io.emit(
            "chat/activeUsers",
            chat.users.map((item) => item.name)
        );
    });
});


server.listen(8888, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log("listening on *:8888");
});