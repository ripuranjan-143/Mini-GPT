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
  const [signupButton, setSignupButton] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) return;
    setSignupButton(true);
    try {
      const res = await axios.post(
        'http://localhost:8080/api/user/signup',
        { username, email, password }
      );
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('token', res.data.token);
      setCurrentUser(res.data.userId);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Signup failed!');
    } finally {
      setSignupButton(false);
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
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 form-control signup-input"
        />
        <input
          autoComplete="off"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 form-control signup-input"
        />
        <input
          autoComplete="off"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="mb-3 form-control signup-input"
        />
        <button
          onClick={handleSignup}
          className="btn border create-account"
          disabled={signupButton}
        >
          Create Account
        </button>
        <p className="mt-5 text-center pt-3 rounded signin-up">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
