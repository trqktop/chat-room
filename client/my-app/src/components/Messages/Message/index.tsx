import "./Message.css";
import { useEffect, useState } from "react";
import ThreadModal from "../../ThreadModal";
const getFile = (type: string, src: string) => {
  const searchType = type.split("/")[0];
  switch (searchType) {
    case "image":
      return <img alt={type} src={src} className="message__image" />;
    case "audio":
      return <audio controls src={src} />;
    case "video":
      return (
        <video
          width={window.innerWidth / 4}
          height={window.innerHeight / 3}
          controls
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
  }
  return null;
};

const Message = ({ data }: any) => {
  const { user, message, file }: any = { ...data };
  const { src, type }: any = { ...file };
  const renderFile = file ? getFile(type, src) : null;
  const [modalIsOpened, openModal] = useState(false);

  const closeThreadHandler = (e: any) => {
    e.stopPropagation();
    if (modalIsOpened) {
      openModal(false);
    }
  };
  const openThreadHandler = (e: any) => {
    if (!modalIsOpened) {
      openModal(true);
    }
  };

  return (
    <>
      {/* {modalIsOpened ? <MessageModal /> : null}  */}
      <div className="message__item-container" onClick={openThreadHandler}>
        <span className="message__username">{user}</span>
        <span>{message}</span>
        <span className="message__file">{renderFile}</span>
        <div className="message__tread-group">
          <span className="message__tgread-count">1</span>
          <svg
            className="message__thread-button"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12  "
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(165, 165, 165)"
              d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"
            />
          </svg>
        </div>
        {modalIsOpened ? (
          <div>
            <svg
              onClick={closeThreadHandler}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
              />
            </svg>
            {/* <ThreadModal data={data} /> */}
          </div>
        ) : null}
      </div>
    </>
  );
};

// const MessageModal = () => {
//   return (
//     <div className="message__modal">
//       <ul>
//         <li>ответить</li>
//         <li>переслать</li>
//       </ul>
//     </div>
//   );
// };

export default Message;
