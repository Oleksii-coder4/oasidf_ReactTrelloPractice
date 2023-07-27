import React, { useEffect, useState } from 'react';
import ICard from '../../../../common/interfaces/ICard';
import Card from '../Card/Card';
import './css/list.css';
import instance from '../../../../api/request';
import AddCardButton from './AddCardButton/AddCardButton';
interface list {
  cards: ICard[];
  list: any;
  params: any;
  getData: () => void;
}
const List = function ({ cards, list, params, getData }: list) {
  const [cardsState, setCardsState] = useState(cards);
  const [listState, setListState] = useState(list);

  useEffect(() => {
    setListState(list);
    setCardsState(cards);
  }, [cards, list]);

  return (
    <div className="list">
      <h5 className="list__title">{listState.title}</h5>
      {cardsState.map(function (item) {
        return (
          <Card key={item.id} title={item.title} listState={listState} setListState={setListState} card={item}></Card>
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
