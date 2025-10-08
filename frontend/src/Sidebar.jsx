import './Sidebar.css';

const Sidebar = () => {
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
            <li className="sidebar-icon mt-3 mb-2">
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
            <li className='m-1 p-2 history-li'>
              basic messages<i className="fa-solid fa-trash"></i>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
