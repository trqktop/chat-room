import { Middleware } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { getActions } from "./actions";

export const createMySocketMiddleware = (): Middleware => {
  return ({ getState, dispatch }) => {
    const url = "http://localhost:8888";
    //  "proxy": "http://192.168.2.225:8888" my
    //  "proxy": "http://192.168.2.159:8000"
    let socket = io(url);
    const { actions, emitsActions } = getActions();
    actions.forEach(({ reducerAction, socketAction }) => {
      socket.on(socketAction, (data) => {
        dispatch({
          type: reducerAction,
          payload: data,
        });
      });
    });
    socket.on("connect_error", (err) => {
      console.log(err);
    });
    return (next) => (action) => {
      const emitActionType = emitsActions[action.type];
      if (emitActionType) {
        if (emitActionType === "JOIN_CHAT") {
          socket.emit(emitActionType, { name: action.payload });
        }
        if (emitActionType === "SEND_MESSAGE") {
          socket.emit(emitActionType, {
            message: action.payload.inputValue,
            user: getState().chat.myName,
            file: action.payload.fileData ?? null,
          });
        }
      }
      next(action);
    };
  };
};
