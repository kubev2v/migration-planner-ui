import {
    combineReducers,
    configureStore,
    createListenerMiddleware,
  } from "@reduxjs/toolkit";
  import authReducer, { loggedOut } from "./auth/authSlice";
  import { useDispatch, useSelector } from "react-redux";
  import { removeToken } from "./services/localStorage";
  
  export const rootReducer = combineReducers({
    auth: authReducer,
  });
  
  const loggedOutMiddleware = createListenerMiddleware();
  
  loggedOutMiddleware.startListening({
    actionCreator: loggedOut,
    effect: async (_, listenerApi) => {
      removeToken();
      listenerApi.cancelActiveListeners();
    },
  });
  
  export type RootState = ReturnType<typeof rootReducer>;
  
  export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
      reducer: rootReducer,
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(loggedOutMiddleware.middleware)
    });
  }
  
  export type AppStore = ReturnType<typeof setupStore>;
  
  const store = setupStore();
  
  export type AppDispatch = typeof store.dispatch;
  
  export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  export const useAppSelector = useSelector.withTypes<RootState>();
  
  export default store;
  