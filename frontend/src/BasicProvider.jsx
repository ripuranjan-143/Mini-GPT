import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const BasicContext = createContext('');

export const BasicProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv4());

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
  };
  return (
    <BasicContext.Provider value={providerValues}>
      {children}
    </BasicContext.Provider>
  );
};