import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import siofu from 'socketio-file-upload';
import path from 'path';


const app = express().use(siofu.router);
const server = http.createServer(app);
const io = new Server(server);
const __dirname = path.resolve();

io.on('connection', socket => {
    const uploader = new siofu();
    uploader.dir = __dirname + `/uploads`;
    console.log(socket.handshake.time);
    uploader.listen(socket);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + `/index.html`);
});

server.listen(3000, () => {
    console.log('Server is Running on *:3000');
})
