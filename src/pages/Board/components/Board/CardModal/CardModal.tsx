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
  // почему без (?) не работает cardTitle = cardData.card?.title ?
  // предположение : модалка отрисовуется еще до нажатия на карточку => что данные пустые, по этому проверка
  const cardTitle = cardData.card?.title;
  const listTitle = cardData.list?.title;
  const dispatch = useDispatch();
  return (
    <div
      className={isVisible ? `${classes.modal} ${classes.active}` : classes.modal}
      onClick={() => dispatch(hideCardModal())}
    >
      <div className={classes.modal__content} onClick={(event) => event.stopPropagation()}>
        <h1 className={classes.modal__title}>{cardTitle}</h1>
        <p className={classes.modal__text}>У списку {listTitle}</p>
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
            <p>{cardData.card?.description ? cardData.card?.description : 'Опис відсутній'}</p>
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
