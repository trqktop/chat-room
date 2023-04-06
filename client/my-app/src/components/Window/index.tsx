import { useSelector } from "react-redux";
import Messages from "../Messages";
import "./Window.css";

const Window = () => {
  const id = useSelector((state: any) => state.chat.peerId);
  return (
    <section className="window">
      <div className="peerId">{id}</div>
      <Messages />
    </section>
  );
};

export default Window;
