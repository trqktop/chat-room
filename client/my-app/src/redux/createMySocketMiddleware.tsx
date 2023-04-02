import { Middleware } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { getActions } from "./actions";
import localforage from "localforage";

export const createMySocketMiddleware = (): Middleware => {
  return ({ getState, dispatch }) => {
    const url = "http://localhost:8888";
    //  "proxy": "http://192.168.2.225:8888" my
    //  "proxy": "http://192.168.2.159:8000"
    let socket = io(url);
    const { actions } = getActions();
    actions.forEach(({ reducerAction, socketAction }) => {
      socket.on(socketAction, (data) => {
        dispatch({
          type: reducerAction,
          payload: data,
        });
      });
    });
    // {
    //   reducerAction: "chat/getMessage",
    //     socketAction: "GET_MESSAGES",
    // },
    // socket.on("GET_MESSAGES", (message) => {
    //   console.log(message)
    //   // localforage.getItem('messages').then((oldMessages: any) => {
    //   //   console.log(oldMessages)
    //   //   const newMessages = [...oldMessages, message]
    //   //   localforage.setItem('messages', newMessages)
    //   // })
    //   // dispatch({
    //   //   type: "chat/getMessage",
    //   //   payload: messages,
    //   // });
    // });



    localforage.getItem('messages').then((messages) => {
      if (messages) {
        dispatch({
          type: "chat/updateMessages",
          payload: messages,
        });
      }
      else {
        socket.on('REQUEST_MESSAGES', (messages) => {
          localforage.setItem('messages', messages).then(messages => {
            // dispatch({
            //   type: "chat/updateMessages",
            //   payload: messages,
            // });
          }).catch((err) => console.log(err));
        });
      }
    }).catch((err) => {
      console.log(err);
    });
    socket.on("connect_error", (err) => {
      console.log(err);
    });
    return (next) => (action) => {
      if (action.type) {
        if (action.type === "chat/sendName") {
          socket.emit("JOIN_CHAT", { name: action.payload });
        }
        if (action.type === "chat/sendMessage") {
          localforage.getItem('messages').then((oldMessages: any) => {
            const message = {
              message: action.payload.inputValue,
              user: getState().chat.myName,
              file: action.payload.fileData ?? null,
            }
            const newMessages = [...oldMessages, message]
            localforage.setItem('messages', newMessages)
            socket.emit("SEND_MESSAGE", message);
          })
        }
      }
      next(action);
    };
  };
};
