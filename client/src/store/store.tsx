import { configureStore } from '@reduxjs/toolkit';
import counter from './reducer/counter';

const store = configureStore({
  reducer: {
    counter
  },
})

export type Store = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;