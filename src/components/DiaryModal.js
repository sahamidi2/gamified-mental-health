import React from 'react';
import { NavLink } from 'react-router-dom';

function DiaryModal( {backgroundImage} ) {
  return (
    <div className="checkin-body" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex-container-profile">
        <div className="checkin-card">
          <NavLink to="/home"><img className="x-btn" src="x.png" alt="close button"></img></NavLink>
          <img className="cheer" src="cheergif.gif" alt="giphy"></img>
          {/* gif sourced from giphy */}
          <p className="checkin-state">You earned 5 coins for completing a diary entry!</p>
        </div>
      </div>
    </div>
  );
}

export default DiaryModal;
