import React, { useEffect, useRef, useState } from 'react';
import './css/card.css';
import CardsPlaceholder from './CardsPlaceholder/CardsPlaceholder';
import ReactDOM from 'react-dom';
interface card {
  title: string;
  // listState: any;
  // setListState: any;
  card: any;
  // listCards: any;
  // lists: any;
  // setListCards: any;
  styles: any;
  // handleMouseDown: any;
  // isMoveStart: any;
  handleMouseDown: any;
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
// const PLACEHOLDER_ID: number = -100;
// let movingElement: any;
// let currentCard: any;
// let xPosition: any;
// let yPosition: any;
let listStyles: any;
const Card = function ({ title, card, styles, handleMouseDown }: card) {
  return (
    <div
      style={{ ...styles }}
      // onDragStart={handleDragStart}
      data-card-id={card.id}
      className="card"
      draggable={true}
      onMouseDown={handleMouseDown}
    >
      <p className="card__text">{title}</p>
    </div>
  );
};
export default Card;
