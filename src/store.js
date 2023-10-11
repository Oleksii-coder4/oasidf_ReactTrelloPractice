import { configureStore } from '@reduxjs/toolkit';
import cardModalReducer from './features/cardModal/cardModalVisibilitySlice';
import boardReducer from './features/board/boardSlice';
import { useDispatch } from 'react-redux';
console.log('boardReducer!!!!!!!!!!!!!!!!!!!!!');

console.log(boardReducer);

export const store = configureStore({
  reducer: {
    cardModal: cardModalReducer,
    board: boardReducer,
  },
});

// export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
// export type RootState = ReturnType<typeof store.getState>;
