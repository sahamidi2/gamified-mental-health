import React, { useState } from 'react';

function DiaryBox({ imgSrc, tag }) {
    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        setSelected(!selected);
    };
    return (
        <div className="col-md-2" onClick={handleClick}>
            <div className="item-box text-center">
                <div className="item-content">
                    <img src={imgSrc} className={`diarytags ${selected ? 'tags-selected' : ''}`} alt={tag} />
                    <span className="tag-title">{tag}</span>
                </div>
            </div>
        </div>
    );
}

export default DiaryBox;


