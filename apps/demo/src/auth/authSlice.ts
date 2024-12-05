import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "#/store";
import { ICurrentUser } from "#/types";

type AuthState = {
  currentUser: ICurrentUser | null;
};

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedOut: () => initialState,
  },
});

export const { loggedOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
