// import React, { useEffect, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { getAuth } from 'firebase/auth';

// export function HappyPawsNav({ updateStreak, backgroundImage}) {
//   const [avatar, setAvatar] = useState('profileimage.png');
//   const [coinCount, setCoinCount] = useState(0);
//   const [streakCount, setStreakCount] = useState(0); 
//   const [coinCountUpdated, setCoinCountUpdated] = useState(false);
//   const [streakUpdated, setStreakUpdated] = useState(false);

//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();

//     const fetchCoinCount = (user) => {
//       if (user) {
//         const userId = user.uid;
//         const coinCountRef = ref(db, `users/${userId}/coinCount`);

//         onValue(coinCountRef, (snapshot) => {
//           const count = snapshot.val() || 0;
//           if (count !== coinCount) {
//             setCoinCountUpdated(true); 
//             setTimeout(() => {
//               setCoinCountUpdated(false);
//             }, 1000);
//           }
//           setCoinCount(count);
//         });
//       } else {
//         setCoinCount(0);
//       }
//     };

//     const fetchStreakCount = (user) => {
//       if (user) {
//         const userId = user.uid;
//         const streakRef = ref(db, `users/${userId}/streakCount`);

//         onValue(streakRef, (snapshot) => {
//           const streak = snapshot.val() || 0;
//           if (streak !== streakCount) {
//             setStreakUpdated(true); 
//             setTimeout(() => {
//               setStreakUpdated(false);
//             }, 500);
//           }
//           setStreakCount(streak);
//         });
//       } else {
//         setStreakCount(0);
//       }
//     };

//     fetchCoinCount(auth.currentUser);
//     fetchStreakCount(auth.currentUser);

//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       fetchCoinCount(user);
//       fetchStreakCount(user);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [updateStreak]); 

//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();

//     const updateAvatar = (user) => {
//       if (user) {
//         const userId = user.uid;
//         const avatarRef = ref(db, `${userId}/userAvatar`);

//         onValue(avatarRef, (snapshot) => {
//           const avatarUrl = snapshot.val();
//           if (avatarUrl) {
//             setAvatar(avatarUrl);
//           } else {
//             setAvatar('profileimage.png');
//           }
//         });
//       } else {
//         setAvatar('profileimage.png');
//       }
//     };

//     updateAvatar(auth.currentUser);
//     const unsubscribe = auth.onAuthStateChanged(updateAvatar);
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <header>
//       <h1><NavLink to="/home" style={{ color: '#f6f3eb', textDecoration: 'none'}}>happy paws</NavLink></h1>
//       <nav>
//         <ul>
//           <li><NavLink to="/clothing" style={{ color: '#f6f3eb', textDecoration: 'none'}}><img className="store" src="store.png" alt="store icon" />Store</NavLink></li>
//           <a href="https://www.flaticon.com/free-icons/shop" title="shop icons">Shop icons created by Freepik - Flaticon</a> 
//           <li><NavLink to="/diary" style={{ color: '#f6f3eb', textDecoration: 'none'}}><img className="diary" src="bluediary.png" alt="diary icon" />Diary</NavLink></li>
//           <a href="https://www.flaticon.com/free-icons/diary" title="diary icons">Diary icons created by Freepik - Flaticon</a> 
//           <li><NavLink to="/checkin" style={{ color: '#f6f3eb', textDecoration: 'none'}}><img className="fire" src="checkinimg.png" alt="checkin icon" />Check in</NavLink></li>
//           <a href="https://www.flaticon.com/free-icons/mood" title="mood icons">Mood icons created by Freepik - Flaticon</a> 
//           <li><img className={`coins ${coinCountUpdated ? 'bounce' : ''}`} src="coins.png" alt="coins icon" />{coinCount}</li>
//           dollar PNG Designed By IYIKON from https://pngtree.com/freepng/vector-coins-icon_3788228.html?sol=downref&id=bef 
//           <li><img className="fire" src="fire.png" alt="fire icon" style={{ transform: streakUpdated ? 'scale(1.5)' : 'scale(1)', transition: 'transform 0.8s ease-in-out' }}/>{streakCount}</li>
//           <li><NavLink to="/profile"><img className="profileimage" src={avatar} alt="profile icon" /></NavLink></li>
//           // <a href="https://www.vecteezy.com/free-vector/avatar">Avatar Vectors by Vecteezy</a> 
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default HappyPawsNav;


