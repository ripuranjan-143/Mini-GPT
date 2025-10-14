import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { setCurrentUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/user/login',
        {
          email,
          password,
        }
      );
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('token', res.data.token);
      setCurrentUser(res.data.userId);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div
      style={{ backgroundColor: 'black', height: '43.5rem' }}
      className="d-flex flex-column align-items-center px-5"
    >
      <div className="login-box">
        <p className="fs-2 text-center">Login</p>
        <input
          autoComplete="off"
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          type="text"
          className="mb-2 form-control login-input"
        />
        <input
          autoComplete="off"
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          type="password"
          className="mb-3 form-control login-input"
        />
        <button
          onClick={handleLogin}
          className="btn border create-account"
        >
          Log in
        </button>
        <p className="mt-5 text-center pt-3 rounded option-login">
          New to mini-GPT ?<Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
