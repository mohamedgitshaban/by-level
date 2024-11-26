// src/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../apis/AuthApi';

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      if (response.status === 400) {
        setLoginError("");
        if (response.message.password) {
          setPasswordError(response.message.password);
        }
        if (response.message.email) {
          setEmailError(response.message.email);
        }
      } else if (response.status === 200) {
        localStorage.setItem('AgriCapital_token', response.token);
        const jsonString = JSON.stringify(response.user);
        localStorage.setItem('AgriCapital_user', jsonString);
        navigate('/');
      } else {
        setLoginError(response.message);
        setPasswordError("");
        setEmailError("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="border-top-wide border-primary d-flex flex-column theme-dark">
      <div className="page page-center">
        <div className="container-tight py-4">
          <div className="text-center mb-4">
            <a href="." className="navbar-brand navbar-brand-autodark">
              <img src={require("../assets/logo-removebg-preview.png")} height="36" alt="logo" />
            </a>
          </div>

          <form className="card card-md" onSubmit={handleSubmit} autoComplete="on">
            {loginError && <p className="card-text text-danger">{loginError}</p>}
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login to your account</h2>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
                {emailError && <label className="error mt-2 text-danger">{emailError}</label>}
              </div>
              <div className="mb-2">
                <label className="form-label">Password</label>
                <div className="input-group input-group-flat">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {passwordError && <label className="error mt-2 text-danger" style={{ display: "block", width: "100%" }}>{passwordError}</label>}
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">Sign in</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
