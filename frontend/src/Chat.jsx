import './Chat.css';
import { useContext, useState, useEffect } from 'react';
import { BasicContext } from './BasicProvider';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const Chat = () => {
  const { newChat, prevChats, reply } = useContext(BasicContext);
  const [latestReply, setLatestReply] = useState('');

  useEffect(() => {
    if (!reply) return;
    const words = reply.split(' ');
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(words.slice(0, idx + 1).join(' '));
      idx++;
      if (idx >= words.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [reply]);

  return (
    <>
      {newChat && (
        <h2 className="text-center mt-5 me-5">Start a new Chat!</h2>
      )}
      <div className="chats">
        {prevChats?.slice(0, -1).map((chat, idx) => (
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
        {prevChats.length > 0 && reply && (
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
