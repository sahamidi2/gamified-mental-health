import React, { useState, useEffect } from 'react';import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, update, get } from 'firebase/database';

function PlaceBox({ imgSrc, itemName, price }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [coinCount, setCoinCount] = useState(0);

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
            }
        });
    };
      

const handleClick = (itemPrice, itemName, imgSrc) => () => {
    if (currentUser) {
        const db = getDatabase();
        const userId = currentUser.uid;
        const newCoinCount = coinCount - itemPrice;
        if(newCoinCount < 0){
            alert("You need more coins to purchase this item!");
        } else {
            const userRef = ref(db, `users/${userId}`);
            const itemRef = ref(db, `users/${userId}/purchasedItems/${itemName}`); // Specific path to the item
            update(userRef, { coinCount: newCoinCount })
            .then(() => {
                update(itemRef, { imgSrc, itemName })
                .then(() => {
                    setCoinCount(newCoinCount);
                })
                .catch((error) => {
                    console.error("Error adding item to closet: ", error);
                });
            })
            .catch((error) => {
                console.error("Error updating coin count: ", error);
            });
        }
        }
    }

    return (
        <div className="col-md-6">
            <div className="item-box d-flex flex-column align-items-center">
                <img src={imgSrc} alt={itemName} className="place-image" />
                <p className="item-text">{itemName}</p>
                <div className="store-price-buy">
                    <div className="store-price">
                        <img src="coin.png" alt="Coin" />
                        <span>{price}</span>
                    </div>
                    <button className="buy-button" onClick={handleClick(price, itemName, imgSrc)}>Buy</button>                
                </div>
            </div>
        </div>
    );
}

export default PlaceBox;