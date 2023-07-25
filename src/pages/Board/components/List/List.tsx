import React, { useState } from 'react';
import ICard from '../../../../common/interfaces/ICard';
import Card from '../Card/Card';
import './css/list.css';
import instance from '../../../../api/request';
interface list {
  cards: ICard[];
  list: any;
  params: any;
  getData: () => void;
}
const List = function ({ cards, list, params, getData }: list) {
  const [cardIsEditing, setCardIsEditing] = useState(false);
  const [cardInputValue, setCardInputValue] = useState('');
  function addCard() {
    setCardIsEditing(true);
  }
  async function handleAddCard() {
    if (cardInputValue) {
      await instance.post(`board/${params.boardId}/card`, {
        title: cardInputValue,
        list_id: list.id,
        position: list.cards.length ? list.cards.length + 1 : 1,
      });
      getData();
    }
  }
  return (
    <div className="list">
      <h5 className="list__title">{list.title}</h5>
      {cards.map(function (item) {
        return <Card title={item.title} list={list} card={item}></Card>;
      })}
      {/* вынести в отдельный компонент */}
      <div>
        {cardIsEditing ? (
          <>
            <input type="text" value={cardInputValue} onChange={(event) => setCardInputValue(event.target.value)} />
            <button onClick={() => handleAddCard()}>Add</button>
            <button onClick={(event) => setCardIsEditing(false)}>✖</button>
          </>
        ) : (
          <button
            onClick={(event) => addCard()}
            type="button"
            style={{ color: 'grey', border: 'none', cursor: 'pointer' }}
          >
            + Add new card
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
