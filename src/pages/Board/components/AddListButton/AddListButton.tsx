import React, { useState } from 'react';
import instance from '../../../../api/request';
import classes from '../Board/css/board.module.css';
import { addListButton } from './interfaces/addListButton';
const AddListButton = function ({ params, board, getData, setBoard }: addListButton) {
  const [showInputField, setShowInputField] = useState(false);
  const [listInputValue, setListInputValue] = useState('');
  function addList() {
    setShowInputField(true);
  }
  async function handleInputBlur(event: any) {
    if (listInputValue) {
      handleAddButton();
      setShowInputField(false);
    }
  }
  async function handleInputKeyDown(event: any) {
    if (event.key === 'Enter' && listInputValue) {
      handleAddButton();
      setShowInputField(false);
    }
  }
  async function handleAddButton() {
    console.log(board);
    console.log(board.lists);
    if (listInputValue) {
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
      getData();
    }
  }
  return (
    <div>
      {showInputField ? (
        <>
          <input
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
        <button className={classes.board_lists__button} onClick={() => addList()}>
          Make List
        </button>
      )}
    </div>
  );
};

export default AddListButton;
