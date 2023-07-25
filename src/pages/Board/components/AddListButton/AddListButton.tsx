import React, { useState } from 'react';
import instance from '../../../../api/request';
import classes from '../Board/css/board.module.css';
import { addListButton } from './interfaces/addListButton';
const AddListButton = function ({ params, board, getData }: addListButton) {
  const [showInputField, setShowInputField] = useState(false);
  const [listInputValue, setListInputValue] = useState('');
  function addList() {
    setShowInputField(true);
  }
  async function handleAddButton() {
    if (listInputValue) {
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
          <input type="text" value={listInputValue} onChange={(event) => setListInputValue(event.target.value)} />
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
