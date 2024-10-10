import React from 'react';
import StoreNavigator from './storeNavigator'; 
import ItemBox from './itemBox'; 

function StorePage() {
    const items = [
        { imgSrc: "basictee.png", itemimage: "basictee", itemName: "Basic Tee", price: 25, isNecessity: false },
        // inspo attribution: adobe stock, vector created in figma
        { imgSrc: "orangepolo.png", itemName: "Orange Polo", price: 35, isNecessity: false },
        { imgSrc: "onsie.png", itemName: "The Onesie", price: 55, isNecessity: false },
        // attribution: from https://pforpet.com/winter-dog-clothes/
        { imgSrc: "lavenderwrap.png", itemName: "Lavender Wrap", price: 60, isNecessity: false },
        { imgSrc: "baggysweater.png", itemName: "Baggy Sweater", price: 50, isNecessity: false },
        { imgSrc: "redpuffer.png", itemName: "Red Puffer", price: 70, isNecessity: false},
        { imgSrc: "softtee.png", itemName: "Soft Tee", price: 40, isNecessity: false },
        // inspo attribution: vectorstock, vector created in figma
        { imgSrc: "loungetee.png", itemName: "Lounge Tee", price: 30, isNecessity: false },
    ];

    const firstHalf = items.slice(0, Math.ceil(items.length / 2));
    const secondHalf = items.slice(Math.ceil(items.length / 2));

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-4 justify-content-center">
                    {firstHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} isNecessity={item.isNecessity} />
                    ))}
                </div>
                <div className="row mt-4 justify-content-center">
                    {secondHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} isNecessity={item.isNecessity} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StorePage;

