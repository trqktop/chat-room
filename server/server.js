const express = require('express');
const app = express();
const http = require('http', {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const server = http.createServer(app);
const {
    Server
} = require("socket.io");

const io = new Server(server);
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const count = io.engine.clientsCount; //получить количество подключенных пользователей



const rooms = {
    message: [
        'hello world',
        'im busample',
        'work busample'
    ],
    users: []
}
const names = [
    'example',
    'busample'
]

// server-side события подключения 
io.on("connection", (socket) => {
    socket.emit("rooms", rooms.message);
    socket.on("message", (value) => {
        rooms.message.push(value)
        io.emit('rooms', rooms.message)
    });
});



//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------








// io.on('connection', (socket) => {
//     socket.broadcast.emit('hi');
// });
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//     });
// });
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
// });
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

server.listen(3000, () => {
    console.log('listening on *:3000');
});