import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { managerAPI } from "./service.ts";

const rootReducer = combineReducers({
  [managerAPI.reducerPath]: managerAPI.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      managerAPI.middleware,
    ),
});
export default store;
