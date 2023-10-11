import React, { useEffect, useRef, useState } from 'react';
import './css/card.css';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showCardModal, hideCardModal, setCardData } from '../../../../features/cardModal/cardModalVisibilitySlice';
interface card {
  list: any;
  title: string;
  card: any;
  styles: any;
  handleMouseDown: any;
}
// react portal

const Card = function ({ list, title, card, styles, handleMouseDown }: card) {
  const dispatch = useDispatch();
  const listTitle = list.title;
  return (
    <div
      style={{ ...styles }}
      data-card-id={card.id}
      className="card"
      draggable={true}
      onMouseDown={handleMouseDown}
      onClick={() => {
        dispatch(
          setCardData({
            title,
            listTitle,
            cardDescription: card.description,
          })
        );
        dispatch(showCardModal());
      }}
    >
      <p className="card__text">{title}</p>
    </div>
  );
};
export default Card;
