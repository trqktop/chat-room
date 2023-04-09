import { TMessage } from "../../redux/store";
import localforage from "localforage";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Messages from "../Messages";
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

const MessagesContainer = () => {
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
        <Messages messages={messagesWithFiles} myName={myName} />
    );
};
export default MessagesContainer;
