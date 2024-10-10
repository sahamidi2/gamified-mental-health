import React from 'react';
import StoreNavigator from './storeNavigator'; 
import Footer from './hpfooter';
import PetBox from './petBox';

function Pets() {
    const items = [
        { imgSrc: "dog1.png", price: 150, itemName: "hiro2" },
        // inspo attribution: inspo from freepik, created vector in figma myself
        { imgSrc: "dog2.png", price: 150, itemName: "cashmere" },
        // inspo attribution: inspo from freepik, created vector in figma myself
        { imgSrc: "dog3.png", price: 150, itemName: "toto" },
        // inspo attribution: inspo from vectorStock, created vector in figma myself
        { imgSrc: "dog4.png", price: 150, itemName: "ayumi" },
        // inspo attribution: inspo from pngTree, created vector in figma myself
        { imgSrc: "dog5.png", price: 150, itemName: "simba" },
        // inspo attribution: inspo from redbubble https://www.redbubble.com/i/sticker/Cute-dog-Happy-dog-Adorable-dog-Smiling-dog-Fluffy-dog-Furry-dog-Cartoon-dog-Hand-drawn-dog-Brown-eyes-Dog-paws-Dog-tail-Dog-ears-by-StickerForDays/146379201.EJUG5, created vector in figma
        { imgSrc: "cat1.png", price: 150, itemName: "cat1" },
        // inspo attributon: inspo from pngTree, created vector in figma myself
        { imgSrc: "cat2.png", price: 150, itemName: "cat2" },
        // inspo attribution: inspo from freepik, created vector in figma myself
        { imgSrc: "cat3.png", price: 150, itemName: "cat3" },
        // inspo attribution: inspo from etsy https://www.etsy.com/listing/1514823720/adorable-chibi-cat-sticker-add-a-touch, created vector in figma
        { imgSrc: "cat4.png", price: 150, itemName: "cat4" },
        // inspo attribution: inspo from freepik, created vector in figma myself
        { imgSrc: "cat5.png", price: 150, itemName: "cat5" },
        // inspo attribution: inspo from freepik, created vector in figma myself
    ];

    const firstHalf = items.slice(0, Math.ceil(items.length / 2));
    const secondHalf = items.slice(Math.ceil(items.length / 2));

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-5 justify-content-center">
                    {firstHalf.map(item => (
                        <PetBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
                <div className="row mt-5 justify-content-center">
                    {secondHalf.map(item => (
                        <PetBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Pets;