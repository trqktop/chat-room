import { Middleware } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { getActions } from "./actions";
import localforage from "localforage";
import { sendMessage } from "./store";

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
    socket.on("GET_MESSAGES", (messageFromServer) => {
      const { user, message, thread, id, file } = messageFromServer
      const messageWithoutFile = { user, message, thread, id }
      if (file) {
        const fileData = {
          file,
          id
        }
        localforage.getItem("files").then((files: any) => {
          const newFiles = [...files, fileData]
          localforage
            .setItem("files", newFiles, () => {
              dispatch({
                type: "chat/getMessage",
                payload: messageWithoutFile,
              });
            })
        })
      }
      else {
        dispatch({
          type: "chat/getMessage",
          payload: messageFromServer,
        });
      }
    });



    socket.on("GET_THREAD", (message) => {
      dispatch({
        type: "chat/getTread",
        payload: message,
      });
    });
    socket.on("REQUEST_MESSAGES", (messages) => {
      const files = messages
        .filter((item: any) => item.file)
        .map(({ file, id }: any) => {
          return { file, id };
        });
      localforage.setItem("files", files, () => {
        const clearMessages = messages.map(
          ({ user, message, thread, id }: any) => {
            return {
              user,
              message,
              thread,
              id,
            };
          }
        );
        localforage.setItem("files", files, () => {
          dispatch({
            type: "chat/updateMessages",
            payload: clearMessages,
          })
        })
      })
    });

    return (next) => (action) => {
      if (action.type) {
        if (action.type === "chat/sendName") {
          socket.emit("JOIN_CHAT", { name: action.payload });
        }
        if (action.type === "chat/sendMessage") {
          const message = {
            message: action.payload.inputValue,
            user: getState().chat.myName,
            file: action.payload.fileData ?? null,
            id: action.payload.id ?? null,
            thread: action.payload.thread ?? null,
          };
          socket.emit("SEND_MESSAGE", message).on("GET_MESSAGES", (message) => {
            const file = message.file
            if (file) {
              const { file, id } = message
              localforage
                .getItem("files")
                .then((files: any) => {
                  const newFiles = [...files,
                  { file, id }]
                  localforage
                    .setItem("files", newFiles)
                })
            }
          })
        }
        if (action.type === "chat/sendThread") {
          socket.emit("SEND_THREAD", action.payload);
        }
      }
      next(action);
    };
  };
};
