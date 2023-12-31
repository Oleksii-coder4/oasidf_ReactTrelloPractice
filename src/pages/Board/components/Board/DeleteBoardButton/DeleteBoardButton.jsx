import { Link, useParams } from 'react-router-dom';
import instance from '../../../../../api/request';
import classes from './css/deleteBoardButton.module.css';
import { useState } from 'react';
import { getBoardData } from '../../../../../features/board/boardSlice';
import { useDispatch } from 'react-redux';

const DeleteBoardButton = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [isAgreeMenuActive, setIsAgreeMenuActive] = useState(false);
  const onDeleteButtonClick = () => setIsAgreeMenuActive(true);
  const onAgreeButtonClick = async () => {
    await instance.delete(`/board/${params.boardId}`);
    setIsAgreeMenuActive(false);
  };
  return (
    <div>
      {isAgreeMenuActive ? (
        <div className={classes.menu}>
          <p className={classes.menu__text}>Ви дійсно хочете видалити дошку?</p>
          <div className={classes.menu__buttons}>
            <Link to={`/`}>
              <button className={classes.menu__button} onClick={onAgreeButtonClick}>
                Так!
              </button>
            </Link>
            <button className={classes.menu__button} onClick={() => setIsAgreeMenuActive(false)}>
              Ні
            </button>
          </div>
        </div>
      ) : (
        <button className={classes.header__button} onClick={onDeleteButtonClick}>
          ❌
        </button>
      )}
    </div>
  );
};

export default DeleteBoardButton;
