import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, update, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

function PetBox({ imgSrc, itemName, price }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [coinCount, setCoinCount] = useState(0);
    const [petPurchased, setPetPurchased] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                fetchUserData(user.uid);
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    const fetchUserData = (userId) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);

        get(userRef).then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                setCoinCount(userData.coinCount || 0);
                setPetPurchased(userData.currentPet === imgSrc); // Ensure this checks for current pet
            }
        });
    };

    const handleClick = (price, imgSrc, itemName) => () => {
        if (!currentUser) return;
        if (petPurchased) {
            navigate('/viewpet');
            return;
        }
        const db = getDatabase();
        const userId = currentUser.uid;
        const userRef = ref(db, `users/${userId}`);
        const newCoinCount = coinCount - price;
        if (newCoinCount < 0) {
            alert("You need more coins to purchase this pet!");
            return;
        }
        update(userRef, {
            coinCount: newCoinCount,
            currentPet: imgSrc,
            currentPetName: itemName
        })
        .then(() => {
            setCoinCount(newCoinCount);
            setPetPurchased(true);
        })
        .catch((error) => {
            console.error("Error updating user data: ", error);
        });
    };

    return (
        <div className="col-md-2">
            <div className="item-box d-flex flex-column align-items-center">
                <img src={imgSrc} alt={itemName} className="pet-images" />
                <div className="store-price-buy">
                    <div className="store-price">
                        <img src="coin.png" alt="Coin" />
                        <span>{price}</span>
                    </div>
                    <button className="buy-button" onClick={handleClick(price, imgSrc, itemName)}>
                        {petPurchased ? "View Pet" : "Buy"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PetBox;

