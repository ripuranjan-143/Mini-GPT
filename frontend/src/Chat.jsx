import './Chat.css';
import { useContext } from 'react';
import { BasicContext } from './BasicProvider';

const Chat = () => {
  const { newChat, prevChats, reply } = useContext(BasicContext);
  return (
    <>
      {newChat && (
        <h2 className="text-center mt-5 me-5">Start a new Chat!</h2>
      )}
      <div className="chats">
        {prevChats?.map((chat, idx) => (
          <div
            className={chat.role === 'user' ? 'userDiv' : 'gptDiv'}
            key={idx}
          >
            {chat.role === 'user' ? (
              <p className="usermessage">{chat.content}</p>
            ) : (
              <p className="gptmessage">{chat.content}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
