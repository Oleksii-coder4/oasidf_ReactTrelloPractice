import React, { useState } from 'react';
import instance from '../../../../api/request';
import classes from '../Board/css/board.module.css';
import { addListButton } from './interfaces/addListButton';
const AddListButton = function ({ getData, params, board, setBoard }: addListButton) {
  const [showInputField, setShowInputField] = useState(false);
  const [listInputValue, setListInputValue] = useState('');
  function addList() {
    setShowInputField(true);
  }
  async function handleInputBlur(event: any) {
    setShowInputField(false);

    if (listInputValue.trim()) {
      handleAddButton();
    }
  }
  async function handleInputKeyDown(event: any) {
    if (event.key === 'Enter') setShowInputField(false);
    if (event.key === 'Enter' && listInputValue.trim()) {
      handleAddButton();
      setShowInputField(false);
    }
  }
  async function handleAddButton() {
    if (listInputValue.trim()) {
      setBoard({
        ...board,
        lists: [
          ...board.lists,
          { title: listInputValue, position: board.lists.length ? board.lists.length + 1 : 1, cards: [] },
        ],
      });
      await instance.post(`/board/${params.boardId}/list`, {
        title: listInputValue,
        position: board.lists.length ? board.lists.length + 1 : 1,
      });
      //it is necessary for addCardButton, it takes id from it
      getData();
    }
  }
  const boardLimit = board.lists.length > 4;

  return (
    <div>
      {showInputField ? (
        <>
          <input
            autoFocus
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            type="text"
            value={listInputValue}
            onChange={(event) => setListInputValue(event.target.value)}
          />
          <button onClick={() => handleAddButton()}>Add</button>
          <button onClick={(event) => setShowInputField(false)}>✖</button>
        </>
      ) : (
        <button disabled={boardLimit} className={classes.board_lists__button} onClick={() => addList()}>
          {boardLimit ? `Lists limit` : `Make List`}
        </button>
      )}
    </div>
  );
};

export default AddListButton;
