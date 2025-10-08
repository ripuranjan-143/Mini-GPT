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
            <li className="m-1 p-2 history-li">
              basic messages<i className="fa-solid fa-trash"></i>
            </li>
          </ul>
        </div>

        <div className="profile-section">
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

          <div className="profile-header">
            <div className="d-flex align-items-center ">
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
