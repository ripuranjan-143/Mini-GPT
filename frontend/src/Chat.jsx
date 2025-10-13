import './Chat.css';
import { useContext, useState, useEffect } from 'react';
import { BasicContext } from './BasicProvider';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const Chat = () => {
  const { newChat, prevChats, reply } = useContext(BasicContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (!reply) {
      setLatestReply(null);
      return;
    }
    const allWords = reply.split(' ');
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(allWords.slice(0, idx + 1).join(' '));
      idx++;
      if (idx >= allWords.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [reply, newChat, prevChats]);
  const displayChats = reply ? prevChats.slice(0, -1) : prevChats;
  return (
    <>
      {newChat && (
        <h2 className="text-center mt-5 me-5">Start a new Chat!</h2>
      )}
      <div className="chats">
        {displayChats?.map((chat, idx) => (
          <div
            className={chat.role === 'user' ? 'userDiv' : 'gptDiv'}
            key={idx}
          >
            {chat.role === 'user' ? (
              <p className="usermessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}
        {latestReply !== null && (
          <div className="gptDiv" key="typing">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {latestReply}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
