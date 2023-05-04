import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds()            // 이초간 기다리는 함수를 실행하고 이 응답을 한 이후에 동작을 수행한다.
    console.log("2초가 지났습니다. 등록합니다.", payload)
    return thunkAPI.fulfillWithValue(payload) // 청크로 엑스트라 리듀서들에게 액션 객체를 보낸다.  
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds()            // 이초간 기다리는 함수를 실행하고 이 응답을 한 이후에 동작을 수행한다.
    console.log("2초가 지났습니다. 삭제합니다." + payload)
    return thunkAPI.fulfillWithValue(payload) // 청크로 엑스트라 리듀서들에게 액션 객체를 보낸다.    
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
    },
    deleteTodo: (state, action) => {

    },
  },
  extraReducers: {
    [__addToDo.pending]: (state, action) => {
      console.log("잠시만 기다려주세요.. 2초 뒤 동작합니다.") // 통신이 진행중인 상태
    },
    [__addToDo.fulfilled]: (state, action) => {
      state.list.push(action.payload)
      console.log("등록이 완료되었습니다.")
    },
    [__deleteTodo.pending]: (state, action) => {
      console.log("잠시만 기다려주세요.. 2초 뒤 동작합니다.") // 통신이 진행중인 상태
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.list = state.list.filter((item)=>{
        return item.id !== action.payload.targetId
      })
      console.log("삭제가 완료되었습니다.", state.list)
    },
  }
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
