import Chat from './Chat';
import './ChatWindow.css';
import { ScaleLoader } from 'react-spinners';

const ChatWindow = () => {
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
          <i class="fa-solid fa-ellipsis ellipsis-option mx-5"></i>
          <div className="ellipsis-menu">
            <div>
              <i class="fa-solid fa-box-archive ellipsis-options"></i>
              &nbsp;Archive
            </div>
            <div>
              <i class="fa-solid fa-flag ellipsis-options"></i>
              &nbsp;Report
            </div>
            <div>
              <i class="fa-solid fa-trash ellipsis-options"></i>
              &nbsp;Delete
            </div>
          </div>
        </span>
      </div>
      <Chat></Chat>
      <ScaleLoader color="#fff"></ScaleLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input placeholder="Ask anything"></input>
          <div id="submit">
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
