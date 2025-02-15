import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../App.css';

const Login = ({ onSuccess, onError }) => {
  return (
    <div className="login">
      <h1>Hospital Finder</h1>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
};

export default Login;