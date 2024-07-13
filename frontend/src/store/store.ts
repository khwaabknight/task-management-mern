import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import tasksSlice from './features/task/tasksSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    tasks: tasksSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch