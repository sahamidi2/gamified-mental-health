import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import LogoutButton from './logout'; 
import AvatarSelection from './avatars'; 
import { NavLink } from 'react-router-dom';
import Chart from 'chart.js/auto'; 

function Profile() {
  const [moodEntries, setMoodEntries] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [displayName, setDisplayName] = useState('Enter Name'); 
  const [previousDisplayName, setPreviousDisplayName] = useState('Enter Name');
  const [selectedAvatar, setSelectedAvatar] = useState(null); 
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [topTags, setTopTags] = useState([]);
  const [overallMoodCounts, setOverallMoodCounts] = useState({
    frown: 0,
    slightfrown: 0,
    neutral: 0,
    slightsmile: 0,
    smile: 0
  });

  const countOverallMoodOccurrences = (entries) => {
    const counts = {
      frown: 0,
      slightfrown: 0,
      neutral: 0,
      slightsmile: 0,
      smile: 0
    };
    entries.forEach(entry => {
      counts[entry.mood] += 1;
    });
    return counts;
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const moodRef = ref(db, `${userId}/moodEntries`);
      const userRef = ref(db, `${userId}/userData`);
      const avatarRef = ref(db, `${userId}/userAvatar`);
      setUserEmail(auth.currentUser.email);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.displayName) {
          setDisplayName(userData.displayName);
          setPreviousDisplayName(userData.displayName); 
        }
      });

      onValue(avatarRef, (snapshot) => {
        const avatarData = snapshot.val();
        if (avatarData) {
          setSelectedAvatar(avatarData);
        }
      });
      
      onValue(moodRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Fetched mood entries:", data);  
        if (data) {
          const entries = Object.values(data);
          setMoodEntries(entries);
          const overallCounts = countOverallMoodOccurrences(entries);
          setOverallMoodCounts(overallCounts);
        } else {
          setMoodEntries([]);  // Ensure this is an empty array if nothing is fetched
        }
      });
    }
  }, []);

  useEffect(() => {
    // for my chartjs!
    const ctx = document.getElementById('moodChart');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['😞', '🙁', '😐', '🙂', '😊'],
        datasets: [{
          label: 'Overall Mood Counts',
          data: [overallMoodCounts.frown, overallMoodCounts.slightfrown, overallMoodCounts.neutral, overallMoodCounts.slightsmile, overallMoodCounts.smile],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0, 
            stepSize: 1 
          }
        }
      }
    });
    
    return () => {
      chart.destroy();
    };
  }, [overallMoodCounts]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };
    
  const mapMoodToEmoji = (mood) => {
    switch (mood) {
      case 'frown':
        return '😞';
      case 'slightfrown':
        return '🙁';
      case 'neutral':
        return '😐';
      case 'slightsmile':
        return '🙂';
      case 'smile':
        return '😊';
      default:
        return '';
    }
  };

  const handleChangeDisplayName = (newName) => {
    if (newName) { 
      setDisplayName(newName);
      const auth = getAuth();
      const db = getDatabase();
      const userId = auth.currentUser.uid;
      const userRef = ref(db, `${userId}/userData`);
      set(userRef, { displayName: newName });
    } else { // if the user decides not to change (i.e. if they cancel)
      setDisplayName(previousDisplayName); 
    }
  };

  const handleAvatarChange = (newAvatar) => {
    setSelectedAvatar(newAvatar);
    setShowAvatarModal(false);
    const auth = getAuth();
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const avatarRef = ref(db, `${userId}/userAvatar`);
    set(avatarRef, newAvatar);
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const diaryEntriesRef = ref(db, `users/${userId}/diaryEntries`);
      onValue(diaryEntriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.values(data);
          const tagCounts = calculateTagCounts(entries);
          const sortedTags = sortTagsByCount(tagCounts);
          const topThreeTags = sortedTags.slice(0, 3);
          setTopTags(topThreeTags);
        } else {
          setTopTags([]);
        }
      });
    }
  }, []);

  const calculateTagCounts = (entries) => {
    const tagCounts = {};
    if (Array.isArray(entries)) {
      entries.forEach((entry) => {
        if (entry.tags && Array.isArray(entry.tags)) {
          entry.tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });
    }
    return tagCounts;
  };
  
  const sortTagsByCount = (tagCounts) => {
    return Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]).map(tag => ({ tag, count: tagCounts[tag] }));
  };

  const getImageSource = (tag) => {
    switch (tag) {
    case 'Sunny':
        return 'sunny.png';
    case 'Cloudy':
        return 'cloudy.png';
    case 'Rainy':
        return 'rainy2.png';
    case 'Snowy':
        return 'snow.png';
    case 'Windy':
        return 'windy2.png';
    case 'School':
        return 'school.png';
    case 'Work':
        return 'work.png';
    case 'Vacation':
        return 'vacation.png';
    case 'Travel':
        return 'travel.png';
    case 'Family':
        return 'family.png';
    case 'Friends':
        return 'friends.png';
    case 'Party':
        return 'party.png';
    case 'Call':
        return 'call.png';
    case 'Dating':
        return 'dating.png';
    case 'Games':
        return 'games.png';
    case 'Shopping':
        return 'shopping.png';
    case 'Photography':
        return 'photography.png';
    case 'Listening to Music':
        return 'listenmusic.png';
    case 'Playing Instrument':
        return 'playinginstrument.png';
    case 'Gardening':
        return 'gardening.png';
    case 'Baking':
        return 'baking.png';
    case 'Cooking':
        return 'cooking.png';
    case 'Arts & Crafts':
        return 'art & crafts.png';
    case 'Movies & TV':
        return 'moviestv.png';
    case 'Fitness':
        return 'health&fitness.png';
    case 'Sports':
        return 'sports.png';
    case 'Reading':
        return 'reading.png';
    case 'Writing':
        return 'writing.png';
    case 'Makeup':
        return 'makeup.png';
    default:
        return ''; 
    }
};

  return (
    <div className="profile-body">
      <div className="flex-container-profile">
        <div className="profile-card">
          <img
            className="profile-pic"
            src={selectedAvatar || 'profilepic.png'} 
            alt="profile pic"
            onClick={() => setShowAvatarModal(true)} 
          />
          <NavLink to="/help"><img className="help-icon" src="help.png"/></NavLink>
          <p className="profile-name">{displayName}</p>
          {userEmail && <p className="profile-email">{userEmail}</p>}
          <button className="change-pass" onClick={() => handleChangeDisplayName(prompt('Enter new display name'))}>
            Change Name
          </button>
          <AvatarSelection 
            show={showAvatarModal} 
            handleClose={() => setShowAvatarModal(false)} 
            onSelectAvatar={handleAvatarChange} 
          />
          <div className="mood-card">
            <p className="mood-summary">Weekly Mood Summary</p>
            <ul className="mood-summary-list">
              {moodEntries.slice(-7).map((entry, index) => (
                <li key={index}>
                  <span className="mood-emoji">{mapMoodToEmoji(entry.mood)}</span>
                  <span className="mood-date">{formatDate(entry.timestamp)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bar-card">
          <div className="bar-chart">
            <p className="chart-text">All-time Mood Summary</p>
            <canvas id="moodChart" height="200"></canvas>
          </div></div>

          <div className="tagz-card">
            <h2 className="tagz-summary">Most Recorded Diary Tags</h2>
            <div className="top-tags-section">
              {topTags.map((tag, index) => (
                <div key={index} className="top-tag">
                  <img src={getImageSource(tag.tag)} alt={tag.tag} className="diarytag-img" />
                  <span>{tag.tag}</span>
                  <span style={{ marginLeft: '4px' }}>(x{tag.count})</span>
                </div>
              ))}
            </div>
          </div>
          
          <NavLink to="/diaryentries" style={{ textDecoration: 'none'}}><div className="diary-ent-card">
            <p className="diary-ent-text">View All Diary Entries</p>
          </div></NavLink>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Profile;
