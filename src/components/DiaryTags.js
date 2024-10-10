import React, { useState, useRef } from 'react';
import DiaryBox from './DiaryBox'; 
import { Input } from 'rsuite';
import { push, ref, getDatabase, get, update, serverTimestamp } from 'firebase/database'; 
import { getAuth } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';

function DiaryTags() {
    const [selectedTags, setSelectedTags] = useState([]);
    const textareaRef = useRef(null); 
    const navigate = useNavigate();

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prevTags => prevTags.filter(item => item !== tag));
        } else {
            setSelectedTags(prevTags => [...prevTags, tag]);
        }
    };
    
    const handleFormSubmit = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const db = getDatabase();
            const diaryEntriesRef = ref(db, 'users/' + userId + '/diaryEntries');
            const entryData = {
                timestamp: new Date().toISOString(), 
                tags: selectedTags,
                description: textareaRef.current.value 
            };
    
            push(diaryEntriesRef, entryData).then(() => {
                console.log('Diary entry added successfully.');
                updateProgressBy(50, userId);  
                updateCoinCount(userId, 5);    
                navigate('/diarymodal');
            }).catch(error => {
                console.error('Failed to add diary entry:', error);
            });
        } else {
            console.error('No authenticated user found.');
        }
    };
      
    const updateProgressBy = (increment, userId) => {
        const db = getDatabase();
        const today = new Date().toLocaleDateString();
        const progressRef = ref(db, `users/${userId}/petData`);
    
        get(progressRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let currentProgress = data.progress || 25;  // Ensure there's a fallback value
                let newProgress = currentProgress + increment;
    
                if (newProgress > 100) newProgress = 100; // Ensure it does not exceed 100%
                console.log(`Current progress: ${currentProgress}, Increment: ${increment}, New progress: ${newProgress}`);
                update(ref(db, `users/${userId}/petData`), {
                    progress: newProgress,
                    lastProgressUpdate: today
                }).then(() => {
                    console.log('Progress updated successfully to:', newProgress);
                }).catch(error => {
                    console.error('Failed to update progress in database:', error);
                });
            } else {
                console.log('No existing petData, initializing...');
                let initialProgress = Math.min(25 + increment, 100);
                update(ref(db, `users/${userId}/petData`), {
                    progress: initialProgress,
                    lastProgressUpdate: today
                }).then(() => {
                    console.log('Pet data initialized and progress updated to:', initialProgress);
                }).catch(error => {
                    console.error('Failed to initialize pet data:', error);
                });
            }
        }).catch(error => {
            console.error("Failed to retrieve pet data:", error);
        });
    };
    
    const updateCoinCount = (userId, coinsToAdd) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
        get(userRef).then(snapshot => {
            const userData = snapshot.val();
            if (userData) {
                const currentCoins = userData.coinCount || 0;
                const newCoinCount = currentCoins + coinsToAdd;
                update(ref(db, `users/${userId}`), { coinCount: newCoinCount }).then(() => {
                    console.log(`Updated coin count to ${newCoinCount}`);
                }).catch(error => {
                    console.error('Failed to update coin count:', error);
                });
            } else {
                console.log('No user data available, initializing coin count.');
                update(ref(db, `users/${userId}`), { coinCount: coinsToAdd }).then(() => {
                    console.log(`Initialized coin count to ${coinsToAdd}`);
                }).catch(error => {
                    console.error('Failed to initialize coin count:', error);
                });
            }
        }).catch(error => {
            console.error('Failed to fetch user data:', error);
        });
    };
    
    const items1 = [
        { imgSrc: "sunny.png", tag: "Sunny" },
        { imgSrc: "cloudy.png", tag: "Cloudy" },
        { imgSrc: "rainy2.png", tag: "Rainy" },
        { imgSrc: "snow.png", tag: "Snowy" },
        { imgSrc: "windy2.png", tag: "Windy" },
    ];

    const items2 = [
        { imgSrc: "school.png", tag: "School" },
        { imgSrc: "work.png", tag: "Work" },
        { imgSrc: "vacation.png", tag: "Vacation" },
        { imgSrc: "travel.png", tag: "Travel" },
    ];

    const items3 = [
        { imgSrc: "family.png", tag: "Family" },
        { imgSrc: "friends.png", tag: "Friends" },
        { imgSrc: "party.png", tag: "Party" },
        { imgSrc: "call.png", tag: "Call" },
        { imgSrc: "dating.png", tag: "Dating" },
    ];

    const items4 = [
        { imgSrc: "games.png", tag: "Games" },
        { imgSrc: "shopping.png", tag: "Shopping" },
        { imgSrc: "photography.png", tag: "Photography" },
        { imgSrc: "listenmusic.png", tag: "Listening to Music" },
        { imgSrc: "playinginstrument.png", tag: "Playing Instrument" },
        { imgSrc: "gardening.png", tag: "Gardening" },
        { imgSrc: "baking.png", tag: "Baking" },
        { imgSrc: "cooking.png", tag: "Cooking" },
        { imgSrc: "art & crafts.png", tag: "Arts & Crafts" },
        { imgSrc: "moviestv.png", tag: "Movies & TV" },
        { imgSrc: "health&fitness.png", tag: "Fitness" },
        { imgSrc: "sports.png", tag: "Sports" },
        { imgSrc: "reading.png", tag: "Reading" },
        { imgSrc: "writing.png", tag: "Writing" },
        { imgSrc: "makeup.png", tag: "Makeup" },
    ];

    const rows1 = chunkArray(items1, 5);
    const rows2 = chunkArray(items2, 5);
    const rows3 = chunkArray(items3, 5);
    const rows4 = chunkArray(items4, 5);

    return (
        <div className="tags-cont">
            <p className="diary-text">Weather</p>
            <div className="row mt-5 justify-content-center">
                {renderRows(rows1)}
            </div>
            <p className="diary-text">Events</p>
            <div className="row mt-5 justify-content-center">
                {renderRows(rows2)}
            </div>
            <p className="diary-text">Social</p>
            <div className="row mt-5 justify-content-center">
                {renderRows(rows3)}
            </div>
            <p className="diary-text">Hobbies</p>
            <div className="row mt-5 justify-content-center">
                {renderRows(rows4)}
            </div>
            <p className="diary-p2">Add an optional description :)</p>
            <Input as="textarea" rows={4} placeholder="Type diary entry here" className="diary-form"
                inputRef={textareaRef} />
            <button className="diary-btn" onClick={handleFormSubmit}>Submit</button>
        </div>
    );

    function chunkArray(array, size) {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    }

    function renderRows(rows) {
        return rows.map((row, index) => (
            <div key={index} className="row">
                {row.map((item, idx) => (
                    <div key={idx} className="col-md-2" onClick={() => handleTagClick(item.tag)}>
                        <DiaryBox imgSrc={item.imgSrc} tag={item.tag} />
                    </div>
                ))}
            </div>
        ));
    }
}

