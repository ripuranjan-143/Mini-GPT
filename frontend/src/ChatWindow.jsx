import { useContext } from 'react';
import Chat from './Chat';
import './ChatWindow.css';
import { PulseLoader } from 'react-spinners';
import { BasicContext } from './BasicProvider';

const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currThreadId } =
    useContext(BasicContext);

  const getReply = async () => {
    if (!prompt.trim()) {
      return;
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch(
        'http://localhost:8080/api/chat',
        options
      );
      const res = await response.json();
      console.log('res === ', res);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatWindow mt-3">
      <div className="navbar">
        <span className="minigpt ms-4 p-2">
          MiniGPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <span className="d-flex">
          <span className="d-flex share-doc align-items-center me-2">
            <i className="share-icon fa-solid fa-arrow-up-from-bracket"></i>
            <p className="mb-0 ms-2">Share</p>
          </span>
          <i className="fa-solid fa-ellipsis ellipsis-option mx-5"></i>
          <div className="ellipsis-menu">
            <div>
              <i className="fa-solid fa-box-archive ellipsis-options"></i>
              &nbsp;Archive
            </div>
            <div>
              <i className="fa-solid fa-flag ellipsis-options"></i>
              &nbsp;Report
            </div>
            <div>
              <i className="fa-solid fa-trash ellipsis-options"></i>
              &nbsp;Delete
            </div>
          </div>
        </span>
      </div>
      <Chat></Chat>
      <PulseLoader color="#fff"></PulseLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? getReply() : '')}
          ></input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          SigmaGPT can make mistakes. Check important info.{' '}
          <a href="#">See Cookie</a> Preferences.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
