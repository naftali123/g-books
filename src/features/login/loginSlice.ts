import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LSWrapper } from '../utils/ls';

export interface LoginState {
  user: User;
  status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: LoginState = {
  user: {
    email: '',
    pass: ''
  },
  status: 'idle',
};

export type User = {
  email: string;
  pass: string;
}

export const counterSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>){
      state.user = action.payload;
      LSWrapper.setItem('user', state.user);
    },
    setFromCach(state){
      state.user = LSWrapper.getItem('user');
    },
    reset(state){
      localStorage.clear();
      state = initialState;
    }
  }
});

export const { reset, setUser, setFromCach } = counterSlice.actions;

export const selectUser = (state: RootState) => state.login.user;

export const selectEmail = (state: RootState) => state.login.user.email;

export const selectPass = (state: RootState) => state.login.user.pass;


export default counterSlice.reducer;
