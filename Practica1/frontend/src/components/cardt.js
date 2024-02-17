import React from 'react';
import '../css/cardT.css';

const CardT = ({children}) => {
    return (
        <div class="card1 shadow">
            <div class="card__content">
                {children}
            </div>
        </div>
    );
};

export default CardT;
