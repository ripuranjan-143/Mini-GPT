import './Chat.css';
import { useContext } from 'react';
import { BasicContext } from './BasicProvider';

const Chat = () => {
  const { newChat, reply } = useContext(BasicContext);
  return (
    <>
      {newChat && (
        <h2 className="text-center mt-5 me-5">Start a new Chat!</h2>
      )}
      <div className="chats">
        <div className="userDiv">
          <p className="userMessage">User message </p>
        </div>
        <div className="gptDiv">
          <p>Gpt generated message</p>
        </div>
      </div>
    </>
  );
};

export default Chat;
