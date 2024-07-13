
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TaskType = {
    _id: string;
    title: string;
    description: string;
    status: "TODO" | "DOING" | "DONE";
    dueDate: Date;
    priority?: 1 | 2 | 3 | 4 | 5;
    createdAt: Date;
    updatedAt: Date;
}

export type TaskState = {
  tasks: TaskType[],
}

const initialState: TaskState = {
  tasks: [],
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action:PayloadAction<TaskType[]>) => {
      state.tasks = action.payload
    },
    resetTasks: (state) => {
      state.tasks = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTasks, resetTasks } = tasksSlice.actions

export default tasksSlice.reducer