import { configureStore, ThunkAction, Action, createSlice } from '@reduxjs/toolkit';
import { createMySocketMiddleware } from './createMySocketMiddleware';

export interface Chat {
  messages: any[];
  events: {
    isConnect: boolean;
  };
  users: any[];
  myName: any;
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
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
  },
});

const chatReducer = chatSlice.reducer;

//тут будут действия сокета
// dispatch(action)
//при вызове диспатча сначала работаем с сокетом. потом с диспатчем

export const { AddMessage, updateMessages, userName } = chatSlice.actions;



export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createMySocketMiddleware()
    ),
});


