import React from 'react';
import Modal from 'react-bootstrap/Modal';

function AvatarSelection({ onSelectAvatar, handleClose, show }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select an avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="avatar-options">
            <img
              className="profile-pic"
              src="profileimage.png"
              alt="profile pic"
              onClick={() => onSelectAvatar("profileimage.png")}
              // <a href="https://www.vecteezy.com/free-vector/avatar">Avatar Vectors by Vecteezy</a>
            />
            <img
              className="profile-pic"
              src="dogavatar.png"
              alt="profile pic"
              onClick={() => onSelectAvatar("dogavatar.png")}
              // <a href="https://www.vecteezy.com/free-vector/avatar">Avatar Vectors by Vecteezy</a>
            />
            <img
              className="profile-pic"
              src="bearavatar.png"
              alt="profile pic"
              onClick={() => onSelectAvatar("bearavatar.png")}
              // <a href="https://www.vecteezy.com/free-vector/avatar">Avatar Vectors by Vecteezy</a>
            />
            <img
              className="profile-pic"
              src="foxavatar.png"
              alt="profile pic"
              onClick={() => onSelectAvatar("foxavatar.png")}
              // <a href="https://www.vecteezy.com/free-vector/avatar">Avatar Vectors by Vecteezy</a>
            />
            <img
              className="profile-pic"
              src="pigavatar.png"
              alt="profile pic"
              onClick={() => onSelectAvatar("pigavatar.png")}
              // <a href="https://www.vecteezy.com/free-vector/avatar">Avatar Vectors by Vecteezy</a>
            />
            <img
              className="profile-pic"
              src="mouseavatar.png"
              alt="profile pic"
              onClick={() => onSelectAvatar("mouseavatar.png")}
              // <a href="https://www.vecteezy.com/free-vector/avatar">Avatar Vectors by Vecteezy</a>
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AvatarSelection;
