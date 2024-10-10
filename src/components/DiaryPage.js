import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { NavLink } from 'react-router-dom';

function DiaryPage() {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0); // my total entries count
  const [selectedDay, setSelectedDay] = useState(''); 
  const [selectedMonth, setSelectedMonth] = useState(''); 
  const [moodEntries, setMoodEntries] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const diaryEntriesRef = ref(db, `users/${userId}/diaryEntries`);
      const moodEntriesRef = ref(db, `${userId}/moodEntries`);

      onValue(moodEntriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMoodEntries(data);
        }
      });

      onValue(diaryEntriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.values(data);
          entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setDiaryEntries(entries);
          setTotalEntries(entries.length);
        } else {
          setDiaryEntries([]);
          setTotalEntries(0);
        }
      });
    }
  }, []);
  
  const mapMoodToEmoji = (mood) => {
    console.log('Mood Description:', mood);
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

  const getMoodForEntry = (entryTimestamp) => {
    const entryDate = formatDate(entryTimestamp); 
    const moodEntriesArray = Object.values(moodEntries);
    // find mood entry for current diary entry date
    const moodEntry = moodEntriesArray.find(entry => {
      const moodDate = formatDate(entry.timestamp); 
      return moodDate === entryDate;
    });
    return moodEntry ? mapMoodToEmoji(moodEntry.mood) : '';
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
    setSelectedMonth(''); 
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    const currentYear = new Date().getFullYear();
    setSelectedMonth(`${currentYear}-${selectedMonth}`);
  };

  const clearFilters = () => {
    setSelectedDay('');
  };

  const clearFilter = () => {
    setSelectedMonth('');
  };

  const filteredEntries = selectedDay
  ? diaryEntries.filter(entry => formatDate(entry.timestamp) === selectedDay)
  : selectedMonth
  ? diaryEntries.filter(entry => entry.timestamp.substring(0, 7) === selectedMonth)
  : diaryEntries;

    return (
        <div className="profile-body">
          <div className="flex-container-profile">
            <div className="diary-entries-card">
              <NavLink className="back-link" to="/profile"><p className="back-help2">← Back</p></NavLink>
              <h2 className="diarypage-text">Diary Entries</h2>
              <div>
              <p className="total-entries-p">Total Entries Made: {totalEntries}</p>
                <label htmlFor="dateFilter" className='filterby'>Filter by Day:</label>
                <input
                  className="filterer"
                  type="date"
                  id="dateFilter"
                  name="dateFilter"
                  value={selectedDay}
                  onChange={handleDayChange}
                />
                <button className="clear-btn" onClick={clearFilters}>Clear</button>
                <label htmlFor="monthFilter" className='filterbymonth'>Filter by Month:</label>
                <select
                className="month-filter"
                id="monthFilter"
                name="monthFilter"
                value={selectedMonth}
                onChange={handleMonthChange}
                >
                <option value="">All Months</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
                </select>
                <button className="clear-btn" onClick={clearFilter}>Clear</button>
                {filteredEntries.map((entry, index) => (
                  <div key={index} className="each-entry">
                    <p className="diaryentrydate">Date of Entry: {formatDate(entry.timestamp)}</p>
                    <p className="mood-recorded">Mood Recorded in Check in: {getMoodForEntry(entry.timestamp)}</p>
                    <p className="tagtitle">Tags:</p>
                    <div className="each-tags">
                      {entry.tags.map((tag, idx) => (
                        <div key={idx}>
                          <img src={getImageSource(tag)} alt={tag} className="diarytag-img"/>
                          <span className="tagspan">{tag}</span>
                        </div>
                      ))}
                    </div>
                    {entry.description && (
                      <div>
                        <p className="tagtitle-two">Description:</p>
                        <p className="entrytext">{entry.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ); 
}

export default DiaryPage;


// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { getAuth } from 'firebase/auth';
// import { NavLink } from 'react-router-dom';

// function DiaryPage() {
//   const [diaryEntries, setDiaryEntries] = useState([]);
//   const [totalEntries, setTotalEntries] = useState(0); // my total entries count
//   const [selectedDay, setSelectedDay] = useState(''); 
//   const [selectedMonth, setSelectedMonth] = useState(''); 

//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();

//     if (auth.currentUser) {
//       const userId = auth.currentUser.uid;
//       const diaryEntriesRef = ref(db, `users/${userId}/diaryEntries`);

//       onValue(diaryEntriesRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           const entries = Object.values(data);
//           entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
//           setDiaryEntries(entries);
//           setTotalEntries(entries.length);
//         } else {
//           setDiaryEntries([]);
//           setTotalEntries(0);
//         }
//       });
//     }
//   }, []);

//   const getImageSource = (tag) => {
//     switch (tag) {
//     case 'Sunny':
//         return 'sunny.png';
//     case 'Cloudy':
//         return 'cloudy.png';
//     case 'Rainy':
//         return 'rainy2.png';
//     case 'Snowy':
//         return 'snow.png';
//     case 'Windy':
//         return 'windy2.png';
//     case 'School':
//         return 'school.png';
//     case 'Work':
//         return 'work.png';
//     case 'Vacation':
//         return 'vacation.png';
//     case 'Travel':
//         return 'travel.png';
//     case 'Family':
//         return 'family.png';
//     case 'Friends':
//         return 'friends.png';
//     case 'Party':
//         return 'party.png';
//     case 'Call':
//         return 'call.png';
//     case 'Dating':
//         return 'dating.png';
//     case 'Games':
//         return 'games.png';
//     case 'Shopping':
//         return 'shopping.png';
//     case 'Photography':
//         return 'photography.png';
//     case 'Listening to Music':
//         return 'listenmusic.png';
//     case 'Playing Instrument':
//         return 'playinginstrument.png';
//     case 'Gardening':
//         return 'gardening.png';
//     case 'Baking':
//         return 'baking.png';
//     case 'Cooking':
//         return 'cooking.png';
//     case 'Arts & Crafts':
//         return 'art & crafts.png';
//     case 'Movies & TV':
//         return 'moviestv.png';
//     case 'Fitness':
//         return 'health&fitness.png';
//     case 'Sports':
//         return 'sports.png';
//     case 'Reading':
//         return 'reading.png';
//     case 'Writing':
//         return 'writing.png';
//     case 'Makeup':
//         return 'makeup.png';
//     default:
//         return ''; 
//     }
//     };

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
//     return formattedDate;
//   };

//   const handleDayChange = (event) => {
//     setSelectedDay(event.target.value);
//     setSelectedMonth(''); 
//   };

//   const handleMonthChange = (event) => {
//     const selectedMonth = event.target.value;
//     const currentYear = new Date().getFullYear();
//     setSelectedMonth(`${currentYear}-${selectedMonth}`);
//   };

//   const clearFilters = () => {
//     setSelectedDay('');
//   };

//   const clearFilter = () => {
//     setSelectedMonth('');
//   };

//   const filteredEntries = selectedDay
//   ? diaryEntries.filter(entry => formatDate(entry.timestamp) === selectedDay)
//   : selectedMonth
//   ? diaryEntries.filter(entry => entry.timestamp.substring(0, 7) === selectedMonth)
//   : diaryEntries;

//     return (
//         <div className="profile-body">
//           <div className="flex-container-profile">
//             <div className="diary-entries-card">
//               <NavLink className="back-link" to="/profile"><p className="back-help2">← Back</p></NavLink>
//               <h2 className="diarypage-text">Diary Entries</h2>
//               <div>
//               <p className="total-entries-p">Total Entries Made: {totalEntries}</p>
//                 <label htmlFor="dateFilter" className='filterby'>Filter by Day:</label>
//                 <input
//                   className="filterer"
//                   type="date"
//                   id="dateFilter"
//                   name="dateFilter"
//                   value={selectedDay}
//                   onChange={handleDayChange}
//                 />
//                 <button className="clear-btn" onClick={clearFilters}>Clear</button>
//                 <label htmlFor="monthFilter" className='filterbymonth'>Filter by Month:</label>
//                 <select
//                 className="month-filter"
//                 id="monthFilter"
//                 name="monthFilter"
//                 value={selectedMonth}
//                 onChange={handleMonthChange}
//                 >
//                 <option value="">All Months</option>
//                 <option value="01">January</option>
//                 <option value="02">February</option>
//                 <option value="03">March</option>
//                 <option value="04">April</option>
//                 <option value="05">May</option>
//                 <option value="06">June</option>
//                 <option value="07">July</option>
//                 <option value="08">August</option>
//                 <option value="09">September</option>
//                 <option value="10">October</option>
//                 <option value="11">November</option>
//                 <option value="12">December</option>
//                 </select>
//                 <button className="clear-btn" onClick={clearFilter}>Clear</button>
//                 {filteredEntries.map((entry, index) => (
//                   <div key={index} className="each-entry">
//                     <p className="diaryentrydate">Date of Entry: {formatDate(entry.timestamp)}</p>
//                     <p className="tagtitle">Tags:</p>
//                     <div className="each-tags">
//                       {entry.tags.map((tag, idx) => (
//                         <div key={idx}>
//                           <img src={getImageSource(tag)} alt={tag} className="diarytag-img"/>
//                           <span className="tagspan">{tag}</span>
//                         </div>
//                       ))}
//                     </div>
//                     {entry.description && (
//                       <div>
//                         <p className="tagtitle-two">Description:</p>
//                         <p className="entrytext">{entry.description}</p>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       ); 
// }

// export default DiaryPage;



