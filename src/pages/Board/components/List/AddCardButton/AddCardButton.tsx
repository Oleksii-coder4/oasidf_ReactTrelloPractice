import React, { useEffect, useState } from 'react';
import instance from '../../../../../api/request';
interface addCardButton {
  listState: any;
  listId: number;
  cardsState: any;
  setCardsState: any;
  boardId: any;
}
// TODO: refactor params to boardId only
//
const AddCardButton = function ({ listState, listId, cardsState, setCardsState, boardId }: addCardButton) {
  const [cardIsEditing, setCardIsEditing] = useState(false);
  const [cardInputValue, setCardInputValue] = useState('');
  const [cardPositionToSend, setCardPositionToSend] = useState(0);
  // const isCardsLimit = cardsState.length > 9;
  async function handleAddCard() {
    // if (isCardsLimit) {
    //   setCardIsEditing(false);
    //   return;
    // }
    let filterCards: object[] = [];
    if (cardInputValue.trim()) {
      // you need not to use getData, and to use a variable there instead of the card
      const tempId = +new Date();
      const newPosition = cardsState.length + 1;
      setCardsState([
        ...cardsState,
        {
          id: tempId,
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
      instance.post(`board/${boardId}/card`, {
        title: cardInputValue,
        list_id: listId,
        position: newPosition ? newPosition : 1,
      });
    }
  }

  async function handleInputBlur(event: any) {
    setCardIsEditing(false);

    if (cardInputValue.trim()) {
      handleAddCard();
    }
  }
  async function handleInputKeyDown(event: any) {
    if (event.key === 'Enter') setCardIsEditing(false);
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
            autoFocus
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
          // disabled={isCardsLimit}
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
