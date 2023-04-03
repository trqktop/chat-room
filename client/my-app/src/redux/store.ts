import {
  configureStore,
  createSlice,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { createMySocketMiddleware } from "./createMySocketMiddleware";
import localforage from "localforage";
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
}

const initialState: Chat = {
  update: false,
  messages: [],
  events: {
    isConnect: false,
  },
  thread: [],
  users: [],
  myName: null,
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
    getTread(state, action) {
      const newMessages = [...state.messages];
      const index = newMessages.findIndex((message) => {
        return message.id === action.payload.id;
      });
      newMessages[index] = action.payload;
      return { ...state, messages: newMessages };
    },


    sendThread(state, action) {
    // const newMessages = [...state.messages];
    //   const index = newMessages.findIndex((message) => {
    //     return message.id === action.payload.id;
    //   });
    //   newMessages[index] = action.payload;
    //   return { ...state, messages: newMessages };



      // return {
      //   ...state,
      //   thread: action.payload,
      // };
      // return {
      //   ...state,
      //   messages: [...state.messages, action.payload],
      // };
    },
    sendMessage(state, action): any {
      // return {
      //   ...state,
      //   update: !state.update
      // }
      // const { inputValue, fileData }: any = { ...action.payload };
      // return {
      //   ...state,
      //   messages: [
      //     ...state.messages,
      //     {
      //       user: state.myName,
      //       message: inputValue,
      //       file: fileData,
      //     },
      //   ],
      // };
    },
  },
});

const chatReducer = chatSlice.reducer;
export const { sendMessage, updateMessages, sendName, sendThread } =
  chatSlice.actions;
export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createMySocketMiddleware()),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
