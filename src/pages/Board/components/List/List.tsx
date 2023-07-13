import React from 'react';
import ICard from '../../../../common/interfaces/ICard';
import Card from '../Card/Card';
import './css/list.css';
const List = function ({ title, cards }: { title: string; cards: ICard[] }) {
  return (
    <div className="list">
      <h5 className="list__title">{title}</h5>
      {cards.map(function (item) {
        return <Card title={item.title}></Card>;
      })}
      <div>
        <button type="button" style={{ color: 'grey', border: 'none', cursor: 'pointer' }}>
          + Add new post
        </button>
      </div>
    </div>
  );
};

export default List;
