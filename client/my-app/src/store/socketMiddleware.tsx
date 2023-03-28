import { io } from "socket.io-client";

const toggle = true;

let actions = [
    {
        reducerAction: "chat/activeUsers",
        socketAction: "chat/activeUsers",
    },
    {
        reducerAction: "chat/updateMessages",
        socketAction: "chat/updateMessages",
        // socketAction: "send_message",
    },
    {
        reduceAtion: "chat/userName",
        socketAction: "chat/userName",
    },
];
let emitsActions: any = {
    "chat/AddMessage": "chat/AddMessage",
    "chat/userName": "chat/userName",
};

export const createMySocketMiddleware = () => {
    return (params: any) => {
        let socket = io();
        actions.forEach(({ reducerAction, socketAction }) => {
            socket.on(socketAction, (data) => {
                params.dispatch({
                    type: reducerAction,
                    payload: data,
                });
            });
        });

        socket.on("connect_error", (err) => {
            console.log(err);
        });

        return (next: any) => (action: any) => {
            const { chat } = params.getState();
            const emitActionType = emitsActions[action.type];
            if (emitActionType) {
                try {
                    socket.emit(emitActionType, action.payload, chat.myName);
                } catch (err) {
                    console.log(err);
                }
            }
            return next(action);
        };
    };
};
