import React, { useEffect, useState } from 'react';
import './css/card.css';
import CardsPlaceholder from './CardsPlaceholder/CardsPlaceholder';
import ReactDOM from 'react-dom';
interface card {
  title: string;
  listState: any;
  setListState: any;
  card: any;
  listCards: any;
  setListCards: any;
  styles: any;
  // handleMouseDown: any;
  // isMoveStart: any;
}
//for drag n drop
// let isDragStarted: any;
// let movingElement: any;
// let xPos: any;
// let yPos: any;
// let elementBelow: any;
// let currentDroppable: any;
//--------------
let movingElement: any;
let currentCard: any;
let placeholder: any;
let isDragStart: any;
let xPosition: any;
let yPosition: any;
let newList: any;
let cardBelow: any;
const Card = function ({ title, listState, setListState, card, listCards, setListCards, styles }: card) {
  const [someState, setSomeState] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  useEffect(() => {
    if (isMouseDown) {
      document.addEventListener('mousemove', handleMouseMove);
      movingElement.onmouseup = onMouseUpHandler;
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('onmouseup', onMouseUpHandler);
    };
  }, [isMouseDown]);

  function mouseDownHandler(event: any) {
    event.preventDefault();
    movingElement = event.target;
    console.log(movingElement);
    currentCard = card;
    xPosition = event.clientX - event.target.getBoundingClientRect().left;
    yPosition = event.clientY - event.target.getBoundingClientRect().top;
    setIsMouseDown(true); // set mouse down to provide addEventListener
  }
  function getElementBelow(movingElement: any) {
    const rect = movingElement.getBoundingClientRect();
    let cords = {
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    };
    movingElement.style.display = 'none';
    let elementBelow = document.elementFromPoint(cords.left, cords.top);
    movingElement.style.display = 'flex';
    return elementBelow;
  }
  // v2
  function handleMouseMove(event: any) {
    if (!isDragStart) {
      isDragStart = true;
      movingElement.style.position = 'absolute';
      movingElement.style.zIndex = 1000;
      let tempArray = JSON.parse(JSON.stringify(listCards));
      let index = tempArray.findIndex((item: any) => {
        return item.id === card.id;
      });
      placeholder = { id: tempArray[index].id + 1, position: tempArray[index].position, isPlaceholder: true };
      tempArray.splice(index, 0, placeholder);
      newList = tempArray;
      setListCards(newList);
    }
    if (movingElement) {
      moveCard(event);
      cardBelow = getElementBelow(movingElement);
      let droppableBelow: any;
      if (cardBelow) {
        droppableBelow = cardBelow.closest('.card');
      }
      let cardId: any;
      let card: any;
      if (droppableBelow) {
        cardId = droppableBelow.getAttribute('data-card-id');
        card = listCards.find((item: any) => {
          return item.id == cardId;
        });
      }
      if (!card) return;
      if (card) {
        event.preventDefault();
        const rect = droppableBelow.getBoundingClientRect();
        const xPosition = event.clientX - rect.left;
        const yPosition = event.clientY - rect.top;
        if (yPosition < rect.height) {
          // one is number another string
          if (placeholder.id != card.id) {
            console.log(card);
            let tempCard = JSON.parse(JSON.stringify(card));
            let tempArray = JSON.parse(JSON.stringify(newList));
            console.log('card');
            console.log(card);
            console.log(tempArray);
            let cardIndex = tempArray.findIndex((item: any) => {
              return item.id === tempCard.id;
            });
            console.log('start');
            let placeholderIndex = tempArray.findIndex((item: any) => {
              return item.id === placeholder.id;
            });
            let movingElementIndex = tempArray.findIndex((item: any) => {
              return item.id === currentCard.id;
            });
            console.log('index +' + movingElementIndex);
            // tempArray[cardIndex].position = tempArray[placeholderIndex].position;
            // tempArray[placeholderIndex].position = tempCard.position;
            // change position
            const newPosition = tempArray[placeholderIndex].position;
            tempArray[placeholderIndex].position = tempCard.position;
            tempArray[movingElementIndex].position = tempCard.position;
            tempArray[cardIndex].position = newPosition;
            console.log(tempArray);
            newList = tempArray;
            setListCards(tempArray);
          }
        }
      }
    }
  }
  // v2
  function moveCard(event: any) {
    movingElement.style.left = event.clientX - xPosition + 'px';
    movingElement.style.top = event.clientY - yPosition + 'px';
  }

  function onMouseUpHandler() {
    console.log('up');
    isDragStart = false;
    setIsMouseDown(false);
    movingElement = null;
    document.removeEventListener('mousemove', handleMouseMove);
  }
  // const dragStartHandler = function (event: any, card: any, list: any) {
  //   // // Create a custom drag image element (div)
  //   // const dragImage = document.createElement('div');
  //   // dragImage.textContent = 'Custom Drag Image'; // You can set any content you like
  //   // dragImage.style.width = '100px';
  //   // dragImage.style.height = '100px';
  //   // dragImage.style.backgroundColor = 'lightblue';
  //   // dragImage.style.cursor = 'grabbing'; // Set the cursor style while dragging
  //   // // Set the custom drag image using the setDragImage method
  //   // event.dataTransfer.setDragImage(dragImage, 0, 0);
  //   // setCurrentCard(card);
  //   // setCurrentList(list);
  //   return false;
  // };
  // const dragOverHandler = function (event: any, card: any, list: any) {
  //   event.preventDefault();
  //   // if (event.target.className === 'card') {
  //   //   const rect = event.card.getBoundingClientRect();
  //   //   const yPosition = event.clientY - rect.top;
  //   //   const cardHeight = rect.height;
  //   //   if (yPosition < cardHeight / 2) {
  //   //     setElementIsAbove(true);
  //   //   } else if (yPosition > cardHeight / 2) {
  //   //     setElementIsBelow(true);
  //   //   }
  //   // }
  //   //----------------------------
  //   if (movingElement) {
  //     moveCard(xPosition, yPosition, event);

  //     elementBelow = getElementBelow(movingElement);
  //     if (!elementBelow) return;
  //     let droppableBelow = elementBelow.closest('.card');
  //     if (currentDroppable !== droppableBelow) {
  //       currentDroppable = droppableBelow;
  //       console.log(currentDroppable);
  //       if (currentDroppable) {
  //         if (isAbove(movingElement, currentDroppable)) {
  //           // set new position
  //           // let array = JSON.parse(JSON.stringify(cardsState));
  //           // array.findIndex((item: any) => {
  //           //   if (true) {
  //           //   }
  //           // });
  //           setElementIsAbove(true);
  //           // setCardsState({ ...cardsState });
  //         } else {
  //           setElementIsBelow(true);
  //           //set new position
  //         }
  //       }
  //     }
  //   }
  // };

  // const dragLeaveHandler = function (event: any) {};
  // const dragEndHandler = function (event: any) {};
  // const dragDropHandler = function (event: any, card: any, list: any) {
  //   event.preventDefault();
  // };
  // return (
  //   <div>
  //     {isDragStart && <CardsPlaceholder />}
  //     {elementIsBelow && <CardsPlaceholder />}
  //     <div
  //       draggable={true}
  //       onMouseDown={(event) => mouseDownHandler(event)}
  //       onMouseUp={(event) => onMouseUpHandler()}
  //       // style={{ position: 'relative' }}
  //       className={`card`}
  //       // style={{ position: 'relative', zIndex: '3', width: '100%', margin: '0' }}
  //       // onMouseMove={(event) => mouseMoveHandler(event, currentCard, positions.xPosition, positions.yPosition)}
  //       onDragStart={(event) => dragStartHandler(event, card, listState)}
  //       onDragOver={(event) => dragOverHandler(event, card, listState)} //card list
  //       // onDragLeave={(event) => dragLeaveHandler(event)}
  //       // onDragStart={(event) => dragStartHandler(event, cardState, listState)}
  //       // onDragEnd={(event) => dragEndHandler(event)}
  //       // onDrop={(event) => dragDropHandler(event, cardState, listState)}
  //     >
  //       <p className="card__text">{title}</p>
  //     </div>
  //     {elementIsAbove && <CardsPlaceholder />}
  //   </div>
  // );
  //-------------------------------------------------------------
  function handleDragStart(event: any, card: any, list: any) {
    event.preventDefault();
    // event.preventDefault();
    // movingElement = event.target;
    // currentCard = card;
    // xPosition = event.clientX - event.target.getBoundingClientRect().left;
    // yPosition = event.clientY - event.target.getBoundingClientRect().top;
    // // event.dataTransfer.setData('text/plain', JSON.stringify(currentCard));
    // console.log(card);
    // let tempArray = JSON.parse(JSON.stringify(cardsState));
    // let index = tempArray.findIndex((item: any) => {
    //   return item.id === card.id;
    // });
    // placeholder = { id: tempArray[index].id, position: tempArray[index].position };
    // tempArray.splice(index, 0, placeholder);
    // setCardsState(tempArray);
    // return false;
  }
  function handleDragOver(event: any, card: any) {
    event.preventDefault();
    console.log('dragOver');
    cardBelow = card;
    // event.preventDefault();
    // const rect = event.target.getBoundingClientRect();
    // const xPosition = event.clientX - rect.left;
    // const yPosition = event.clientY - rect.top;
    // if (yPosition < rect.height / 2) {
    //   if (placeholder.id !== card.id) {
    //     //above
    //     let tempCard = JSON.parse(JSON.stringify(card));
    //     let tempArray = JSON.parse(JSON.stringify(cardsState));
    //     // replace positions
    //     let cardIndex = tempArray.findIndex((item: any) => {
    //       return item.id === tempCard.id;
    //     });
    //     let placeholderIndex = tempArray.findIndex((item: any) => {
    //       return item.id === placeholder.id;
    //     });
    //     tempArray[cardIndex].position = tempArray[placeholderIndex].position;
    //     tempArray[placeholderIndex].position = card.position;
    //     console.log(tempArray);
    //     setCardsState(tempArray);
    //   }
    // }
  }
  // function handleDragOver(event: any, card: any) {
  //   console.log('dragOver');
  //   event.preventDefault();

  //   const rect = event.target.getBoundingClientRect();
  //   const yPosition = event.clientY - rect.top;

  //   // You can introduce a threshold to handle the case when the cursor is near the top/bottom of the card.
  //   const threshold = rect.height / 2;
  //   if (yPosition < threshold) {
  //     // above
  //     if (placeholder.id !== card.id) {
  //       // Swap positions only when hovering over a different card
  //       // let tempCard = { ...card };
  //       let tempCard = JSON.parse(JSON.stringify(card));
  //       // let tempArray = [...cardsState];
  //       let tempArray = JSON.parse(JSON.stringify(cardsState));

  //       const cardIndex = tempArray.findIndex((item: any) => item.id === tempCard.id);
  //       const placeholderIndex = tempArray.findIndex((item: any) => item.id === placeholder.id);

  //       // Swap positions in the array
  //       // [tempArray[cardIndex].position, tempArray[placeholderIndex].position] = [
  //       //   tempArray[placeholderIndex].position,
  //       //   tempArray[cardIndex].position,
  //       // ];
  //       tempArray[cardIndex].position = tempArray[placeholderIndex].position;
  //       tempArray[placeholderIndex].position = tempCard.position;
  //       setCardsState(tempArray);
  //     }
  //   }
  // }

  return (
    // <div>
    <div
      style={styles}
      data-card-id={card.id}
      className={`card`}
      draggable={true}
      onDragStart={(event) => handleDragStart(event, card, listState)}
      onDragOver={(event) => handleDragOver(event, card)}
      onMouseDown={(event) => mouseDownHandler(event)}
    >
      <p className="card__text">{title}</p>
    </div>
    // </div>
  );
};
export default Card;
