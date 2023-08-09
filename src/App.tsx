import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './pages/Board/components/Board/Board';
import Home from './pages/Home/components/Home/Home';
import instance from './api/request';
import { api } from './common/constants';
import axios from 'axios';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackError from './UI/FallbackError/FallbackError';
// import dotenv from 'dotenv';
// dotenv.config();

// описать нормально сигнатуры typescript
// убрать body
// добавить trim в проверку отправки title

function App() {
  return (
    <ErrorBoundary FallbackComponent={FallbackError}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary FallbackComponent={FallbackError}>
                {' '}
                <Home></Home>{' '}
              </ErrorBoundary>
            }
          ></Route>
          <Route
            path="/board/:boardId"
            element={
              <ErrorBoundary FallbackComponent={FallbackError}>
                {' '}
                <Board></Board>{' '}
              </ErrorBoundary>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
