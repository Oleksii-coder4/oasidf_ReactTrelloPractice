import React, { useEffect, useRef, useState } from 'react';
import ICard from '../../../../common/interfaces/ICard';
import Card from '../Card/Card';
import './css/list.css';
import instance from '../../../../api/request';
import AddCardButton from './AddCardButton/AddCardButton';
interface list {
  cards: ICard[];
  list: any;
  boardId: any;
  lists: any;
  getData: () => void;
  board: any;
  setBoard: any;
}
let tempArray: any;
let placeholder: any;
const PLACEHOLDER_ID: number = -100;
let movingElement: any;
let currentCard: any;
let xPosition: any;
let yPosition: any;
let forsakenList: any;
let startList: any;
let tempList: any;
let isMouseMove: any;
let boardLists: any;
const List = function ({ getData, cards, list, lists, boardId, board, setBoard }: list) {
  const [listCards, setListCards] = useState(cards);
  const [listState, setListState] = useState(list);
  const [isMouseDown, setIsmMouseDown] = useState(false);
  // dispatch();
  useEffect(() => {
    boardLists = JSON.parse(JSON.stringify(board.lists));
  }, []);
  useEffect(() => {
    setListCards(cards);
    setListState(list);
  }, [cards, list, board]);
  useEffect(() => {
    if (!isMouseDown) {
      return;
    }
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseDown]);
  function handleMouseDown(event: any) {
    console.log('down');
    setIsmMouseDown(true);
    event.preventDefault();
    movingElement = event.target;
    const currentCardId = event.target.getAttribute('data-card-id');
    const currentCardIndex = listCards.findIndex((item) => item.id == currentCardId);
    currentCard = { ...listCards[currentCardIndex] };
    const droppableBelow = getElementBelow(movingElement);
    startList = droppableBelow.closest('.list');
    const currentListId = startList.getAttribute('data-list-id');
    const currentListIndex = lists.findIndex((item: any) => item.id == currentListId);
    startList = lists[currentListIndex];
    xPosition = event.clientX - event.target.getBoundingClientRect().left;
    yPosition = event.clientY - event.target.getBoundingClientRect().top;
    tempArray = [...listCards];
    tempList = listState;
  }
  // v2
  function handleMouseMove(event: any) {
    event.preventDefault();
    moveCard(event);
    // && (event.movementX > 1 || event.movementY > 1)
    if (!isMouseMove) {
      isMouseMove = true;
      const droppableBelow = getElementBelow(movingElement);
      if (!droppableBelow) return;
      const listBelow = droppableBelow.closest('.list');
      if (!listBelow) return;
      tempArray = [...listCards];
      placeholder = { id: PLACEHOLDER_ID, position: currentCard.position, isPlaceholder: true };
      // if user start click a lot of times on card, it will add a lot of placeholders without it
      if (tempArray.find((item: any) => item.id == PLACEHOLDER_ID)) return;
      tempArray.splice(tempArray.length, 0, placeholder);
      movingElement.style.position = 'absolute';
      movingElement.style.zIndex = '1000';
      movingElement.style.pointerEvents = 'none'; // to provide mouse event, card is below the cursor that is why the event does not work
      movingElement.style.transform = 'rotate(5deg)';
      movingElement.style.boxShadow =
        ' rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset';
      // for mouseMoveOnList, to trigger list change, state don't update in time
      setListCards(JSON.parse(JSON.stringify(tempArray)));
      setListState({ ...listState, cards: [...tempArray] });
    }
    // if (!isMouseMove) {
    //   isMouseMove = true;
    // }
  }

  function handleMouseLeave(event: any) {
    if (!tempArray) return;
    forsakenList = JSON.parse(JSON.stringify(listState));
  }
  function handleMouseEnter(event: any) {
    if (!tempArray) return;
    // if (!isMouseMove) return;
    if (forsakenList.id == listState.id) return;
    // it fix the position of the placeholder, if the amount of cards is 4 but with current card it will be 5 that is why position will be 6, not 5
    if (listCards.find((item: any) => item.id == currentCard.id)) {
      const currentCardIndex = listCards.findIndex((item: any) => item.id == currentCard.id);
      const enterArray = JSON.parse(JSON.stringify(listCards));
      enterArray.splice(currentCardIndex, 1);
      tempArray = JSON.parse(JSON.stringify(enterArray));
    } else {
      tempArray = JSON.parse(JSON.stringify(listCards));
    }
    forsakenList.cards.sort((secondCard: any, firstCard: any) => secondCard.position - firstCard.position);
    tempList = listState;
    placeholder = { ...placeholder, position: tempArray.length + 1 };
    // change future card position
    currentCard.position = tempArray.length + 1;
    tempArray.splice(tempArray.length, 0, placeholder);
    const currentPlaceholderIndex = forsakenList.cards.findIndex((item: any) => item.id === PLACEHOLDER_ID);
    if (currentPlaceholderIndex !== -1) {
      forsakenList.cards = forsakenList.cards.map((item: any, index: number) => {
        if (index >= currentPlaceholderIndex) {
          item.position -= 1;
          return item;
        }
        return item;
      });
      forsakenList.cards.splice(currentPlaceholderIndex, 1);
    }
    if (listCards.find((item: any) => item.id == currentCard.id)) {
      tempArray.splice(tempArray.length, 0, currentCard);
    }
    // delete placeholder
    // add placeholder to new listState
    const forsakenListIndex = boardLists.findIndex((item: any) => item.id === forsakenList.id);
    const tempListIndex = boardLists.findIndex((item: any) => item.id === tempList.id);
    boardLists[forsakenListIndex] = forsakenList;
    boardLists[tempListIndex] = { ...tempList, cards: tempArray };
    setBoard({ ...board, lists: boardLists });
  }
  function handleMouseMoveOnList(event: any) {
    event.preventDefault();
    // on the first mouse move do nothing not to kra the app
    if (!isMouseMove) return;
    if (!tempArray) return;
    const droppableBelow = getElementBelow(movingElement);
    if (!droppableBelow) return;
    const cardBelow = droppableBelow.closest('.card');
    if (!cardBelow) return;
    const cardId = cardBelow.getAttribute('data-card-id');
    const card = listCards.find((item: any) => item.id == cardId);
    const cardBelowIndex = listCards.findIndex((item: any) => item.id == cardId);
    if (!card) return;
    if (PLACEHOLDER_ID == card.id) return;
    // if (tempArray != listCards) return;
    const rect = cardBelow.getBoundingClientRect();
    const yPosition = event.clientY - rect.top;
    if (yPosition > rect.height) return;
    // find index
    const cardIndex = tempArray.findIndex((item: any) => item.id == card.id);
    const placeholderIndex = tempArray.findIndex((item: any) => item.id === PLACEHOLDER_ID);
    // update cardPosition
    // if (cardIndex === -1) return;
    const cardPosition = tempArray[cardIndex].position;
    const newPosition = tempArray[placeholderIndex].position;
    tempArray[placeholderIndex].position = cardPosition;
    currentCard.position = cardPosition;
    tempArray[cardIndex].position = newPosition;
    setListCards(tempArray);
    setListState({ ...listState, cards: [...tempArray] });
  }
  function moveCard(event: any) {
    movingElement.style.left = event.clientX - xPosition + 'px';
    movingElement.style.top = event.clientY - yPosition + 'px';
  }
  function getElementBelow(movingElement: any) {
    const rect = movingElement.getBoundingClientRect();
    let cords = {
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    };
    movingElement.style.display = 'none';
    let elementBelow: any = document.elementFromPoint(cords.left, cords.top);
    movingElement.style.display = 'flex';
    return elementBelow;
  }
  function handleMouseUp(event: any) {
    if (!tempArray) return;
    // ---
    //reset isOnList
    const currentArray = JSON.parse(JSON.stringify(tempArray));
    const isOnCurrentList = currentArray.find((item: any) => item.id == currentCard.id);
    const currentCardIndex = currentArray.findIndex((item: any) => item.id == currentCard.id);
    const startListIndex = boardLists.findIndex((item: any) => item.id === startList.id);
    startList = JSON.parse(JSON.stringify(boardLists[startListIndex]));
    const placeholderIndex = currentArray.findIndex((item: any) => item.id === PLACEHOLDER_ID);
    //if user try to click the button a couple of times it will delete cards without this logic
    if (placeholderIndex !== -1) {
      if (isOnCurrentList) {
        currentArray[currentCardIndex].position = currentCard.position;
        currentArray.splice(placeholderIndex, 1);
        startList.cards = currentArray;
      } else {
        const movingCardIndex = startList.cards.findIndex((item: any) => item.id === currentCard.id);
        startList.cards.splice(movingCardIndex, 1);
        currentArray.splice(placeholderIndex, 1, currentCard);
      }
      let newBoardLists = JSON.parse(JSON.stringify(board.lists));
      newBoardLists = newBoardLists.map((item: any) => {
        if (item.id == startList.id) {
          return startList;
        }
        if (item.id == tempList.id) {
          return { ...tempList, cards: currentArray };
        }
        return item;
      });
      setBoard({ ...board, lists: newBoardLists });
      boardLists = JSON.parse(JSON.stringify(newBoardLists));
    }
    // to put it into backend
    const newCards = boardLists.reduce((accrue: any, item: any, index: number) => {
      const listId = item.id;
      item.cards.forEach((element: any) => {
        const card = { id: element.id, position: element.position, list_id: listId };
        accrue.push(card);
      });
      return accrue;
    }, []);
    instance.put(`/board/${boardId}/card`, newCards);
    //reset
    isMouseMove = false;
    setIsmMouseDown(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    movingElement.style.position = 'unset';
    movingElement.style.zIndex = '0';
    movingElement.style.pointerEvents = 'all';
    movingElement.style.transform = 'rotate(0deg)';
    movingElement.style.boxShadow = 'none';
    movingElement = null;
    tempArray = null;
    tempList = null;
    // ---
    currentCard = null;
    placeholder = null;
    forsakenList = null;
    startList = null;
  }
  function handleListDragStart(event: any) {
    event.dataTransfer.setData('text', JSON.stringify(listState));
  }
  function handleListDragLeave(event: any) {
    if (event.relatedTarget === null || event.currentTarget.contains(event.relatedTarget)) return;
    event.currentTarget.style.boxShadow = 'none';
  }
  function handleListDragOver(event: any) {
    event.preventDefault();
    if (event.target.className !== 'list') return;
    event.target.style.boxShadow = 'rgb(38, 57, 77) 0px 20px 30px -10px';
  }
  function handleListDragEnd(event: any) {}
  function handleListDrop(event: any) {
    event.preventDefault();
    event.target.style.boxShadow = 'none';
    const list = JSON.parse(event.dataTransfer.getData('text'));
    // fix this, we need update our boardLists that is
    boardLists = boardLists.map((item: any) => {
      if (item.id == list.id) {
        item.position = listState.position;
        console.log(JSON.parse(JSON.stringify(listState)));
        return item;
      }
      if (item.id == listState.id) {
        item.position = list.position;
        return item;
      }
      return item;
    });
    // this react magic, the board didn't want to update the state, that is why the logic was kra(, and to prevent updating state I use json
    setBoard({ ...board, lists: JSON.parse(JSON.stringify(boardLists)) });
    // post request to send to the backend
    const newLists = boardLists.reduce((accrue: any, item: any, index: number) => {
      const list = { id: item.id, position: item.position };
      accrue.push(list);
      return accrue;
    }, []);
    instance.put(`/board/${boardId}/list`, newLists);
  }
  return (
    <div className="wrapper">
      <div
        draggable
        onDragStart={(event) => handleListDragStart(event)}
        onDragLeave={(event) => handleListDragLeave(event)}
        onDragOver={(event) => handleListDragOver(event)}
        onDragEnd={(event) => handleListDragEnd(event)}
        onDrop={(event) => handleListDrop(event)}
        onMouseMove={handleMouseMoveOnList}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="list"
        data-list-id={list.id}
      >
        <h5 className="list__title">{listState.title}</h5>
        {listCards
          .sort((secondCard, firstCard) => {
            return secondCard.position - firstCard.position;
          })
          .map(function (card: any, index: any) {
            return (
              <Card
                key={card.id}
                list={listState}
                title={card.title}
                card={card}
                styles={
                  card.isPlaceholder
                    ? {
                        padding: '15px',
                        background: 'grey',
                        border: '1px solid black',
                        pointerEvents: 'none',
                      }
                    : {}
                }
                handleMouseDown={handleMouseDown}
              />
            );
          })}
        <AddCardButton
          listState={listState}
          listId={list.id}
          cardsState={listCards}
          setCardsState={setListCards}
          boardId={boardId}
        ></AddCardButton>
      </div>
    </div>
  );
};

export default List;
