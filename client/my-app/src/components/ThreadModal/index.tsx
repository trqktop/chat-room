import React from "react";
import { useSelector } from "react-redux";
import ThreadForm from "../ThreadForm";
import "./ThreadModal.css";

const ThreadModal = (data: any) => {
  const thread = useSelector((state: any) => state.chat.thread);
  return (
    <div className="thread">
      <div>
        <ul className="thread__messages">
          {thread
            ? thread.map((item: any, index: number) => (
                <li key={index} className="thread__message">
                  {item}
                </li>
              ))
            : null}
        </ul>
        <ThreadForm data={data} />
      </div>
    </div>
  );
};
export default ThreadModal;
