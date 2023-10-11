import classes from './css/cardModal.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  showCardModal,
  hideCardModal,
  selectVisibility,
  selectCardData,
} from '../../../../../features/cardModal/cardModalVisibilitySlice';
import EditDescription from './EditDescription/EditDescription';
const CardModal = function () {
  const isVisible = useSelector(selectVisibility);
  const cardData = useSelector(selectCardData);
  const dispatch = useDispatch();
  return (
    <div
      className={isVisible ? `${classes.modal} ${classes.active}` : classes.modal}
      onClick={() => dispatch(hideCardModal())}
    >
      <div className={classes.modal__content} onClick={(event) => event.stopPropagation()}>
        <h1 className={classes.modal__title}>{cardData.title}</h1>
        <p className={classes.modal__text}>У списку {cardData.listTitle}</p>
        <div>
          <div>
            <h2 className={classes.modal__text}>Користувачі</h2>
            <div>Цвітні кружки участників</div>
            <button className={classes.modal__button}>+</button>
            <button className={classes.modal__button}>Конект</button>
          </div>
          <div>
            {/* react portal */}
            <h2 className={classes.modal__text}>Опис</h2>
            <p>{cardData.cardDescription ? cardData.cardDescription : 'Опис відсутній'}</p>
          </div>
          <EditDescription></EditDescription>
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
