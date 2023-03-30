import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import { AddMessage, userName } from "./store/store";
import "./index.css";
import nameGenerator from "./features/nameGenerator";
import { resolve } from "path";
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
  const [filePath, setFilePath] = useState(null);

  const inputChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // const sendMessageWithImage = (fileInput: any) => {
  //   const reader = new FileReader();
  //   const file = fileInput.files[0];
  //   reader.onloadend = function () {
  //     const url = reader.result;
  //     dispatch(AddMessage({ inputValue, url }));
  //   };
  //   reader.readAsDataURL(file);
  //   fileInput.value = "";
  //   setFilePath(null);
  // };



  const toBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((res) => {
      reader.onloadend = function () {
        const url = reader.result;
        res(url)
      };
    })
  }


  const sendMessageWithFiles = (fileInput: any) => {
    const file = fileInput.files[0];
    toBase64(file)
      .then(url => {
        dispatch(AddMessage({ inputValue, url }));
      })
    setFilePath(null);
  };

  const sendMessage = (e: React.ChangeEvent<any>) => {
    dispatch(AddMessage({ inputValue }));
    e.target[1].value = "";
  };

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const text = e.target[0].value;
    const fileInput = e.target[1];
    if (text.length >= 1 && fileInput.value.length < 1) {
      sendMessage(e);
    } else if (fileInput.value.length > 1) {
      sendMessageWithFiles(fileInput);
    }
    setValue("");
    fileInput.value = "";
  };

  const handleFilePick = (e: any) => {
    const fileName = e.target.files[0].name;
    setFilePath(fileName);
  };

  return (
    <section className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          className="form__input"
          onChange={inputChangeValue}
        ></input>
        <label className="form__input-file-label">
          <input name="file" type="file" onChange={handleFilePick} />
          <span className="form__input-label-text">
            {filePath ?? "updload file"}
          </span>
        </label>
        <button type="submit" className="form__submit">
          submit
        </button>
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
  const messages = useSelector((state: RootState) => state.chat.messages);
  const myName = useSelector((state: RootState) => state.chat.myName);
  const lastMessageRef: React.RefObject<HTMLLIElement> = React.useRef(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <ul className="message">
      {messages.map(({ message, user, file }, index: number) => {
        let fileContent;
        if (file?.includes("image")) {
          fileContent = (
            <img alt={message} src={file} className="message__image" />
          );
        } else if (file?.includes("audio")) {
          fileContent = <audio controls src={file}></audio>;
        }
        else if (file?.includes('video')) {
          fileContent = (
            <video width={window.innerWidth / 3} height={window.innerHeight / 3} controls>
              <source src={file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>)
        }
        const classes =
          myName === user ? "message__item" : "message__item message__item_get";
        return (
          <li className={classes} key={index} ref={lastMessageRef}>
            <span className="message__username">{user}</span>
            <span>{message}</span>
            {file ? <span>{fileContent}</span> : null}
          </li>
        );
      })}
    </ul>
  );
};

const UserList = () => {
  const users = useSelector((state: RootState) => state.chat.users);

  return (
    <ul className="users">
      {users.map((name: string, index: number) => (
        <li className="users__item" key={index}>
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
};

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
