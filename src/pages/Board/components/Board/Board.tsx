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
import CardModal from './CardModal/CardModal';
import Modal from '../../../../UI/Modal/Modal';
// { board }: { board: { title: string; lists: any[] } } ??
const Board = function () {
  const [board, setBoard] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { showBoundary } = useErrorBoundary();

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
  if (!board) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <div className={classes.board} style={{ background: board.custom?.background }}>
        <header className={classes.header}>
          <nav className={classes.header__nav}>
            <Link to="/" className={classes.header__exit}>{`🏠`}</Link>
          </nav>
          <p style={{ fontWeight: 200 }}>Page Id {params.boardId}</p>
          <TitleInput board={board} params={params} getData={getData}></TitleInput>
        </header>
        <div style={{ minHeight: '85vh' }}>
          <div className={classes.board_lists}>
            {board.lists
              .sort((secondList: any, firstList: any) => secondList.position - firstList.position)
              .map(function (list: any) {
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
                  ></List>
                );
              })}
            <AddListButton params={params} board={board} setBoard={setBoard} getData={getData}></AddListButton>
          </div>
        </div>
        <CardModal></CardModal>
      </div>
    </div>
  );
};
export default Board;
