import React, { useEffect, useState } from 'react';
import ICard from '../../../../common/interfaces/ICard';
import Card from '../Card/Card';
import './css/list.css';
import instance from '../../../../api/request';
import AddCardButton from './AddCardButton/AddCardButton';
import { relative } from 'path';
interface list {
  cards: ICard[];
  list: any;
  params: any;
  getData: () => void;
}
const List = function ({ cards, list, params, getData }: list) {
  const [cardsState, setCardsState] = useState(cards);
  const [listState, setListState] = useState(list);
  const [dropAreas, setDropAreas] = useState<any>([]); //useless
  useEffect(() => {
    setListState(list);
    setCardsState(cards);
    setDropAreas(JSON.parse(JSON.stringify(cards)));
  }, [cards, list]);
  return (
    <div className="list" onClick={() => console.log(dropAreas)}>
      <h5 className="list__title">{listState.title}</h5>
      {cardsState
        .sort((secondCard, firstCard) => {
          return secondCard.position - firstCard.position;
        })
        .map(function (card) {
          return (
            <div>
              <Card
                key={card.id}
                title={card.title}
                listState={listState}
                setListState={setListState}
                card={card}
                cardsState={cardsState}
                setCardsState={setCardsState}
              ></Card>
              <div
                style={{
                  display: 'flex',
                  position: 'relative',
                  zIndex: '2',
                  // some magic
                  // pointerEvents: 'none',
                  padding: '8px 0',
                  opacity: 0.4,
                  alignItems: 'center',
                  maxHeight: '40px',
                  background: 'black',
                  borderRadius: '2px',
                }}
              >
                some div
              </div>
            </div>
          );
        })}
      <AddCardButton
        listState={listState}
        cardsState={cardsState}
        setCardsState={setCardsState}
        getData={getData}
        params={params}
      ></AddCardButton>
    </div>
  );
};

export default List;
