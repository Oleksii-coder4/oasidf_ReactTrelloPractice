import React from 'react';
import List from '../List/List';
import './css/board.css';
import { useParams } from 'react-router-dom';
const Board = function ({ board }: { board: { title: string; lists: any[] } }) {
  const params = useParams()
  return (
    <div className="board">
      <header className="board-header">
        <nav className="board-header__nav">
          <a href="" className="board-header__exit">{`🏠`}</a>
        </nav>
        <h1>Page Id {params.boardId}</h1>
        <h1 className="board-header__title">{board.title}</h1>
      </header>
      <body>
        <main>
          <div className="board-lists">
            {board.lists.map(function (list: any) {
              return <List title={list.title} cards={list.cards}></List>;
            })}
            <button className="board-lists__button">Make Task</button>
          </div>
        </main>
      </body>
    </div>
  );
};
export default Board;
