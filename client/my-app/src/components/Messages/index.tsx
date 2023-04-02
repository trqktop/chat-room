import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import localforage from 'localforage'
import "./Messages.css";
const Messages = () => {
  const update = useSelector((state: RootState) => state.chat.update);
  const myName = useSelector((state: RootState) => state.chat.myName);
  const [messages, setMessages]: any = useState([])
  const lastMessageRef: React.RefObject<HTMLLIElement> = React.useRef(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localforage.getItem('messages').then((messages): any => {
      setMessages(messages)
    })
  }, [update])

  return (
    <ul className="message">
      {messages.map((data: any, index: number) => {
        const { user }: any = { ...data };
        const classes =
          myName === user ? "message__item" : "message__item message__item_get";
        return (
          <li className={classes} key={index} ref={lastMessageRef}>
            <Message data={data} />
          </li>
        );
      })}

    </ul>
  );
};

export default Messages;
