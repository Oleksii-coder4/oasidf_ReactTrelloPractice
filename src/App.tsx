import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './pages/Board/components/Board/Board';
import Home from './pages/Home/components/Home/Home';
import instance from './api/request'
import { api } from './common/constants';
import axios from 'axios';

// import dotenv from 'dotenv';
// dotenv.config();

function App() {
  const [items, setItems] = useState([])
  // ---------
  useEffect(()=> {
    async function fetchData() {
      let response = await instance.get('board')
      console.dir(response.status,' response ' + response)
    }
    fetchData()
  },[])
  // ----------
  const [board, setBoard] = useState({
    title: 'Моя тестова дошка',
    lists: [
      {
        id: 1,
        title: 'Плани',
        cards: [
          { id: 1, title: 'помити кота' },
          { id: 2, title: 'приготувати суп' },
          { id: 3, title: 'сходити в магазин' },
        ],
      },
      {
        id: 2,
        title: 'В процесі',
        cards: [{ id: 4, title: 'подивитися серіал' }],
      },
      {
        id: 3,
        title: 'Зроблено',
        cards: [
          { id: 5, title: 'зробити домашку' },
          { id: 6, title: 'погуляти з собакой' },
        ],
      },
    ],
  });
  const [boards, setBoards] = useState([
    { id: 1, title: 'покупки', custom: { background: 'red' } },
    { id: 2, title: 'підготовка до весілля', custom: { background: 'green' } },
    { id: 3, title: 'розробка інтернет-магазину', custom: { background: 'blue' } },
    { id: 4, title: 'курс по просуванню у соцмережах', custom: { background: 'grey' } },
    { id: 5, title: 'курс по просуванню у соцмережах', custom: { background: 'grey' } },
    { id: 6, title: 'курс по просуванню у соцмережах', custom: { background: 'grey' } },
    { id: 7, title: 'курс по просуванню у соцмережах', custom: { background: 'grey' } },
    { id: 8, title: 'курс по просуванню у соцмережах', custom: { background: 'grey' } },
  ]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home boards={boards}></Home>}></Route>
        <Route path="/board/:boardId" element={<Board board={board}></Board>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
