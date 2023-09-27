import classes from './css/cardModal.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { showCardModal, hideCardModal } from '../../../../../features/cardModal/cardModalVisibilitySlice';

const CardModal = function () {
  const isVisible = useSelector((state: any) => state.cardModal.isVisible);
  const dispatch = useDispatch();
  return (
    <div
      className={isVisible ? `${classes.modal} ${classes.active}` : classes.modal}
      onClick={() => dispatch(hideCardModal())}
    >
      <div className={classes.modal__content} onClick={(event) => event.stopPropagation()}>
        <h1 className={classes.modal__title}>Syp</h1>
        <p className={classes.modal__text}>У списку ...</p>
        <div>
          <div>
            <h2 className={classes.modal__text}>Користувачі</h2>
            <div>Цвітні кружки учасників</div>
            <button className={classes.modal__button}>+</button>
            <button className={classes.modal__button}>Конект</button>
          </div>

          <div>
            <h2 className={classes.modal__text}>Опис</h2>
            <button className={classes.modal__button}>Редагувати</button>
            <p>Info</p>
          </div>
        </div>
        <div>
          <h2 className={classes.modal__text}>Дії</h2>
          <button className={classes.modal__button}>Копіювати</button>
          <button className={classes.modal__button}>Перемістити картку</button>
          <button className={classes.modal__button}>Архівуватм</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
