import { useContext, useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import Chat from './Chat';
import './ChatWindow.css';
import { PulseLoader } from 'react-spinners';
import { BasicContext } from './Context/BasicContext';

const ChatWindow = () => {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
    setAllThreads,
    setCurrThreadId,
    createNewChat,
    newChat,
  } = useContext(BasicContext);

  const [loading, setLoading] = useState(false);
  const [isOption, setIsOption] = useState(false);

  const optionRef = useRef(null);
  const inputRef = useRef(null);

  // Close option dropdown when clicking outside
  useClickAway(optionRef, () => setIsOption(false));

  const getReply = async () => {
    if (!prompt.trim() || loading) return;

    const userMessage = prompt;
    setLoading(true);
    setNewChat(false);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        threadId: currThreadId,
      }),
    };

    try {
      const response = await fetch(
        'http://localhost:8080/api/chat',
        options
      );
      const res = await response.json();
      setPrevChats((prev) => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: res.reply },
      ]);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setPrompt('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const deleteThread = async (threadId) => {
    if (newChat || prevChats.length === 0) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        {
          method: 'DELETE',
        }
      );
      const res = await response.json();
      console.log(res);
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );
      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
    const textarea = inputRef.current;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 150);
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span className="minigpt ms-4 p-2">
          MiniGPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <span className="d-flex">
          <span className="d-flex share-doc align-items-center me-2">
            <i className="share-icon fa-solid fa-arrow-up-from-bracket"></i>
            <p className="mb-0 ms-2">Share</p>
          </span>
          <div ref={optionRef} className="option-container">
            <i
              onClick={() => setIsOption(!isOption)}
              className="fa-solid fa-ellipsis ellipsis-option mx-5"
            ></i>
            {isOption && (
              <div className="ellipsis-menu">
                <div>
                  <i className="fa-solid fa-box-archive ellipsis-options"></i>
                  &nbsp;Archive
                </div>
                <div>
                  <i className="fa-solid fa-flag ellipsis-options"></i>
                  &nbsp;Report
                </div>
                <div
                  className="ellipsis-options-row"
                  onClick={() => {
                    deleteThread(currThreadId);
                    setIsOption(false);
                  }}
                >
                  <i className="fa-solid fa-trash ellipsis-options"></i>
                  &nbsp;Delete
                </div>
              </div>
            )}
          </div>
        </span>
      </div>
      <Chat></Chat>
      <PulseLoader
        color="#fff"
        loading={loading}
        className={`scale-loader ${newChat ? 'new-chat' : ''}`}
      />
      <div className="chatInput">
        <div className="inputBox">
          <textarea
            className="chat-textarea fs-6"
            placeholder="Ask anything..."
            value={prompt}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                getReply();
              }
            }}
            ref={inputRef}
          />
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
