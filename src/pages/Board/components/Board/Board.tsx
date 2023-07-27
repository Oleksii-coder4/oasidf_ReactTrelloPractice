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
  const [error, setError] = useState<any>();
  const params = useParams();
  const { showBoundary } = useErrorBoundary();
  async function getData() {
    try {
      let response = await instance.get(`/board/${params.boardId}`);
      const boardData = await JSON.parse(JSON.stringify(response));
      setBoard(boardData);
    } catch (error) {
      setError(error);
      console.error('error' + error);
      showBoundary(error);
    }
  }
  instance.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      return config;
    },
    (error) => {
      setError(error);
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
      setError(error);
      setIsLoading(false);
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {board ? (
        <div className={classes.board} style={{ background: board.custom?.background }}>
          <header className={classes.header}>
            <nav className={classes.header__nav}>
              <Link to="/" className={classes.header__exit}>{`🏠`}</Link>
            </nav>
            <p style={{ fontWeight: 200 }}>Page Id {params.boardId}</p>
            <TitleInput board={board} params={params} getData={getData}></TitleInput>
          </header>
          <body>
            <main>
              <div className={classes.board_lists}>
                {board.lists.map(function (list: any) {
                  return <List getData={getData} cards={list.cards} list={list} params={params}></List>;
                })}
                <AddListButton params={params} board={board} setBoard={setBoard} getData={getData}></AddListButton>
              </div>
            </main>
          </body>
        </div>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
};
export default Board;
