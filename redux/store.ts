import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

//Services
import { api } from "./services/api";
import { authApi } from "./services/auth";
import { userApi } from "./services/user";
import { transferApi } from "./services/transfer";

//Reducer
import userReducer from "./slice/user.slice";
import bankReducer from "./slice/transfer.slice";
import onboardingReducer from "./slice/onboarding.slice";

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[transferApi.reducerPath]: transferApi.reducer,

		user: userReducer,
		bank: bankReducer,
		onboarding: onboardingReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			api.middleware,
			authApi.middleware,
			userApi.middleware,
			transferApi.middleware
		),
});

//This is helpful for caching
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//A slice is a piece of store state and the corresponding reducer logic to update that state. Slices are a way to organize our Redux store by breaking it down into smaller, more manageable parts.

//Reducers are like the instructions on what to do with each slice. They deine how the information in a particular slice can be updated.

//Actions are like the requests or commands you give to change a  state
