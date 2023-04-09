import { useSelector } from "react-redux";
import "./Window.css";
import MessagesContainer from "../MeesagesContainer";

const Window = () => {
  const id = useSelector((state: any) => state.chat.peerId);
  return (
    <section className="window">
      <div className="peerId">{id}</div>
      <MessagesContainer />
    </section>
  );
};

export default Window;
