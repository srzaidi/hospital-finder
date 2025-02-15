import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../App.css';

const Login = ({ onSuccess, onError }) => {
  return (
    <div className="login">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
};

export default Login;