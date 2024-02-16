import React from 'react';
import '../css/card.css';

const Card = ({title, children}) => {
    return (
        <div>
            <div class="card">
                <div class="tools">
                    <div class="circle">
                        <span class="red box"></span>
                    </div>
                    <div class="circle">
                        <span class="yellow box"></span>
                    </div>
                    <div class="circle">
                        <span class="green box"></span>
                    </div>
                    <div class="titulo">
                        {title}
                    </div>
                </div>
                <div class="card__content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Card;
