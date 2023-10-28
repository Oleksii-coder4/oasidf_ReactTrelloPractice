import React, { useState } from 'react';
import instance from '../../../../api/request';
import classes from '../Board/css/board.module.css';
import { addListButton } from './interfaces/addListButton';
import { getBoard, getBoardData, setBoardLists } from '../../../../features/board/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const AddListButton = function ({ setBoard }) {
  const dispatch = useDispatch();
  const boardData = useSelector(getBoard);
  const board = JSON.parse(JSON.stringify(boardData));
  const params = useParams();
  console.log('params');
  console.log(params);
  const [showInputField, setShowInputField] = useState(false);
  const [listInputValue, setListInputValue] = useState('');
  function addList() {
    setShowInputField(true);
  }
  async function handleInputBlur(event) {
    setShowInputField(false);
    if (listInputValue.trim()) {
      handleAddButton();
    }
  }
  async function handleInputKeyDown(event) {
    if (event.key === 'Enter') setShowInputField(false);
    if (event.key === 'Enter' && listInputValue.trim()) {
      handleAddButton();
      setShowInputField(false);
    }
  }
  async function handleAddButton() {
    if (listInputValue.trim()) {
      const list = { title: listInputValue, position: board.lists.length ? board.lists.length + 1 : 1, cards: [] };
      const boardLists = [...board.lists, list];
      dispatch(setBoardLists(boardLists));

      await instance.post(`/board/${params.boardId}/list`, {
        title: listInputValue,
        position: board.lists.length ? board.lists.length + 1 : 1,
      });
      //it is necessary for addCardButton, it takes id from it
      // getData();
      setListInputValue('');
      dispatch(getBoardData(params.boardId));
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
