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
const Home = function () {
  const [boards, setBoards] = useState<any>();
  //for modal
  const [active, setActive] = useState(false);
  const { showBoundary } = useErrorBoundary();
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
  return (
    <div>
      {boards ? (
        <div>
          <div className={classes.body}>
            <div className={classes.header}>
              <h1 className={classes.header__title}>Home Page</h1>
            </div>
            <div className={classes.home}>
              <section className={classes.home__wrapper}>
                <button className={classes.home__add_button} onClick={(event) => setActive(true)}>
                  Make new board
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
                  <h1 style={{ color: 'black' }}>Нема бордів</h1>
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
