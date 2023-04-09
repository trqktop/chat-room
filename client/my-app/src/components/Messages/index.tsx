import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import "./Messages.css";


const Messages = ({ messages, myName }: any) => {

  const lastMessageRef: React.RefObject<HTMLLIElement> = React.useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ul className="message">
      {messages?.map((data: any, index: number) => {
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
