import { sendMessage } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { sendName } from "../../redux/store";
import nameGenerator from "../../features/nameGenerator";
import toBase64 from "../../features/toBase64";
import "./Form.css";

const Form = () => {
  const [inputValue, setValue] = useState("");
  const [filePath, setFilePath] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const randomName = nameGenerator();
    dispatch(sendName(randomName));
  }, []);

  const sendMessageWithFiles = (fileInput: any, setFilePath: any) => {
    const file = fileInput.files[0];
    toBase64(file).then((url) => {
      const fileData = {
        src: url,
        type: file.type,
      };
      dispatch(sendMessage({ inputValue, fileData }));
    });
    setFilePath(null);
  };

  const sendMessageWithoutFiles = (e: any) => {
    dispatch(sendMessage({ inputValue }));
    e.target[1].value = "";
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const text = e.target[0].value;
    const fileInput = e.target[1];
    if (text.length >= 1 && fileInput.value.length < 1) {
      sendMessageWithoutFiles(e);
    } else if (fileInput.value.length > 1) {
      sendMessageWithFiles(fileInput, setFilePath);
    }
    setValue("");
    fileInput.value = "";
  };

  const handleFilePick = (e: any) => {
    const filePath = e.target.files[0].name;
    setFilePath(filePath);
  };

  return (
    <section className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          className="form__input"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Message"
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

export default Form;
