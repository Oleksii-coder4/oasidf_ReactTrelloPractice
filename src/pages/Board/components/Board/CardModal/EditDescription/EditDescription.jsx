import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCardData } from '../../../../../../features/cardModal/cardModalVisibilitySlice';
import instance from '../../../../../../api/request';
import { useParams } from 'react-router-dom';
import { getBoardData } from '../../../../../../features/board/boardSlice';

const EditDescription = () => {
  const params = useParams();
  const boardId = params.boardId;
  const cardData = useSelector(selectCardData);
  const [isEdited, setIsEdited] = useState(false);
  const [descriptionData, setDescriptionData] = useState(cardData.card?.description);
  const dispatch = useDispatch();
  useEffect(() => {
    setDescriptionData(cardData.card?.description);
  }, [cardData]);
  const onInputBlur = () => {
    setIsEdited(false);
    onChange();
  };
  const onEnterKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEdited(false);
      onChange();
    }
  };
  const onChange = async () => {
    if (descriptionData.trim()) {
      await instance.put(`/board/${boardId}/card/${cardData.card.id}`, {
        title: cardData.card.title,
        list_id: cardData.list.id,
        description: descriptionData,
      });
      dispatch(getBoardData(boardId));
    }
  };
  return (
    <div>
      <h1>Опис</h1>
      {isEdited ? (
        <textarea
          value={descriptionData}
          onBlur={onInputBlur}
          onKeyDown={onEnterKeyDown}
          onChange={(event) => setDescriptionData(event.target.value)}
          type="text"
        />
      ) : (
        <p onClick={() => setIsEdited(true)}>{descriptionData ? descriptionData : 'Опис Відсутній'}</p>
      )}
    </div>
  );
};

export default EditDescription;
