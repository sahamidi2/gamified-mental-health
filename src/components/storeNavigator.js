import React from 'react';
import { useNavigate } from 'react-router-dom';

function StoreNavigator() {
  let navigate = useNavigate();

  return (
    <nav className="store-navigator">
      <button className='clothing-btn' onClick={() => navigate('/clothing')}>Clothing</button>
      <button className='necessities-btn' onClick={() => navigate('/necessities')}>Necessities</button>
      <button className='pets-btn' onClick={() => navigate('/pets')}>Pets</button>
    </nav>
  );
}

export default StoreNavigator;

