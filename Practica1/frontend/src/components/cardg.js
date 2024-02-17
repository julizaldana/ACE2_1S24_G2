import React from 'react';
import '../css/cardG.css';

const CardG = ({children}) => {
    return (
        <div class="card2 shadow">
            <div class="card2__content">
                {children}
            </div>
        </div>
    );
};

export default CardG;
