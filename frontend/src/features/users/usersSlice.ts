import { createSlice } from '@reduxjs/toolkit';
import { googleLogin, login, register } from './usersThunk';
import { GlobalError, User, ValidationError } from '../../types';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  googleAccount: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  googleAccount: false,
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
        state.googleAccount = false;
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
        state.googleAccount = false;
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
        state.googleAccount = false;
        state.loginError = null;
      })
      .addCase(googleLogin.fulfilled, (state, { payload: user }) => {
        state.googleAccount = true;
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
    selectGoogleAccount: (state) => state.googleAccount,
  },
});

export const usersReducer = usersSlice.reducer;

export const { unsetUser } = usersSlice.actions;

export const {
  selectUser,
  selectRegisterError,
  selectLoginError,
  selectGoogleAccount,
} = usersSlice.selectors;
