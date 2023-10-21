import React, { useEffect, useRef, useState } from 'react';
import './css/card.css';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { showCardModal, hideCardModal, setCardData } from '../../../../features/cardModal/cardModalVisibilitySlice';
import CardModal from '../Board/CardModal/CardModal';
// interface card {
//   list: any;
//   title: string;
//   card: any;
//   styles: any;
//   handleMouseDown: any;
// }
// react portal

const Card = function ({ list, card, styles, handleMouseDown }) {
  const dispatch = useDispatch();
  const [boardSection, setBoardSection] = useState();
  const listTitle = list.title;
  const title = card.title;
  useEffect(() => {
    const boardDomNode = document.querySelector('#boardSection');
    if (boardDomNode) {
      setBoardSection(boardDomNode);
    }
  }, []);
  if (!boardSection) {
    return null;
  }

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
      {createPortal(<CardModal></CardModal>, boardSection)}
    </div>
  );
};
export default Card;
