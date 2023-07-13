import React, { useState } from 'react';
import Board from '../HomeBoard/HomeBoard';
import './css/home.css'
import { Link } from 'react-router-dom';
import HomeBoard from '../HomeBoard/HomeBoard';
const Home = function ({boards} : {boards: [id: number, title:string, custom: {background: string}] | any}) {
  return (
    <div>
        <body>
            <header className='header'>Home Page</header>
            <main className='home'>
                <div className='home__wrapper'>
                    <button className='home__add-button'>Make new card</button>
                      {boards.map(function (board: any) {
                      return (
                        <Link to={`board/${board.id}`} style={{textDecoration: 'none'}}>
                          <HomeBoard key={board.id} id={board.id} title={board.title} background={board.custom.background}></HomeBoard>
                        </Link>
                      )
                      })}
                </div>
            </main>
        </body>

    </div>
  );
};

export default Home;
