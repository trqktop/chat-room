import { configureStore, ThunkAction, Action, createSlice } from '@reduxjs/toolkit';

import { soketMideware } from './socketMiddleware';


export interface Chat {
  messages: any[],
  events: {
    isConnect: boolean
  },
  users: any[]
}
const initialState: Chat = {
  messages: [],
  events: {
    isConnect: false
  },
  users: []
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    connect(state, action) {
      return ({
        ...state,
        messages: action.payload,
        events: {
          isConnect: true
        }
      })
    },
    disconnect(state, action) {
    },
    message(state, action) {
  
      return ({
        ...state,
        messages: [...state.messages, action.payload],
      })
    }
  },
});


const chatReducer = chatSlice.reducer







//тут будут действия сокета
// dispatch(action)
//при вызове диспатча сначала работаем с сокетом. потом с диспатчем

export const { connect, disconnect, message } = chatSlice.actions;


export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(soketMideware),
});


