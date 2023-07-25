import React from 'react';
import './css/HomeBoard.css';
const HomeBoard = function ({ id, title, background }: { id: number; title: string; background?: string }) {
  return (
    <div className="HomeBoard" style={{ background: `${background}` }}>
      <p className="HomeBoard__title">{title}</p>
    </div>
  );
};
export default HomeBoard;
