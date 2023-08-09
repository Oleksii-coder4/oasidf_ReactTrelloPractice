import React, { useEffect, useState } from 'react';
import instance from '../../../../../api/request';
interface addCardButton {
  listState: any;
  cardsState: any;
  setCardsState: any;
  getData: any;
  boardId: any;
}
// TODO: refactor params to boardId only
//
const AddCardButton = function ({ listState, cardsState, setCardsState, getData, boardId }: addCardButton) {
  const [cardIsEditing, setCardIsEditing] = useState(false);
  const [cardInputValue, setCardInputValue] = useState('');
  const [cardPositionToSend, setCardPositionToSend] = useState(0);
  async function handleAddCard() {
    let filterCards: object[] = [];
    if (cardInputValue.trim()) {
      // you need not to use getData, and to use a variable there instead of the card
      const tempId = +new Date();
      const newPosition = cardsState.length + 1;
      setCardsState([
        ...cardsState,
        {
          id: `temp${tempId}`,
          title: cardInputValue,
          position: newPosition ? newPosition : 1,
        },
      ]);
      let array = cardsState;
      // filterCards = cardsState.filter((item: any) => {
      //   if (typeof item.id === 'string' && item.id.startsWith('temp')) {
      //     return item;
      //   }
      // });
      instance
        .post(`board/${boardId}/card`, {
          title: cardInputValue,
          list_id: listState.id,
          position: newPosition ? newPosition : 1,
        })
        .then(() => {})
        // try to add border to elements that don't send
        .catch((err) => {});
    }
  }

  async function handleInputBlur(event: any) {
    if (cardInputValue) {
      handleAddCard();
      setCardIsEditing(false);
    }
  }
  async function handleInputKeyDown(event: any) {
    if (event.key === 'Enter' && cardInputValue) {
      handleAddCard();
      setCardInputValue('');
    }
  }
  function addCard() {
    setCardIsEditing(true);
  }
  return (
    <div>
      {cardIsEditing ? (
        <>
          <input
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            type="text"
            value={cardInputValue}
            onChange={(event) => setCardInputValue(event.target.value)}
          />
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
  );
};

export default AddCardButton;
