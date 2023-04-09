import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import localforage from "localforage";
import "./Messages.css";
import { TMessage } from "../../redux/store";
type TFile = {
  file: {
    file: string;
    type: string;
  };
  id: string;
};

async function mergeMessagesWithIDB(messages: any) {
  const mergedMessages = await localforage
    .getItem("files")
    .then((filesIDB: any) => {
      if (filesIDB) {
        return messages.map((message: any) => {
          const index = filesIDB.findIndex((file: any) => file.id === message.id)
          if (index) {
            return { ...message, file: filesIDB[index] }
          }
        })
      }
      return messages
    })
    .then((merged) => {
      return merged;
    });
  return mergedMessages;
}

const Messages = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const myName = useSelector((state: RootState) => state.chat.myName);
  const lastMessageRef: React.RefObject<HTMLLIElement> = React.useRef(null);
  const [messagesWithFiles, setMessagesWithFiles]: Awaited<Promise<any>> = useState(null);

  useEffect(() => {
    const getMessages = mergeMessagesWithIDB(messages);
    getMessages.then((mergedMessages) => {
      setMessagesWithFiles(mergedMessages);
    });
  }, [messages]);


  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesWithFiles]);


  return (
    <ul className="message">
      {messagesWithFiles?.map((data: any, index: number) => {
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
