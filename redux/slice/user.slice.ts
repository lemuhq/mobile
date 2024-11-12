import { BACKEND_URL } from "@/constants";

import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { storage } from "@/utils/storage";

interface UserSliceState {
	currentUser: User | null;
}

const initialState: UserSliceState = {
	currentUser: null,
};

export const fetchCurrentUser = async () => {
	try {
		const token = await storage.getToken();
		if (token) {
			const response = await axios.get(`${BACKEND_URL}/user/current-user`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		}
	} catch (error: any) {
		return error.response.data;
	}
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<User>) => {
			console.log("🚀 ~ action:", action);

			state.currentUser = action.payload;
		},
	},
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
