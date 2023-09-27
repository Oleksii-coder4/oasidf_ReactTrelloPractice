import React, { useEffect, useRef, useState } from 'react';
import './css/card.css';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showCardModal, hideCardModal } from '../../../../features/cardModal/cardModalVisibilitySlice';
interface card {
  title: string;
  card: any;
  styles: any;
  handleMouseDown: any;
}
const Card = function ({ title, card, styles, handleMouseDown }: card) {
  const dispatch = useDispatch();
  return (
    <div
      style={{ ...styles }}
      data-card-id={card.id}
      className="card"
      draggable={true}
      onMouseDown={handleMouseDown}
      onClick={() => dispatch(showCardModal())}
    >
      <p className="card__text">{title}</p>
    </div>
  );
};
export default Card;
