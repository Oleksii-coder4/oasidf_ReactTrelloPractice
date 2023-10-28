import React, { useEffect, useMemo, useState } from 'react';
import List from '../List/List';
import classes from './css/board.module.css';
import { Link, useParams } from 'react-router-dom';
import instance from '../../../../api/request';
import TitleInput from '../TitleInput/TitleInput';
import AddListButton from '../AddListButton/AddListButton';
import Loader from '../../../../UI/Loader/Loader';
import { useErrorBoundary } from 'react-error-boundary';
import CardModal from './CardModal/CardModal';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard, getBoardData, setBoardLists } from '../../../../features/board/boardSlice';
import DeleteBoardButton from './DeleteBoardButton/DeleteBoardButton';
import { setCardData } from '../../../../features/cardModal/cardModalVisibilitySlice';
// { board }: { board: { title: string; lists: any[] } } ??
const Board = function () {
  // проблема того что данные сохраняются в состоянии и при переходе на другую доску я по прежнему вижу пред доску
  // решение - в момент перехода на хому чистить состояние
  // была проблема с тем что когда борд попадает в сорт метод, то оно его мутирует и вызывает ошибку
  // нашел вот такое примитивное решение
  // let board = JSON.parse(JSON.stringify(boardData));
  const board = useSelector(getBoard);
  const dispatch = useDispatch();
  // const [board, setBoard] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { showBoundary } = useErrorBoundary();
  useEffect(() => {
    dispatch(getBoardData(params.boardId));
  }, []);

  // async function getData() {
  //   try {
  //     let response = await instance.get(`/board/${params.boardId}`);
  //     const boardData = await JSON.parse(JSON.stringify(response));
  //     // setBoard(boardData);
  //   } catch (error) {
  //     console.error('error' + error);
  //     showBoundary(error);
  //   }
  // }
  // useEffect(() => {
  //   getData();
  // }, []);
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

  if (JSON.parse(JSON.stringify(board) === '{}')) {
    return <Loader></Loader>;
  }
  return (
    <section className={classes.boardWrapper} id="boardSection">
      <div className={classes.board} style={{ background: board.custom?.background }}>
        <div className={classes.header}>
          <nav className={classes.header__nav}>
            <Link to="/" onClick={() => {}} className={classes.header__button}>{`🏠`}</Link>
          </nav>
          <p style={{ fontWeight: 200 }}>Page Id {params.boardId}</p>
          <TitleInput board={board} boardId={params.boardId}></TitleInput>
          <DeleteBoardButton></DeleteBoardButton>
        </div>
        <div style={{ minHeight: '85vh' }}>
          <div className={classes.board_lists}>
            {[...board?.lists]
              .sort((secondList, firstList) => secondList.position - firstList.position)
              .map(function (list) {
                return <List key={list.id} list={list} />;
              })}
            <AddListButton></AddListButton>
          </div>
        </div>
        <CardModal></CardModal>
      </div>
    </section>
  );
};
export default Board;
