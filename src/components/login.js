import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import SignInForm from './loginbox.js'; 

function LoginPage() {
    let navigate = useNavigate();
  return (
    <div>
      <div className="login-body">
      </div>
      <SignInForm />
    </div>
  );
}

export default LoginPage;
