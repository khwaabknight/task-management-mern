import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UserType = {
  _id: string,
  fullname: string,
  email: string,
}

export type UserState = {
  user: UserType,
  token: string | null,
}

const initialState: UserState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {
    _id: '',
    fullname: '',
    email: '',
  },
  token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<UserType>) => {
      state.user._id = action.payload._id
      state.user.email = action.payload.email
      state.user.fullname = action.payload.fullname
    },
    resetUser: (state) => {
      localStorage.removeItem('user')
      state.user = {
        _id: '',
        fullname: '',
        email: '',
      }
      state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer