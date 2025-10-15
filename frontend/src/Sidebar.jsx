import { useContext, useEffect, useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import './Sidebar.css';
import { BasicContext } from './Context/BasicContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/Context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();

  const {
    currThreadId,
    allThreads,
    setAllThreads,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
    createNewChat,
  } = useContext(BasicContext);

  const { setCurrentUser, userData } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const token = localStorage.getItem('token');

  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useClickAway(profileRef, () => setIsProfileOpen(false));

  const getAllThreads = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/thread/all',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      const filteredData = result.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      //console.log(filteredData);
      setAllThreads(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchQuery) {
        setSearchResults(allThreads);
      } else {
        const filtered = allThreads.filter((thread) =>
          thread.title
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
        );
        setSearchResults(filtered);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, allThreads]);

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const userDelete = async () => {
    if (!userData?._id) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${userData._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        alert('Error while deleting the User');
        return;
      }
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setCurrentUser(null);
      navigate('/login');
      alert('Your account has been deleted successfully!');
    } catch (error) {
      console.log(error);
      alert('Error while deleting the User');
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

        <ul className="sidebar-icons mx-3">
          <li
            onClick={createNewChat}
            className="create-sidebar-icon mt-3 mb-2"
          >
            <i className="fa-solid fa-pen-to-square"></i>&nbsp; New
            chat
          </li>
          <li className="search-sidebar-icon">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Chats"
              className="search-input"
            />
          </li>
        </ul>
        <p className=" my-2 mx-3 ps-3 list-of-chats pt-2">
          List of chats
        </p>
        <div className="sidebar-body">
          <ul className="history">
            {searchResults.map((thread, idx) => (
              <li
                key={idx}
                onClick={() => changeThread(thread.threadId)}
                className={`m-1 ms-2 p-2 history-li ${
                  thread.threadId === currThreadId
                    ? 'highlighted'
                    : ''
                }`}
              >
                {highlightText(thread.title, searchQuery)}
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-section" ref={profileRef}>
          {isProfileOpen && (
            <div className="profile">
              <div className="profile-list user-email">
                <i className="fa-solid fa-user m-2"></i>
                <span>
                  {' '}
                  {userData?.email
                    ? userData.email.split(' ').slice(0, 15).join(' ')
                    : 'Guest'}
                </span>
              </div>
              <div
                onClick={userDelete}
                style={{ padding: '10px 5px 10px 5px' }}
                className="profile-list"
              >
                <i className="fa-solid fa-trash ellipsis-options ms-2"></i>
                <span className="ms-2"> Delete user account</span>
              </div>
              <div className="profile-logout">
                <button
                  className="btn logout-btn"
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    setCurrentUser(null);
                    navigate('/login');
                    setIsProfileOpen(!isProfileOpen);
                  }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket mt-1 mx-2"></i>
                  Logout
                </button>
              </div>
            </div>
          )}
          <div className="profile-header">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="d-flex align-items-center"
            >
              <img
                src="ripuranjan1.jpg"
                alt="Profile"
                className="profile-img "
              />
              <p className="mt-2 mx-4 username">
                {userData?.username
                  ? userData.username.split(' ').slice(0, 7).join(' ')
                  : 'Guest'}
                <br />
                free
              </p>
              <button
                style={{
                  backgroundColor: '#423f3fff',
                  color: 'white',
                }}
                className="btn btn-sm mb-2 rounded-pill ms-auto me-3"
              >
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
