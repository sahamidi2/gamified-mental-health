import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { NavLink } from 'react-router-dom';

export default function MyPlaces() {
  const [items, setItems] = useState({});

  useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
          if (user) {
              const db = getDatabase();
              const userRef = ref(db, `users/${user.uid}/purchasedItems`);
              get(userRef).then((snapshot) => {
                  if (snapshot.exists()) {
                      setItems(snapshot.val());
                  }
              });
          }
      });
  }, []);

return (
  <div className="checkin-body">
    <div className="flex-container-profile">
      <div className="checkin-card">
          <div>
            <p className="closet-title">My Places</p>
            <div className= 'places-list'>
            {Object.values(items).map((item) => (
                                <div key={item.itemName} className="clothing-item">
                                    <img src={item.imgSrc} alt={item.itemName} />
                                    <p>{item.itemName}</p>
                                </div>
                            ))}
            </div>
            </div>
            <NavLink to="/viewPet"><p className="back-btn"> Back </p></NavLink>
          </div>
      </div>
    </div>
);
}