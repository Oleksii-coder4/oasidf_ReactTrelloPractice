import React, { ReactNode, useEffect, useState } from 'react';
import Modal from '../../../UI/Modal/Modal';
import instance from '../../../api/request';
import classes from '../components/Home/css/home.module.css';
// import './css/createBoard.css';
interface createBoard {
  active: boolean;
  setActive: any;
  onCardCreated: () => void;
}
const CreateBoard = function ({ active, setActive, onCardCreated }: createBoard) {
  const backgroundButtons = [
    { background: 'linear-gradient(to right, #8360c3, #2ebf91)', id: 1 },
    { background: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)', id: 2 },
    { background: 'linear-gradient(to right, #DECBA4, #3E5151)', id: 3 },
    { background: 'linear-gradient(to right, #fffbd5, #b20a2c)', id: 4 },
    { background: 'linear-gradient(to right, #2c3e50, #4ca1af)', id: 5 },
  ];
  const [selectedBackground, setSelectedBackground] = useState('rgb(0, 113, 191)');
  const [inputValue, setInputValue] = useState('');
  const addBoard = async function (event: any) {
    event.preventDefault();
    if (inputValue) {
      console.log('post');
      await instance.post('/board', {
        title: inputValue,
        custom: {
          background: selectedBackground,
        },
      });
      setActive(false);
      onCardCreated();
    }
  };
  const handleBackgroundClick = function (event: any, background: string) {
    event.preventDefault();
    setSelectedBackground(background);
  };

  const onEnterKeyDown = (event: any) => {
    if (event.key === 'Enter') setActive(false);
    if (event.key === 'Enter' && inputValue) {
      addBoard(event);
      setActive(false);
    }
  };

  return (
    <Modal active={active} setActive={setActive}>
      {/* form */}
      {/* border: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px 0 0 0;
    background: #ececec; */}
      <form className={classes.form} action="">
        <p>Background</p>
        <ul className={classes.colorButtons}>
          {backgroundButtons.map((option) => {
            return (
              <li key={option.id} className={classes.list}>
                <button
                  className={classes.colorButton}
                  style={{ background: `${option.background}` }}
                  onClick={(event) => handleBackgroundClick(event, `${option.background}`)}
                ></button>
              </li>
            );
          })}
        </ul>
        <label htmlFor="HomeFormTextInput">Title</label>
        <input
          autoFocus
          value={inputValue}
          type="text"
          id="HomeFormTextInput"
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={onEnterKeyDown}
        />
        <button className={classes.addBoardButton} onClick={(event) => addBoard(event)}>
          make
        </button>
      </form>
    </Modal>
  );
};

export default CreateBoard;
