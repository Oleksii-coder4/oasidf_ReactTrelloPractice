import React, { useEffect, useState } from 'react';
import './css/card.css';
interface card {
  title: string;
  listState: any;
  setListState: any;
  card: any;
  cardsState: any;
  setCardsState: any;
}
const Card = function ({ title, listState, setListState, card, cardsState, setCardsState }: card) {
  const [currentCard, setCurrentCard] = useState<any>('');
  const [currentList, setCurrentList] = useState('');
  const [cardState, setCardState] = useState(card);
  function mouseDownHandler(event: any) {
    setCurrentCard(event.target);
    const xPosition = event.clientX - event.target.getBoundingClientRect().left;
    const yPosition = event.clientY - event.target.getBoundingClientRect().top;
  }
  const dragStartHandler = function (event: any, card: any, list: any) {
    // // Create a custom drag image element (div)
    // const dragImage = document.createElement('div');
    // dragImage.textContent = 'Custom Drag Image'; // You can set any content you like
    // dragImage.style.width = '100px';
    // dragImage.style.height = '100px';
    // dragImage.style.backgroundColor = 'lightblue';
    // dragImage.style.cursor = 'grabbing'; // Set the cursor style while dragging
    // // Set the custom drag image using the setDragImage method
    // event.dataTransfer.setDragImage(dragImage, 0, 0);
    setCurrentCard(card);
    console.log(card.position);
    setCurrentList(list);
    return false;
  };
  const dragOverHandler = function (event: any, card: any, list: any) {
    event.preventDefault();
    if (event.target.className === 'card' && currentCard) {
      const rect = event.currentTarget.getBoundingClientRect();
      const yPosition = event.clientY - rect.top;
      console.log(yPosition);
      const cardHeight = rect.height;
      if (yPosition < cardHeight / 2) {
        // bottom
      } else if (yPosition > cardHeight / 2) {
        // top
      }
    }
  };
  function mouseMoveHandler(event: any) {
    if (currentCard) {
    }
  }
  const dragLeaveHandler = function (event: any) {
    console.log(currentCard);
  };
  const dragEndHandler = function (event: any) {};
  const dragDropHandler = function (event: any, card: any, list: any) {
    event.preventDefault();
    // console.log(currentCard + 'drop');
  };
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{ position: 'absolute', zIndex: '3', width: '100%', margin: '0' }}
        className="card"
        draggable={true}
        onMouseDown={(event) => mouseDownHandler(event)}
        onMouseMove={(event) => mouseMoveHandler(event)}
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
