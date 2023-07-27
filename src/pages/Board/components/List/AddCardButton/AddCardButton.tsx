import React, { useEffect, useState } from 'react';
import instance from '../../../../../api/request';
interface addCardButton {
  listState: any;
  cardsState: any;
  setCardsState: any;
  getData: any;
  params: any;
}

const AddCardButton = function ({ listState, cardsState, setCardsState, getData, params }: addCardButton) {
  const [cardIsEditing, setCardIsEditing] = useState(false);
  const [cardInputValue, setCardInputValue] = useState('');
  const [cardPositionToSend, setCardPositionToSend] = useState('');
  useEffect(() => {
    setCardPositionToSend(listState.cards.length);
  }, [listState]);
  async function handleAddCard() {
    if (cardInputValue) {
      setCardsState([
        ...cardsState,
        {
          title: cardInputValue,
        },
      ]);
      await instance.post(`board/${params.boardId}/card`, {
        title: cardInputValue,
        list_id: listState.id,
        position: cardPositionToSend ? cardPositionToSend + 1 : 1,
      });
      setCardPositionToSend(cardPositionToSend + 1);
      getData();
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
