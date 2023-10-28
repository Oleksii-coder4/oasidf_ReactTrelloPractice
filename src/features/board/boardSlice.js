import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../api/request';

export const getBoardData = createAsyncThunk('board/getBoardData', async (boardId) => {
  try {
    const response = await instance.get(`/board/${boardId}`);
    const board = JSON.parse(JSON.stringify(response));
    return board;
  } catch (error) {
    return error;
  }
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
  reducers: {
    setBoardLists(state, action) {
      state.board.lists = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getBoardData.fulfilled, (state, action) => {
      const board = JSON.parse(JSON.stringify(action.payload));
      state.board = board;
    });
  },
});
export const { setBoardLists } = boardSlice.actions;
export const getBoard = (state) => state.board.board;
export default boardSlice.reducer;
