import React from 'react';
import '../css/card.css';

const Card = ({title, width, height, children}) => {
    const cardStyle = {
        width: width || '300px', // Si no se proporciona el ancho, se utiliza 300px por defecto
        height: height || '200px', // Si no se proporciona la altura, se utiliza 200px por defecto
    };

    return (
        <div style={cardStyle} className="card">
            <div className="tools">
                <div className="circle">
                    <span className="red box"></span>
                </div>
                <div className="circle">
                    <span className="yellow box"></span>
                </div>
                <div className="circle">
                    <span className="green box"></span>
                </div>
                <div className="titulo">
                    {title}
                </div>
            </div>
            <div className="card__content">
                {children}
            </div>
        </div>
    );
};

export default Card;
