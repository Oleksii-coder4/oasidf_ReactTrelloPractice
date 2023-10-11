import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../api/request';

export const getBoardData = createAsyncThunk('board/getBoardData', async (boardId) => {
  const response = await instance.get(`/board/${boardId}`);
  console.log('response');
  console.log(response);
  return response;
});

// interface Board {
//   custom: Record<string, string>;
//   lists: Object[];
//   title: string;
//   users: Object[];
// }

// interface BoardState {
//   board: Board;
//   loading: string;
// }
//нарезать по частям (слайсам боард)

const initialState = {
  board: {},
  loading: 'idle',
};

const boardSlice = createSlice({
  name: 'board', // name of the state
  initialState, // the data which lies in the state
  reducers: {},

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getBoardData.fulfilled, (state, action) => {
      console.log('action', action, 'state', state);
      state.board = action.payload;
    });
  },
});

export const getBoard = (state) => state.board.board;

export default boardSlice.reducer;
