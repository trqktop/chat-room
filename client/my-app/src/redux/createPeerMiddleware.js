import {
  Peer
} from "peerjs";
import {
  savePeerId,
  setConPeer
} from "./store";


export const createPeerMiddleware = () => {
  const peer = new Peer('6bce5286-e72f-49c6-8134-7741658ebda1main')
  peer.on('connection', (conn) => {
    console.log('connect from server')
    conn.on('data', data => {
      console.log(data)
    })
  })
  return store => next => action => {
    if (peer) {
      const conn = peer.connect('6927d82d-9b3c-476c-afb2-30bfde04cd34Second')
      conn.on("open", function () {
        //подключился
        console.log("откр соединение");
        conn.on("data", function (data) {
          console.log("сообщение", data);
        });
      });
      conn.on("close", function () {
        console.log("соединение разорвано");
      });
    }

    return next(action)
  }
}