import { configureStore } from '@reduxjs/toolkit';
import selectReducer from '../Select/Select.ducks';

export const store = configureStore({
  reducer: {
    select: selectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;