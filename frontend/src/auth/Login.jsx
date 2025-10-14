import './Login.css';

const Login = () => {
  return (
    <div
      style={{ backgroundColor: 'black', height: '43.5rem' }}
      className="d-flex flex-column align-items-center px-5"
    >
      <div className="login-box">
        <p className="fs-2 text-center">Login</p>
        <input
          placeholder="Enter Email"
          type="text"
          className="mb-2 form-control login-input"
        />
        <input
          placeholder="Enter Password"
          type="password"
          className="mb-3 form-control login-input"
        />
        <button className="btn border create-account">Log in</button>
        <p className="mt-5 text-center pt-3 rounded option-login">
          New to mini-GPT?
          <a href="" className="account-login ms-2">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
