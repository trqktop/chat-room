import "./Message.css";

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

  return (
    <>
      <span className="message__username">{user}</span>
      <span>{message}</span>
      <span className="message__file">{renderFile}</span>
    </>
  );
};

export default Message;
