import React from 'react';
import StoreNavigator from './storeNavigator'; 
import ItemBox from './itemBox'; 
import Footer from './hpfooter';

function Necessities() {
    const items = [
        { imgSrc: "basicbowlT.png", itemName: "Basic Bowl", price: 30, isNecessity: true },
        { imgSrc: "catbowlT.png", itemName: "Cat Bowl", price: 40, isNecessity: true },
        { imgSrc: "dogbowlT.png", itemName: "Dog Bowl", price: 40, isNecessity: true },
        { imgSrc: "polkadotT.png", itemName: "Polka Toy", price: 50, isNecessity: true },
        { imgSrc: "dogballT.png", itemName: "Dog Ball", price: 45, isNecessity: true },
        // inspo attribution: freepik, vector created in figma
        { imgSrc: "cattoyT.png", itemName: "Cat Toy", price: 60, isNecessity: true },
        // inspo attribution: shutterstock, vector created in figma
        { imgSrc: "basicmouseT.png", itemName: "Basic Mouse", price: 35, isNecessity: true },
        { imgSrc: "ultimatemousetoyT.png", itemName: "Ultimate Mouse", price: 50, isNecessity: true },
    ];

    const firstHalf = items.slice(0, Math.ceil(items.length / 2));
    const secondHalf = items.slice(Math.ceil(items.length / 2));

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-4 justify-content-center">
                    {firstHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} isNecessity={item.isNecessity}/>
                    ))}
                </div>
                <div className="row mt-4 justify-content-center">
                    {secondHalf.map(item => (
                        <ItemBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} isNecessity={item.isNecessity}/>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Necessities;
