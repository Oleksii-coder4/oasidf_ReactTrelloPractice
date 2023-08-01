import React, { useEffect, useState } from 'react';
import instance from '../../../../../api/request';
interface addCardButton {
  listState: any;
  cardsState: any;
  setCardsState: any;
  getData: any;
  params: any;
}
// TODO: refactor params to boardId only
//
const AddCardButton = function ({ listState, cardsState, setCardsState, getData, params }: addCardButton) {
  const [cardIsEditing, setCardIsEditing] = useState(false);
  const [cardInputValue, setCardInputValue] = useState('');
  const [cardPositionToSend, setCardPositionToSend] = useState(0);
  useEffect(() => {
    setCardPositionToSend(listState.cards.length);
  }, []);
  async function handleAddCard() {
    if (cardInputValue) {
      const tempId = +new Date();
      setCardsState([
        ...cardsState,
        {
          id: tempId,
          title: cardInputValue,
        },
      ]);
      setCardPositionToSend((oldPos) => oldPos++);
      const newPosition = cardPositionToSend + 1;
      instance
        .post(`board/${params.boardId}/card`, {
          title: cardInputValue,
          list_id: listState.id,
          position: newPosition ? newPosition : 1,
        })
        .then(() => {
          getData();
        })
        .catch((err) => {});
      console.log();
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
