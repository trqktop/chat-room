import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { AddMessage, userName } from "./store/store";
import "./index.css";
import nameGenerator from "./features/nameGenerator";
const container = document.getElementById("root")!;
const root = createRoot(container);
//  "proxy": "http://192.168.2.225:8888" my
//  "proxy": "http://192.168.2.159:8000"

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const randomName = nameGenerator();
    dispatch(userName(randomName));
  }, []);

  return (
    <div className="page">
      <header className="header">
        <UserList />
      </header>
      <main className="content">
        <div></div>
        <Window />
        <Form />
      </main>
      <footer></footer>
    </div>
  );
};

const Form = () => {
  const dispatch = useDispatch();
  const [inputValue, setValue] = useState("");
  const test = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const value = e.target[0].value;
    if (value.length >= 1) {
      dispatch(AddMessage(value));
      setValue("");
    }
  };
  return (
    <section className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          className="form__input"
          onChange={test}
        ></input>
        <button type="submit" className="form__submit"></button>
      </form>
    </section>
  );
};

const Window = () => {
  return (
    <section className="window">
      <Messages />
    </section>
  );
};

const Messages = () => {
  const messages = useSelector((state: any) => state.chat.messages);
  const myName = useSelector((state: any) => state.chat.myName);
  const lastMessageRef: any = React.useRef(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ul className="message">
      {messages.map((message: any, index: any) => {
        const classes =
          myName === message.user
            ? "message__item"
            : "message__item message__item_get";

        return (
          <li className={classes} key={index} ref={lastMessageRef}>
            <span className="message__username">{message?.user}</span>
            <span>{message?.text}</span>
          </li>
        );
      })}
    </ul>
  );
};

const UserList = () => {
  const users = useSelector((state: any) => state.chat.users);

  return (
    <ul className="users">
      {users.map((name: any, index: any) => (
        <li className="users__item" key={index}>
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
};

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
