import { useContext, useEffect, useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import './Sidebar.css';
import { BasicContext } from './BasicProvider';
import { v4 as uuidv4 } from 'uuid';

const Sidebar = () => {
  const {
    currThreadId,
    allThreads,
    setAllThreads,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(BasicContext);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useClickAway(profileRef, () => setIsProfileOpen(false));

  const getAllThreads = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/thread/all'
      );
      const result = await response.json();
      const filteredData = result.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      console.log(filteredData);
      setAllThreads(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt('');
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`
      );
      const result = await response.json();
      //console.log(result);
      setPrevChats(result);
      setNewChat(false);
      setReply(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="sidebar">
        <div className="icon-row">
          <img
            src="src/assets/blacklogo.png"
            alt="gpt logo"
            className="logo"
          ></img>
          <i className="fa-solid fa-toggle-on toggle-icon"></i>
        </div>

        <div className="sidebar-body">
          <ul className="sidebar-icons">
            <li
              onClick={createNewChat}
              className="sidebar-icon mt-3 mb-2"
            >
              <i className="fa-solid fa-pen-to-square"></i>&nbsp; New
              chat
            </li>
            <li className="sidebar-icon">
              <i className="fa-solid fa-magnifying-glass"></i>&nbsp;
              Search chats
            </li>
          </ul>

          <ul className="history">
            <p className="mt-5 ms-2 ps-1">Chats</p>
            {allThreads.map((thread, idx) => (
              <li
                key={idx}
                onClick={() => changeThread(thread.threadId)}
                className={`m-1 p-2 history-li ${
                  thread.threadId === currThreadId
                    ? 'highlighted'
                    : ''
                }`}
              >
                {thread.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-section">
          {isProfileOpen && (
            <div className="profile">
              <div className="profile-list">
                <i className="fa-solid fa-user m-2"></i>
                username
              </div>
              <div className="profile-list">
                <i className="fa-solid fa-cloud-arrow-up m-2"></i>
                Upgrade Plan
              </div>
              <div className="profile-list">
                <i className="fa-solid fa-star m-2"></i>
                Personalization
              </div>
              <div className="border-bottom profile-list">
                <i className="fa-solid fa-gear m-2"></i>Settings
              </div>
              <div className="profile-list">
                <i className="fa-solid fa-user-clock m-2"></i>
                Help
              </div>
              <div className="profile-list">
                <div type="button" className="">
                  <i className="fa-solid fa-arrow-right-from-bracket m-2"></i>
                  &nbsp; Logout
                </div>
              </div>
            </div>
          )}
          <div className="profile-header"  ref={profileRef}>
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="d-flex align-items-center "
            >
              <img
                src="ripuranjan1.jpg"
                alt="Profile"
                className="profile-img "
              />
              <p className="mt-2 mx-4 username">
                ripuranjan <br />
                free
              </p>
              <button className="btn btn-sm btn-primary mb-2 rounded-pill">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
