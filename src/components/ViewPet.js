import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue, off, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { usePetImage } from './PetImageContext';

export default function ViewPet() {
  const location = useLocation();
  const backgroundImage = new URLSearchParams(location.search).get('backgroundImage') || 'basicbg.png';
  const [displayPetName, setDisplayPetName] = useState('Enter Name');
  const [progress, setProgress] = useState(25);
  const [petData, setPetData] = useState({});
  const { currentPetImage, updatePetImage } = usePetImage('dog1.png');

  const auth = getAuth();
  const db = getDatabase();

  // This useEffect is for fetching and setting the pet's progress
  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const progressRef = ref(db, `users/${userId}/petData`);

      const unsubscribe = onValue(progressRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPetData(data);  // Store the entire pet data
          setProgress(data.progress || 25);
          setDisplayPetName(data.displayPetName || 'Enter Name');
        }
      });

      return () => unsubscribe();
    }
  }, [auth.currentUser, db]);

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const userRef = ref(db, `users/${userId}/currentPet`);
      onValue(userRef, (snapshot) => {
        const petImageUrl = snapshot.val();
        if (petImageUrl) {
          updatePetImage(petImageUrl);
        }
      });
    }
  }, [auth.currentUser, db, updatePetImage]);

  const handleChangePetName = (newPetName) => {
    if (newPetName) {
      const userId = auth.currentUser.uid;
      const petRef = ref(db, `users/${userId}/petData`);
      const updatedPetData = {...petData, displayPetName: newPetName};
      setPetData(updatedPetData);
      set(ref(db, `users/${userId}/petData`), updatedPetData)
        .catch((error) => console.error("Error updating pet name: ", error));
    }
  };

  const healthMessage = progress === 100 ? "Your pet is healthy! Check in again tomorrow :)" : "Complete more activities to increase their health!";

  return (
    <div className="homepage" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex-container-profile">
        <div className="checkin-card">
          <div>
            <NavLink to="/home"><img className="xbutton" src="x.png" alt="Close button" /></NavLink>
            <div className='arrows-name'>
              <p className="pet-name" onClick={() => handleChangePetName(prompt('Enter new pet name'))}>{displayPetName}</p>
            </div>
            <div>
              <img className='dog-view' src={currentPetImage} alt="Pet" />
            </div>
            <div className="pet-health">
              <div className="progress-container" role="progressbar" aria-label="Pet Health Progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar-color" style={{ width: `${progress}%` }}>Pet Health {progress}%</div>
              </div>
            </div>
            <p className='health-msg'>{healthMessage}</p>
            <div className='closet-places-btns'>
              <NavLink to={{ pathname: "/mycloset", search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}>
                <div className="place-closet">
                  <img className="closet-btn-image" src="Boy_Shirt.png" alt="Closet icon" />
                  <p className="closet-places-text">My Closet</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