export default DiaryTags;


// // Diary Tag Images Attributions: (downloaded from Flaticon)
// <a href="https://www.flaticon.com/free-icons/baking" title="baking icons">Baking icons created by mynamepong - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/gamepad" title="gamepad icons">Gamepad icons created by Smashicons - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/briefcase" title="briefcase icons">Briefcase icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/textbook" title="textbook icons">Textbook icons created by Flat Icons - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/trip" title="trip icons">Trip icons created by Payungkead - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/beach" title="beach icons">Beach icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/windy" title="windy icons">Windy icons created by Vitaly Gorbachev - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/rain" title="rain icons">Rain icons created by kornkun - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/snowy" title="snowy icons">Snowy icons created by Superarticons - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/cloud" title="cloud icons">Cloud icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/dating-app" title="dating app icons">Dating app icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/phone" title="phone icons">Phone icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/friends" title="friends icons">Friends icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/congratulation" title="congratulation icons">Congratulation icons created by juicy_fish - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/friends" title="friends icons">Friends icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/family" title="family icons">Family icons created by iconixar - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/violin" title="violin icons">Violin icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/beauty" title="beauty icons">Beauty icons created by photo3idea_studio - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/cooking" title="cooking icons">Cooking icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/write" title="write icons">Write icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/tripod" title="tripod icons">Tripod icons created by DinosoftLabs - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/team-sport" title="team sport icons">Team sport icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/books" title="books icons">Books icons created by popo2021 - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/fitness" title="fitness icons">Fitness icons created by juicy_fish - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/tv-watching" title="tv watching icons">Tv watching icons created by iconixar - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/art" title="art icons">Art icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/gardening" title="gardening icons">Gardening icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/music" title="music icons">Music icons created by Freepik - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/food" title="food icons">Food icons created by Freepik - Flaticon</a>
