import React, { ReactEventHandler, ReactNode, useEffect, useMemo, useState } from 'react';
import List from '../List/List';
import classes from './css/board.module.css';
import { Link, useParams } from 'react-router-dom';
import instance from '../../../../api/request';
import TitleInput from '../TitleInput/TitleInput';
import AddListButton from '../AddListButton/AddListButton';
import axios from '../../../../api/request';
import Loader from '../../../../UI/Loader/Loader';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import Smth from './Smth/Smth';
// { board }: { board: { title: string; lists: any[] } } ??
const Board = function () {
  const [board, setBoard] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCard, setCurrentCard] = useState({});
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [isDragStart, setIsDragStart] = useState(false);
  const [isMoveStart, setIsMoveStart] = useState(false);
  const params = useParams();
  const { showBoundary } = useErrorBoundary();
  //-------------------------------------------
  async function getData() {
    try {
      let response = await instance.get(`/board/${params.boardId}`);
      const boardData = await JSON.parse(JSON.stringify(response));
      setBoard(boardData);
    } catch (error) {
      console.error('error' + error);
      showBoundary(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  instance.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      return config;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );
  console.log(board);
  // function mouseMoveHandler(event: any, currentCard: any, xPosition: any, yPosition: any) {
  //   console.log(currentCard + 'current');
  //   if (isDragStart && currentCard) {
  //     if (!isMoveStart) {
  //       setIsMoveStart(true);
  //     }
  //     currentCard.style.border = '1px solid black';
  //     currentCard.style.position = 'absolute';
  //     currentCard.style.zIndex = 1000;
  //     moveCard(xPosition, yPosition, currentCard, event);
  //   }
  // }
  // function moveCard(xPositionCursor: any, yPositionCursor: any, currentCard: any, event: any) {
  //   currentCard.style.left = event.clientX - xPositionCursor + 'px';
  //   currentCard.style.top = event.clientY - yPositionCursor + 'px';
  // }
  if (!board) {
    return <Loader></Loader>;
  }
  return (
    <div
    // onMouseMove={(event) => {
    //   mouseMoveHandler(event, currentCard, xPosition, yPosition);
    // }}
    >
      <div className={classes.board} style={{ background: board.custom?.background }}>
        <header className={classes.header}>
          <nav className={classes.header__nav}>
            <Link to="/" className={classes.header__exit}>{`🏠`}</Link>
          </nav>
          <p style={{ fontWeight: 200 }}>Page Id {params.boardId}</p>
          <TitleInput board={board} params={params} getData={getData}></TitleInput>
        </header>
        <main style={{ minHeight: '85vh' }}>
          <div className={classes.board_lists}>
            {board.lists.map(function (list: any) {
              return (
                <List
                  key={list.id}
                  getData={getData}
                  cards={list.cards}
                  list={list}
                  lists={board.lists}
                  boardId={params.boardId}
                  board={board}
                  setBoard={setBoard}
                  // setCurrentCard={setCurrentCard} // List
                  // setIsDragStart={setIsDragStart} // in List
                  // setXPosition={setXPosition} // in List
                  // setYPosition={setYPosition} // in List
                  // isMoveStart={isMoveStart} // for Card component
                ></List>
              );
            })}
            <AddListButton params={params} board={board} setBoard={setBoard} getData={getData}></AddListButton>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Board;
