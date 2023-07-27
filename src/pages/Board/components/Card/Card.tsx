import React, { useState } from 'react';
import './css/card.css';
interface card {
  title: string;
  listState: any;
  setListState: any;
  card: any;
}
const Card = function ({ title, listState, setListState, card }: card) {
  const [currentCard, setCurrentCard] = useState('');
  const [currentList, setCurrentList] = useState('');
  const [cardState, setCardState] = useState(card);
  const [futureCardPosition, setFutureCardPosition] = useState<string>('');
  const dragStartHandler = function (event: any, card: any, list: any) {
    setCurrentCard(card);
    setCurrentList(list);
    console.log(card.position + 'position');
  };

  const dragOverHandler = function (event: any, card: any, list: any) {
    event.preventDefault();
    if (event.target.className === 'card') {
      const rect = event.currentTarget.getBoundingClientRect();
      const yPosition = event.clientY - rect.top;
      const cardHeight = rect.height;
      // Calculate the relative position of the cursor inside the card

      // if (yPosition < cardHeight / 2) {
      //   // Cursor is in the top half of the card
      //   setFutureCardPosition('top');
      // } else {
      //   // Cursor is in the bottom half of the card
      //   setFutureCardPosition('bottom');
      // }
      if (yPosition < cardHeight / 2) {
        setFutureCardPosition('bottom');
      } else if (yPosition > cardHeight / 2) {
        setFutureCardPosition('top');
      }
    }
  };
  const dragLeaveHandler = function (event: any) {
    setFutureCardPosition('');
  };
  const dragEndHandler = function (event: any) {
    event.target.style.boxShadow = 'none';
  };
  const dragDropHandler = function (event: any, card: any, list: any) {
    event.preventDefault();
  };
  return (
    <div>
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
    </div>
  );
};
export default Card;
