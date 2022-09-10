import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CounterStateType = {
  value: number
}

const initialState: CounterStateType = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const actions = counterSlice.actions;

export default counterSlice.reducer;