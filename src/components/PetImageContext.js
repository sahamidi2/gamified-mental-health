import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';

const PetImageContext = createContext();

export const usePetImage = () => useContext(PetImageContext);

export const PetImageProvider = ({ children }) => {
    const [currentPetImage, setCurrentPetImage] = useState('dog1.png');
    const [necessityImage, setNecessityImage] = useState('');

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}/currentPet`);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        setCurrentPetImage(snapshot.val());
                    } else {
                        setCurrentPetImage('dog1.png')
                    }
                });
                const necessityRef = ref(db, `users/${user.uid}/necessity`);
                get(necessityRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        setNecessityImage(snapshot.val());
                    } else {
                        setNecessityImage('');
                    }
                });
            } else {
                setCurrentPetImage('dog1.png')
                setNecessityImage('');

            }
        });
    }, []);

    const updatePetImage = (image) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}/currentPet`);
            set(userRef, image);
            setCurrentPetImage(image);
        }
    };

    const updateNecessityImage = (image) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}/necessity`);
            set(userRef, image);
            setNecessityImage(image);
        }
    };

    return (
        <PetImageContext.Provider value={{ currentPetImage, updatePetImage, necessityImage, updateNecessityImage }}>
            {children}
        </PetImageContext.Provider>
    );
};
