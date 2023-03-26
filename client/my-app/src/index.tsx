import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { connect, disconnect, message } from './store/store';
import './index.css'
import { io } from 'socket.io-client';
let socket = io()
const container = document.getElementById('root')!;
const root = createRoot(container);



const App = () => {
  const disapatch = useDispatch()


  useEffect(() => {
    socket.on('rooms', (messages) => {
      disapatch(connect(messages))
    })
  }, [])

  return (
    <div className='page'>
      <header className='header'>
        <UserList />
      </header>
      <main className='content'>
        <Window />
        <Form />
      </main>
      <footer></footer>
    </div>
  )
}

const Form = () => {
  const dispatch = useDispatch()
  const handleSubmit = (e: any) => {
    e.preventDefault()
    socket.emit('message', e.target[0].value)
    dispatch(message(e.target[0].value))
  }
  return (
    <section className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <input type="text" className='form__input'></input>
        <button type="submit" className='form__submit'></button>
      </form>
    </section>
  )
}

const Window = () => {
  return (
    <section className='window'>
      <Messages />
    </section>
  )
}

const Messages = () => {
  const messages = useSelector((state: any) => state.chat.messages)
  const dispatch = useDispatch()


  useEffect(() => {
    console.log('update')
    socket.on('rooms', (messages) => {
      dispatch(connect(messages))
    })
  }, [messages])



  return (
    <ul className='message'>
      {messages.map((message: any, index: any) => <li className='message__item' key={index}>{message}</li>)}
    </ul>
  )
}

const UserList = () => {
  const users = useSelector((state: any) => state.chat.users)

  return (
    <ul className='users'>
      {users.map((name: any, index: any) => <li className='users__item' key={index}>{name}</li>)}
    </ul>
  )
}


root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

