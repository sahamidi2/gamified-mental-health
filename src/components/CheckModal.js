import React from 'react';
import { NavLink } from 'react-router-dom';

function CheckModal( {backgroundImage} ) {
  return (
    <div className="checkin-body" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex-container-profile">
        <div className="checkin-card">
          <NavLink to="/home"><img className="x-btn" src="x.png" alt="close button"></img></NavLink>
          <img className="cheering" src="giphy.gif" alt="giphy"></img>
          {/* gif sourced from giphy */}
          <p className="checkin-state">You earned 2 coins for completing your daily check in!</p>
        </div>
      </div>
    </div>
  );
}

export default CheckModal;
