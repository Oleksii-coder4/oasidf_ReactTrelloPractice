import React, { useEffect, useState } from 'react';
import ICard from '../../../../common/interfaces/ICard';
import Card from '../Card/Card';
import './css/list.css';
import instance from '../../../../api/request';
import AddCardButton from './AddCardButton/AddCardButton';
interface list {
  cards: ICard[];
  list: any;
  boardId: any;
  getData: () => void;
  // setCurrentCard: any;
  // setIsDragStart: any;
  // setXPosition: any;
  // setYPosition: any;
  // isMoveStart: any;
}
const List = function ({
  getData,
  cards,
  list,
  boardId, // setCurrentCard,
  // setIsDragStart,
} // setXPosition,
// setYPosition,
// isMoveStart,
: list) {
  const [listCards, setListCards] = useState(cards);
  const [listState, setListState] = useState(list);
  useEffect(() => {
    setListState(list);
    setListCards(cards);
  }, [cards, list]);
  // function handleMouseDown(event: any, card: any) {
  //   const xPosition = event.clientX - event.target.getBoundingClientRect().left;
  //   const yPosition = event.clientY - event.target.getBoundingClientRect().top;
  //   setCurrentCard(card);
  //   setXPosition(xPosition);
  //   setYPosition(yPosition);
  //   setIsDragStart(true);
  // }
  return (
    <div className="wrapper">
      <div className="list">
        <h5 className="list__title">{listState.title}</h5>
        {listCards
          .sort((secondCard, firstCard) => {
            return secondCard.position - firstCard.position;
          })
          .map(function (card: any, index: any) {
            if (card.isPlaceholder) {
              return (
                <Card
                  key={card.id}
                  title={card.title}
                  listState={listState}
                  setListState={setListState}
                  card={card}
                  listCards={listCards}
                  setListCards={setListCards}
                  styles={{ padding: '15px', background: 'grey', border: '1px solid black', pointerEvents: 'none' }}
                />
              );
            } else {
              return (
                <Card
                  key={card.id}
                  title={card.title}
                  listState={listState}
                  setListState={setListState}
                  card={card}
                  listCards={listCards}
                  setListCards={setListCards}
                  styles={{}}
                  // handleMouseDown={handleMouseDown}
                  // isMoveStart={isMoveStart}
                ></Card>
              );
            }
          })}
        <AddCardButton
          listState={listState}
          cardsState={listCards}
          setCardsState={setListCards}
          getData={getData}
          boardId={boardId}
        ></AddCardButton>
      </div>
    </div>
  );
};

export default List;
