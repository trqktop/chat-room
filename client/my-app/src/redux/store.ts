import {
  configureStore,
  createSlice,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { createMySocketMiddleware } from "./createMySocketMiddleware";
import { createPeerMiddleware } from "./createPeerMiddleware";
export type TMessage = {
  user: string | null;
  message: string;
  id: string;
  file: {
    type: string;
    src: string;
  };
};
export interface Chat {
  messages: Awaited<Promise<Array<TMessage>>>;
  update: boolean;
  events: {
    isConnect: boolean;
  };
  users: Awaited<Promise<Array<string>>>;
  myName: string | null;
  thread: any;
  reply: null | TMessage;
  conn: any
  peerId: null | string;
}

const initialState: Chat = {
  update: false,
  messages: [],
  reply: null,
  events: {
    isConnect: false,
  },
  thread: [],
  users: [],
  myName: null,
  peerId: null,
  conn: null
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendName(state, action) {
      return {
        ...state,
        myName: action.payload,
      };
    },
    getUsers(state, action) {
      return {
        ...state,
        users: action.payload,
      };
    },
    updateMessages(state, action) {
      return {
        ...state,
        messages: action.payload,
      };
    },
    getMessage(state, action) {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    sendMessage(state, action): any { },
    replyMessage(state, action) {
      state.reply = action.payload;
    },
    savePeerId(state, action) {
      state.peerId = action.payload;
    },
    setConPeer(state, action) {
      state.conn = action.payload
    }
  },
});


const chatReducer = chatSlice.reducer;






export const {
  sendMessage,
  updateMessages,
  sendName,
  replyMessage,
  savePeerId,
  setConPeer
} = chatSlice.actions;


export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(createMySocketMiddleware()),
    getDefaultMiddleware().concat(createPeerMiddleware()),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
