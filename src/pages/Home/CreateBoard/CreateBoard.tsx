import React, { ReactNode, useEffect, useState } from 'react';
import Modal from '../../../UI/Modal/Modal';
import instance from '../../../api/request';
import './css/createBoard.css';
interface createBoard {
  active: boolean;
  setActive: any;
  onCardCreated: () => void;
}
const CreateBoard = function ({ active, setActive, onCardCreated }: createBoard) {
  const backgroundButtons = [
    { background: 'linear-gradient(to right, #8360c3, #2ebf91)' },
    { background: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)' },
    { background: 'linear-gradient(to right, #DECBA4, #3E5151)' },
    { background: 'linear-gradient(to right, #fffbd5, #b20a2c)' },
    { background: 'linear-gradient(to right, #2c3e50, #4ca1af)' },
  ];
  //   form states
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
      //   get data and rerender parent component
      onCardCreated();
    }
  };
  const handleBackgroundClick = function (event: any, background: string) {
    event.preventDefault();
    setSelectedBackground(background);
  };
  return (
    <Modal active={active} setActive={setActive}>
      <form className="form" action="">
        <label htmlFor="HomeFormColorInput">Background</label>
        <ul className="listOfButtons">
          {backgroundButtons.map((option) => {
            return (
              <li className="listOfButtons__list">
                <button
                  className="button"
                  style={{ background: `${option.background}` }}
                  onClick={(event) => handleBackgroundClick(event, `${option.background}`)}
                ></button>
              </li>
            );
          })}
        </ul>
        <label htmlFor="HomeFormTextInput">Title</label>
        <input
          value={inputValue}
          type="text"
          id="HomeFormTextInput"
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={(event) => addBoard(event)}>make</button>
      </form>
    </Modal>
  );
};

export default CreateBoard;
