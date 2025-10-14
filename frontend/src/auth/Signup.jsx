import { useState } from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div
      style={{ backgroundColor: 'black', height: '43.45rem' }}
      className="d-flex flex-column align-items-center px-5"
    >
      <div className="signup-box">
        <p className="fs-2 text-center">Signup</p>
        <input
          placeholder="Enter Username"
          type="text"
          className="mb-2 form-control signup-input"
        />
        <input
          placeholder="Enter Email"
          type="text"
          className="mb-2 form-control signup-input"
        />
        <input
          placeholder="Enter Password"
          type="password"
          className="mb-3 form-control signup-input"
        />
        <button className="btn border create-account">
          Create Account
        </button>
        <p className="mt-5 text-center pt-3 rounded signin-up">
          Already have an account?
          <a href="" className="account-login ms-2">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
