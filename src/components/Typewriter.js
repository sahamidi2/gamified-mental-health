import { useTypewriter } from "react-simple-typewriter";
import React from 'react';

export function TypeWriter() {
    const [text] = useTypewriter({
        words: [" happy paws"],
        loop: 1,
        typeSpeed: 130,
    });

    return (
            <div className="signin-head">
                {text}
            </div>
    );
}


 