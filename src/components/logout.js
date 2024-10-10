import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login'); 
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <button className="logout" onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
