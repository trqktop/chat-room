import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import localforage from "localforage";
import "./Messages.css";

const Messages = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const myName = useSelector((state: RootState) => state.chat.myName);
  const lastMessageRef: React.RefObject<HTMLLIElement> = React.useRef(null);
  const [messagesWithFiles, setMessagesWithFiles]: any = useState(null);
  useEffect(() => {
    localforage.getItem("files").then((dbFiles: any) => {
      if (dbFiles.length > -1) {
        const localState = messages.map((message: any) => {
          const index = dbFiles.findIndex((file: any) => {
            return message.id === file.id;
          });
          if (index > -1) {
            return { ...message, file: dbFiles[index].file };
          }
          return message;
        });
        return localState
      }
    }).then(localState => {
      setMessagesWithFiles(localState);
    })
  }, [messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesWithFiles]);

  return (
    <ul className="message">
      {messagesWithFiles?.map((data: any, index: number) => {// ??
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
  )
}
export default Messages;
