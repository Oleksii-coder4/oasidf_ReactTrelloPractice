import React, { useEffect, useState } from 'react';
import classes from '../Board/css/board.module.css';
import instance from '../../../../api/request';
const TitleInput = function ({ board, params, getData }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState('');
  useEffect(() => {
    setTitleInputValue(board.title);
  }, []);
  async function handleInputBlur(event: any) {
    if (titleInputValue) {
      await instance.put(`/board/${params.boardId}`, {
        title: titleInputValue,
      });
      getData();
      setIsEditing(false);
    }
  }
  async function handleInputKeyDown(event: any) {
    if (event.key === 'Enter' && titleInputValue) {
      await instance.put(`/board/${params.boardId}`, {
        title: titleInputValue,
      });
      getData();
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
          className={classes.title_input}
          type="text"
          value={`${titleInputValue}`}
          onChange={(event) => setTitleInputValue(event.target.value)}
          onBlur={(event) => handleInputBlur(event)}
          onKeyDown={(event) => handleInputKeyDown(event)}
        />
      ) : (
        <h1 className={classes.header__title} onClick={() => handleTitleClick()}>
          {board.title}
        </h1>
      )}
    </div>
  );
};

export default TitleInput;
