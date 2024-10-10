import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, update, get } from 'firebase/database';
import { useNavigate, NavLink } from 'react-router-dom'; 

function ItemBox({ imgSrc, itemName, price, isNecessity}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [coinCount, setCoinCount] = useState(0);
    const [isPurchased, setIsPurchased] = useState(false); 
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
                setIsPurchased(userData.purchasedItems && userData.purchasedItems.hasOwnProperty(itemName));
            }
        });
    };

    const handleClick = (itemPrice, itemName, imgSrc) => () => {
        if (currentUser) {
          if (isPurchased) {
            navigate('/mycloset'); // Navigate to the closet if already purchased
            return;
          }
          const db = getDatabase();
          const userId = currentUser.uid;
          const userRef = ref(db, `users/${userId}`);
          get(userRef).then((snapshot) => {
            const userData = snapshot.val();
            if (userData) {
              const currentCoins = userData.coinCount || 0;
              const newCoinCount = currentCoins - itemPrice;
      
              if (newCoinCount < 0) {
                alert("You need more coins to purchase this item!");
              } else {
                const updates = {};
                updates['coinCount'] = newCoinCount; 
                updates[`purchasedItems/${itemName}`] = { imgSrc, itemName, isNecessity };
                console.log(updates);
      
                update(userRef, updates).then(() => {
                  setCoinCount(newCoinCount); 
                  setIsPurchased(true); 
                  alert("Purchase successful! You can view the item in your closet.");
                }).catch((error) => {
                  console.error("Error updating user data: ", error);
                });
              }
            }
          });
        }
      };
      
    return (
        <div className="col-md-2">
            <div className="item-box d-flex flex-column align-items-center">
                <img src={imgSrc} alt={itemName} className="item-images" />
                <p className="item-text">{itemName}</p>
                <div className="store-price-buy">
                    <div className="store-price">
                        <img src="coin.png" alt="Coin" />
                        <span>{price}</span>
                    </div>
                    <button className="buy-button" onClick={handleClick(price, itemName, imgSrc)}>
                      {isPurchased ? <span className="view-in-closet-text">View in closet</span> : <span className="buy-text">Buy</span>}
                    </button>
                    {/* <button className="buy-button" onClick={handleClick(price, itemName, imgSrc)}>{isPurchased ? 'View in closet' : 'Buy'}</button> */}
                </div>
            </div>
        </div>
    );
}

export default ItemBox;
