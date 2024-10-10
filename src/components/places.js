import React from 'react';
import StoreNavigator from './storeNavigator'; 
import PlaceBox from './placeBox';

function Places() {
    const items = [
        { imgSrc: "bg4.png", itemName: "Backyard Barbecue", price: 100 },
        { imgSrc: "bg2.png", itemName: "Rainbow Meadow", price: 150 },
    ];

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-5 justify-content-center">
                    {items.map(item => (
                        <PlaceBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Places;