import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function HappyPawsNav({ updateStreak, backgroundImage }) {
  const [avatar, setAvatar] = useState('profileimage.png');
  const [coinCount, setCoinCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [coinCountUpdated, setCoinCountUpdated] = useState(false);
  const [streakUpdated, setStreakUpdated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchData(currentUser);
      } else {
        setAvatar('profileimage.png');
        setCoinCount(0);
        setStreakCount(0);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = (user) => {
    const db = getDatabase();
    const userId = user.uid;
    const coinCountRef = ref(db, `users/${userId}/coinCount`);
    const streakRef = ref(db, `users/${userId}/streakCount`);
    const avatarRef = ref(db, `${userId}/userAvatar`);

    onValue(coinCountRef, (snapshot) => {
      const count = snapshot.val() || 0;
      setCoinCount(count);
      setCoinCountUpdated(true);
      setTimeout(() => {
        setCoinCountUpdated(false);
      }, 1000);
    });

    onValue(streakRef, (snapshot) => {
      const streak = snapshot.val() || 0;
      setStreakCount(streak);
      setStreakUpdated(true);
      setTimeout(() => {
        setStreakUpdated(false);
      }, 500);
    });

    onValue(avatarRef, (snapshot) => {
      const avatarUrl = snapshot.val();
      setAvatar(avatarUrl || 'profileimage.png');
    });
  };

  return (
    <header>
      <h1>
        {user ? (
          <NavLink to="/home" style={{ color: '#f6f3eb', textDecoration: 'none' }}>
            happy paws
          </NavLink>
        ) : (
          <span style={{ color: '#f6f3eb', textDecoration: 'none' }}>happy paws</span>
        )}
      </h1>

      <nav>
        <ul>
          <li>
            {user ? (
              <NavLink to="/clothing" style={{ color: '#f6f3eb', textDecoration: 'none' }}>
                <img className="store" src="store.png" alt="store icon" />
                Store
              </NavLink>
            ) : (
              <span style={{ color: '#f6f3eb', opacity: 0.5 }}>
                <img className="store" src="store.png" alt="store icon" />
                Store
              </span>
            )}
          </li>
          <li>
            {user ? (
              <NavLink to="/diary" style={{ color: '#f6f3eb', textDecoration: 'none' }}>
                <img className="diary" src="bluediary.png" alt="diary icon" />
                Diary
              </NavLink>
            ) : (
              <span style={{ color: '#f6f3eb', opacity: 0.5 }}>
                <img className="diary" src="bluediary.png" alt="diary icon" />
                Diary
              </span>
            )}
          </li>
          <li>
            {user ? (
              <NavLink to="/checkin" style={{ color: '#f6f3eb', textDecoration: 'none' }}>
                <img className="check-smile" src="checkinimg.png" alt="checkin icon" />
                Check in
              </NavLink>
            ) : (
              <span style={{ color: '#f6f3eb', opacity: 0.5 }}>
                <img className="fire" src="checkinimg.png" alt="checkin icon" />
                Check in
              </span>
            )}
          </li>
          <li>
            <img className={`coins ${coinCountUpdated ? 'bounce' : ''}`} src="coins.png" alt="coins icon" />
            {coinCount}{' '}
          </li>
          <li>
            <img
              className="fire"
              src="fire.png"
              alt="fire icon"
              style={{ transform: streakUpdated ? 'scale(1.5)' : 'scale(1)', transition: 'transform 0.8s ease-in-out' }}
            />
            {streakCount}{' '}
          </li>
          <li>
            {user ? (
              <NavLink to="/profile">
                <img className="profileimage" src={avatar} alt="profile icon" />
              </NavLink>
            ) : (
              <img className="profileimage" src={avatar} alt="profile icon" style={{ opacity: 0.5 }} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HappyPawsNav;
