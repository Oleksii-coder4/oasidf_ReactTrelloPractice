import React, { useEffect, useRef, useState } from 'react';
import './css/card.css';
import CardsPlaceholder from './CardsPlaceholder/CardsPlaceholder';
import ReactDOM from 'react-dom';
interface card {
  title: string;
  listState: any;
  setListState: any;
  card: any;
  listCards: any;
  lists: any;
  setListCards: any;
  styles: any;
  // handleMouseDown: any;
  // isMoveStart: any;
}
//for drag n drop
// let isDragStarted: any;
// let movingElement: any;
// let xPos: any;
// let yPos: any;
// let elementBelow: any;
// let currentDroppable: any;
//--------------

// placeholderId const 1!!!!!!!!!!!!!!!!!!!!!!!!!!
const PLACEHOLDER_ID: number = -100;
let movingElement: any;
let currentCard: any;
let xPosition: any;
let yPosition: any;
const Card = function ({ title, listState, setListState, card, listCards, lists, setListCards, styles }: card) {
  const [isMouseDown, setIsmMouseDown] = useState(false);
  const [isMouseMove, setIsMouseMove] = useState<boolean>(false);
  const isMouseMoveRef = useRef<any>(false);
  const currentArrayRef = useRef<any>();
  const spareArrayRef = useRef<any>();
  const currentListRef = useRef<any>();
  // const isMouseDownRef = useRef(false);
  useEffect(() => {
    if (!isMouseDown) {
      return;
    }
    console.log('here');
    document.addEventListener('mousemove', handleMouseMove);
    // document.addEventListener('onmouseup', handleMouseUp);
    movingElement.onmouseup = handleMouseUp; // working only in this way (, onMouseUp don't work
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseDown]);
  function mouseDownHandler(event: any) {
    console.log('down');
    setIsmMouseDown(true);
    event.preventDefault();
    movingElement = event.target;
    currentCard = card;
    const droppableBelow = getElementBelow(movingElement);
    currentListRef.current = droppableBelow.closest('.list');
    xPosition = event.clientX - event.target.getBoundingClientRect().left;
    yPosition = event.clientY - event.target.getBoundingClientRect().top;
    console.log('addEvent');
  }
  // v2
  function handleMouseMove(event: any) {
    event.preventDefault();
    moveCard(event);
    // let tempArray: any;
    const droppableBelow = getElementBelow(movingElement);
    if (!droppableBelow) return;
    const listBelow = droppableBelow.closest('.list');
    const cardBelow = droppableBelow.closest('.card');
    if (!listBelow) return;
    const listBelowId = listBelow.getAttribute('data-list-id');
    // one is a number another string
    const currentListIndex = lists.findIndex((item: any) => item.id == listBelowId);
    const currentListCards = lists[currentListIndex].cards;
    const tempArray = [...currentListCards];

    // isMouseMoveRef.current = true;
    setIsMouseMove(true);
    // const currentMovingCardIndex = tempArray.findIndex((item: any) => item.id === currentCard.id);
    const placeholder = { id: PLACEHOLDER_ID, position: currentCard.position, isPlaceholder: true };
    // add placeholder to array
    tempArray.splice(tempArray.length, 0, placeholder);
    spareArrayRef.current = tempArray;
    setListCards(tempArray);
    setListState({ ...listState, cards: [...tempArray] });
    if (!cardBelow) return;

    const cardId = cardBelow.getAttribute('data-card-id');
    const card = listCards.find((item: any) => {
      return item.id == cardId;
    });
    if (!card) return;
    if (PLACEHOLDER_ID == card.id) return;

    const rect = cardBelow.getBoundingClientRect();
    const yPosition = event.clientY - rect.top;
    if (yPosition > rect.height) {
      return;
    }
    // find index
    const cardIndex = tempArray.findIndex((item: any) => {
      return item.id === card.id;
    });
    const placeholderIndex = tempArray.findIndex((item: any) => {
      return item.id === PLACEHOLDER_ID;
    });
    const movingElementIndex = tempArray.findIndex((item: any) => {
      return item.id === currentCard.id;
    });
    const newPosition = tempArray[placeholderIndex].position;
    tempArray[placeholderIndex].position = card.position;
    tempArray[movingElementIndex].position = card.position;
    tempArray[cardIndex].position = newPosition;
    setListCards(tempArray);
    currentArrayRef.current = tempArray;
  }

  function moveCard(event: any) {
    movingElement.style.left = event.clientX - xPosition + 'px';
    movingElement.style.top = event.clientY - yPosition + 'px';
  }

  function getElementBelow(movingElement: any) {
    const rect = movingElement.getBoundingClientRect();
    let cords = {
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    };
    movingElement.style.display = 'none';
    let elementBelow: any = document.elementFromPoint(cords.left, cords.top);
    movingElement.style.display = 'flex';
    return elementBelow;
  }
  function handleMouseUp(event: any) {
    if (!spareArrayRef.current) return;
    const spareArray = [...spareArrayRef.current];
    setIsMouseMove(false);
    setIsmMouseDown(false);
    document.removeEventListener('mousemove', handleMouseMove);
    const placeholderIndex = spareArray.findIndex((item: any) => item.id === PLACEHOLDER_ID);
    spareArray.splice(placeholderIndex, 1);
    setListCards(spareArray);
  }

  function handleDragStart(event: any, card: any, list: any) {
    event.preventDefault();
    return false;
  }

  const extraStyles = isMouseMove
    ? {
        position: 'absolute',
        zIndex: '1000',
        // need to make a logic of onMouseUp normally
        // transform: 'rotate(2deg)',
        boxShadow: '5px 5px 15px black',
      }
    : {};
  return (
    <div
      onMouseEnter={() => console.log(listState)}
      style={{ ...styles, ...extraStyles }}
      data-card-id={card.id}
      className="card"
      draggable={true}
      onDragStart={(event) => handleDragStart(event, card, listState)}
      onMouseDown={mouseDownHandler}
    >
      <p className="card__text">{title}</p>
    </div>
  );
};
export default Card;
