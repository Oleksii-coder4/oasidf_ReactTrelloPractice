import instance from '../../../../api/request';
import React, { useEffect, useState } from 'react';
import Board from '../HomeBoard/HomeBoard';
import { Link } from 'react-router-dom';
import HomeBoard from '../HomeBoard/HomeBoard';
import Modal from '../../../../UI/Modal/Modal';
import { act } from 'react-dom/test-utils';
import classes from './css/home.module.css';
import CreateBoard from '../../CreateBoard/CreateBoard';
import Loader from '../../../../UI/Loader/Loader';
import { useErrorBoundary } from 'react-error-boundary';
interface board {
  id: number;
  title: string;
  custom: {
    background: string;
  };
}

// По идее у меня должны подгружатся данные 1-н раз и после этого мгновенно отрисовыватся при любых переходах, но каждый раз оно берет новые данные
const Home = function () {
  const [boards, setBoards] = useState<any>();
  const [active, setActive] = useState(false);
  const { showBoundary } = useErrorBoundary();

  // спроси можно ли это перенести в отдельны файл и импортировать его в нужные
  // ----------------------------------------------------------------------
  async function getData() {
    try {
      let response: any = await instance.get('/board');
      response = await JSON.parse(JSON.stringify(response));
      setBoards(response.boards);
    } catch (error) {
      console.log(error);
      showBoundary(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  // TODO
  // 1 фон бледно фиолетовый
  return (
    <div>
      {boards ? (
        <div>
          <div className={classes.body}>
            <div className={classes.header}>
              <h1 className={classes.header__title}>Домашня сторінка</h1>
            </div>
            <div className={classes.home}>
              <section className={classes.home__wrapper}>
                <button className={classes.home__add_button} onClick={() => setActive(true)}>
                  Створити нову дошку
                </button>
                <CreateBoard active={active} setActive={setActive} onCardCreated={getData}></CreateBoard>
                {boards.length > 0 ? (
                  boards.map(function (board: any, index: number) {
                    return (
                      <Link key={board.id} to={`board/${board.id}`} style={{ textDecoration: 'none' }}>
                        <HomeBoard
                          key={board.id}
                          id={board.id}
                          title={board.title}
                          background={board.custom?.background || 'rgb(0, 113, 191, 0.5)'}
                        ></HomeBoard>
                      </Link>
                    );
                  })
                ) : (
                  <h1 style={{ color: 'black' }}>Нема дошок</h1>
                )}
              </section>
            </div>
          </div>
        </div>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
};

export default Home;
