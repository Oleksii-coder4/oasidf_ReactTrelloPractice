import React, { useState } from 'react';
import './css/card.css';
const Card = function ({ title, list, card }: { title: string; list: any; card: any }) {
  const [currentCard, setCurrentCard] = useState('');
  const [currentList, setCurrentList] = useState('');
  const [listState, setListState] = useState(list);
  const [cardState, setCardState] = useState(card);
  const dragStartHandler = function (event: any, card: any, list: any) {
    setCurrentCard(card);
    setCurrentList(list);
  };

  const dragOverHandler = function (event: any, card: any, list: any) {
    event.preventDefault();
    if (event.target.className === 'card') {
      console.log(card.position + 'pos');
      console.log(listState);
    }
  };
  const dragLeaveHandler = function (event: any) {
    event.target.style.boxShadow = 'none';
  };
  const dragEndHandler = function (event: any) {
    event.target.style.boxShadow = 'none';
  };
  const dragDropHandler = function (event: any, card: any, list: any) {
    event.preventDefault();
  };
  return (
    <div
      className="card"
      draggable={true}
      onDragOver={(event) => dragOverHandler(event, cardState, listState)} //card list
      onDragLeave={(event) => dragLeaveHandler(event)}
      onDragStart={(event) => dragStartHandler(event, cardState, listState)}
      onDragEnd={(event) => dragEndHandler(event)}
      onDrop={(event) => dragDropHandler(event, cardState, listState)}
    >
      <p className="card__text">{title}</p>
    </div>
  );
};
export default Card;
