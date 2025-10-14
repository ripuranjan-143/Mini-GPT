import { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const { setCurrentUser } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/user/signup',
        {
          username,
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
    }
  };

  return (
    <div
      style={{ backgroundColor: 'black', height: '43.45rem' }}
      className="d-flex flex-column align-items-center px-5"
    >
      <div className="signup-box">
        <p className="fs-2 text-center">Signup</p>
        <input
          autoComplete="off"
          name="Username"
          placeholder="Enter Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 form-control signup-input"
        />
        <input
          autoComplete="off"
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          type="text"
          className="mb-2 form-control signup-input"
        />
        <input
          autoComplete="off"
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          type="password"
          className="mb-3 form-control signup-input"
        />
        <button
          onClick={handleSignup}
          className="btn border create-account"
        >
          Create Account
        </button>
        <p className="mt-5 text-center pt-3 rounded signin-up">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
