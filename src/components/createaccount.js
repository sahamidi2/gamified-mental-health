import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import SignUpForm from './signup.js'; 

function CreateAccount() {
    let navigate = useNavigate();
  return (
    <div>
      <div className="login-body">
      </div>
      <SignUpForm />
    </div>
  );
}

export default CreateAccount;



