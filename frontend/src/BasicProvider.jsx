import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const BasicContext = createContext('');

export const BasicProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv4());
  const [newChat, setNewChat] = useState(true);
  const [prevChats, setPrevChats] = useState([]);
  const [allThreads, setAllThreads] = useState([]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt('');
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
  };

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
    createNewChat,
  };
  return (
    <BasicContext.Provider value={providerValues}>
      {children}
    </BasicContext.Provider>
  );
};
