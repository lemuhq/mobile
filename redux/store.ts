import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/api";
import { authApi } from "./services/auth";

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware, authApi.middleware),
});

//This is helpful for caching
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//A slice is a piece of store state and the corresponding reducer logic to update that state. Slices are a way to organize our Redux store by breaking it down into smaller, more manageable parts.

//Reducers are like the instructions on what to do with each slice. They deine how the information in a particular slice can be updated.

//Actions are like the requests or commands you give to change a  state
