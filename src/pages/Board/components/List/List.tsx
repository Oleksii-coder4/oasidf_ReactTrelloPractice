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
let nativeListCards: any;
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
let currentPlaceholderIndex: number;
const List = function ({ getData, cards, list, lists, boardId, board, setBoard }: list) {
  const [listCards, setListCards] = useState(cards);
  const [listState, setListState] = useState(list);
  useEffect(() => {
    setListCards(cards);
    setListState(list);
  }, [cards, list, board]);
  const [isMouseDown, setIsmMouseDown] = useState(false);
  // const [isMouseMove, setIsMouseMove] = useState<boolean>(false);
  const currentArrayRef = useRef<any>();
  const currentListRef = useRef<any>();
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
    currentCard = listCards[currentCardIndex];
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
    if (!isMouseMove) {
      console.log('move');
      isMouseMove = true;
      const droppableBelow = getElementBelow(movingElement);
      if (!droppableBelow) return;
      const listBelow = droppableBelow.closest('.list');
      if (!listBelow) return;
      tempArray = [...listCards];
      placeholder = { id: PLACEHOLDER_ID, position: currentCard.position, isPlaceholder: true };
      tempArray.splice(tempArray.length, 0, placeholder);
      tempArray.sort((second: any, first: any) => second.position - first.position);
      movingElement.style.position = 'absolute';
      movingElement.style.zIndex = '1000';
      movingElement.style.pointerEvents = 'none'; // to provide mouse event, card is below the cursor that is why the event does not work
      movingElement.style.transform = 'rotate(3deg)';
      movingElement.style.boxShadow =
        ' rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset';
      // for mouseMoveOnList, to trigger list change, state don't update in time
      currentArrayRef.current = tempArray;
      setListCards(JSON.parse(JSON.stringify(tempArray)));
      setListState({ ...listState, cards: [...tempArray] });
    }
  }

  function handleMouseLeave(event: any) {
    if (!tempArray) return;
    const tempListState = listState;
    // it needs to --position cards normally in the mouse enter event
    tempListState.cards.sort((secondCard: any, firstCard: any) => secondCard.position - firstCard.position);
    forsakenList = tempListState;
  }
  // delete placeholder from previous list
  function handleMouseEnter(event: any) {
    if (!tempArray) return;
    // if none placeholder don't delete anything, because it will delete cards without it
    let isPlaceholder = forsakenList.cards.find((item: any) => item.id === PLACEHOLDER_ID);
    if (!isPlaceholder) return;
    if (forsakenList == listState) return;
    tempList = listState;
    tempArray = JSON.parse(JSON.stringify(listCards));
    console.log('forsakenList');
    console.log(forsakenList);
    currentPlaceholderIndex = forsakenList.cards.findIndex((item: any) => item.id === PLACEHOLDER_ID);
    console.log('currentPlaceholderIndex');
    console.log(currentPlaceholderIndex);
    placeholder = { ...placeholder, position: tempArray.length + 1 };
    currentCard.position = tempArray.length + 1;
    tempArray.splice(tempArray.length - 1, 0, placeholder);
    forsakenList.cards = forsakenList.cards.map((item: any, index: number) => {
      if (index >= currentPlaceholderIndex) {
        item.position -= 1;
        return item;
      }
      return item;
    });
    // delete placeholder
    forsakenList.cards.splice(currentPlaceholderIndex, 1);
    // add placeholder to new listState
    const boardLists = JSON.parse(JSON.stringify(board.lists));
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
    console.log('there');
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
    // replace placeholder to another array
    // isOnList is there because sometimes the state don't update in time
    // this logic kra the code
    const rect = cardBelow.getBoundingClientRect();
    const yPosition = event.clientY - rect.top;
    if (yPosition > rect.height) return;
    // find index
    const cardIndex = tempArray.findIndex((item: any) => item.id == card.id);
    const placeholderIndex = tempArray.findIndex((item: any) => item.id === PLACEHOLDER_ID);
    // update cardPosition
    const cardPosition = tempArray[cardIndex].position;
    const newPosition = tempArray[placeholderIndex].position;
    tempArray[placeholderIndex].position = cardPosition;
    currentCard.position = cardPosition;
    tempArray[cardIndex].position = newPosition;
    setListCards(tempArray);
    setListState({ ...listState, cards: [...tempArray] });
    currentArrayRef.current = tempArray;
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
    console.log('up');
    //reset isOnList
    const currentArray = [...tempArray];
    const isOnCurrentList = currentArray.find((item: any) => item.id == currentCard.id);
    const placeholderIndex = currentArray.findIndex((item: any) => item.id === PLACEHOLDER_ID);
    if (isOnCurrentList) {
      currentArray.splice(placeholderIndex, 1);
    } else {
      // kra kra logic, change to normal, take data from board lists
      const movingCardIndex = startList.cards.findIndex((item: any) => item.id === currentCard.id);
      startList.cards.splice(movingCardIndex, 1);
      currentArray.splice(placeholderIndex, 1, currentCard);
    }
    let boardLists = JSON.parse(JSON.stringify(board.lists));
    boardLists = boardLists.map((item: any) => {
      if (item.id == startList.id) {
        return startList;
      }
      if (item.id == tempList.id) {
        return { ...tempList, cards: currentArray };
      }
      return item;
    });
    setBoard({ ...board, lists: boardLists });
    // console.log(boardLists)[{ id: 1, position: 3, list_id: 2 }];
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
    // instance.put();
    //reset
    isMouseMove = false;
    setIsmMouseDown(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    movingElement.style.position = 'unset';
    movingElement.style.zIndex = '1';
    movingElement.style.pointerEvents = 'all';
    movingElement.style.transform = 'rotate(0deg)';
    movingElement.style.boxShadow = 'none';
    movingElement = null;
    tempArray = null;
    // currentCard = null;
    // currentList = null;
  }
  function handleMouseUpOnList(event: any) {}
  return (
    <div className="wrapper">
      <div
        onMouseUp={handleMouseUpOnList}
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
          cardsState={listCards}
          setCardsState={setListCards}
          getData={getData}
          boardId={boardId}
        ></AddCardButton>
      </div>
    </div>
  );
};

export default List;
