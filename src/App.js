import React, { useState } from 'react';
import { HappyPawsNav } from './components/hpnav';
import Necessities from './components/necessities';
import StorePage from './components/clothing';
import Footer from './components/hpfooter';
import Home from './components/home';
import ProfilePage from './components/profile';
import { Routes, Route } from 'react-router-dom';
import Pets from './components/pets';
import Places from './components/places';
import LoginPage from './components/login';
import './App.css';
import CreateAccount from './components/createaccount';
import CheckIn from './components/checkin';
import CheckModal from './components/CheckModal';
import DiaryModal from './components/DiaryModal';
import Help from './components/help';
import ViewPet from './components/ViewPet';
import Diary from './components/Diary';
import DiaryPage from './components/DiaryPage';
import MyCloset from './components/myCloset';
import MyPlaces from './components/myPlaces';
import { PetImageProvider } from './components/PetImageContext';

function App() {
  const selectedAvatar = 'profileimage.png';
  const [streakCount, setStreakCount] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('basicbg.png');
  const [currentPetImage, setCurrentPetImage] = useState('dog1.png');

  const updateStreak = (newStreakCount) => {
    setStreakCount(newStreakCount);
  };

  const updateBackgroundImage = (newBackgroundImage) => {
    setBackgroundImage(newBackgroundImage);
  };

  const updatePetImage = (newImage) => {
    setCurrentPetImage(newImage);
  };

  return (
      <PetImageProvider>
        <div>
        <HappyPawsNav selectedAvatar={selectedAvatar} updateStreak={updateStreak} streakCount={streakCount} backgroundImage={backgroundImage}/>
        <Routes>
          <Route path="/" index element={<LoginPage />} />
          <Route path="/home" element={<Home updateBackgroundImage={updateBackgroundImage} />} />
          <Route path="/viewpet" element={<ViewPet />} />
          <Route path="/clothing" element={<StorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/necessities" element={<Necessities />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/places" element={<Places />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/checkin" element={<CheckIn updateStreak={updateStreak} backgroundImage={backgroundImage} />} />
          <Route path="/modal" element={<CheckModal backgroundImage={backgroundImage} />} />
          <Route path="/help" element={<Help />} />
          <Route path="/diary" element={<Diary backgroundImage={backgroundImage} />} />
          <Route path="/diarymodal" element={<DiaryModal backgroundImage={backgroundImage} />} />
          <Route path="/diaryentries" element={<DiaryPage />} />
          <Route path="/mycloset" element={<MyCloset updatePetImage={updatePetImage} />} />
          <Route path="/myplaces" element={<MyPlaces />} />
        </Routes>
        <Footer />
        </div>
      </PetImageProvider>
  );
}

export default App;
