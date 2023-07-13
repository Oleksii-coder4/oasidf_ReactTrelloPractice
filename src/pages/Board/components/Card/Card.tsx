import React from 'react';
import './css/card.css';
const Card = function ({ title }: { title: string }) {
  return (
    <div className="card">
      <p className="card__text">{title}</p>
    </div>
  );
};
export default Card;
