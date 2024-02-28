import React from 'react';
import '../css/cardT.css';

const CardT = ({children}) => {
    return (
        <div className="card1 shadow">
            <div className="card__content">
                {children}
            </div>
        </div>
    );
};

export default CardT;
