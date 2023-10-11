import React, { useEffect, useState } from 'react';
import classes from '../Board/css/board.module.css';
import instance from '../../../../api/request';
const TitleInput = function ({ board, boardId }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState(board.title);
  async function handleInputBlur(event: any) {
    if (titleInputValue.trim()) {
      await instance.put(`/board/${boardId}`, {
        title: titleInputValue,
      });
      setIsEditing(false);
    }
  }
  // trim
  async function handleInputKeyDown(event: any) {
    if (event.key === 'Enter' && titleInputValue) {
      await instance.put(`/board/${boardId}`, {
        title: titleInputValue,
      });
      setIsEditing(false);
    }
  }
  function handleTitleClick() {
    setIsEditing(true);
  }
  return (
    <div className={classes.header__title}>
      {isEditing ? (
        <input
          autoFocus
          className={classes.title_input}
          type="text"
          value={titleInputValue}
          onChange={(event) => setTitleInputValue(event.target.value)}
          onBlur={(event) => handleInputBlur(event)}
          onKeyDown={(event) => handleInputKeyDown(event)}
        />
      ) : (
        <h1 className={classes.header__title} onClick={() => handleTitleClick()}>
          {titleInputValue}
        </h1>
      )}
    </div>
  );
};

export default TitleInput;
