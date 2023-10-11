import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCardData } from '../../../../../../features/cardModal/cardModalVisibilitySlice';

const EditDescription = () => {
  const cardData = useSelector(selectCardData);
  const [isEdited, setIsEdited] = useState(false);
  const [descriptionData, setDescriptionData] = useState(cardData.cardDescription);
  const onInputBlur = () => {
    setIsEdited(false);
  };
  const onEnterKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEdited(false);
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
