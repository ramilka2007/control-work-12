import { createSlice } from '@reduxjs/toolkit';
import { googleLogin, login, register } from './usersThunk';
import { GlobalError, User, ValidationError } from '../../types';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, { payload: user }) => {
        state.user = user;
      })
      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerError = error || null;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, { payload: user }) => {
        state.user = user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(googleLogin.pending, (state) => {
        state.loginError = null;
      })
      .addCase(googleLogin.fulfilled, (state, { payload: user }) => {
        state.user = user;
      })
      .addCase(googleLogin.rejected, (state, { payload: error }) => {
        state.loginError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterError: (state) => state.registerError,
    selectLoginError: (state) => state.loginError,
  },
});

export const usersReducer = usersSlice.reducer;

export const { unsetUser } = usersSlice.actions;

export const { selectUser, selectRegisterError, selectLoginError } =
  usersSlice.selectors;
