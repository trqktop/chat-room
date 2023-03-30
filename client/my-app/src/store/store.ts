import {
  configureStore,
  createSlice,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { createMySocketMiddleware } from "./createMySocketMiddleware";
type Message = {
  user: string | null;
  message: string;
  file: string | null;
};
export interface Chat {
  messages: Awaited<Promise<Array<Message>>>;
  events: {
    isConnect: boolean;
  };
  users: Awaited<Promise<Array<string>>>;
  myName: string | null;
}

const initialState: Chat = {
  messages: [],
  events: {
    isConnect: false,
  },
  users: [],
  myName: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    userName(state, action) {
      return {
        ...state,
        myName: action.payload,
      };
    },
    activeUsers(state, action) {
      return {
        ...state,
        users: action.payload,
      };
    },
    updateMessages(state, action) {
      return {
        ...state,
        messages: action.payload,
        events: {
          isConnect: true,
        },
      };
    },
    AddMessage(state, action) {
      const { inputValue, url }: any = { ...action.payload };
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            user: state.myName,
            message: inputValue,
            file: url ?? null,
          },
        ],
      };
    },
  },
});

const chatReducer = chatSlice.reducer;
export const { AddMessage, updateMessages, userName } = chatSlice.actions;
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
