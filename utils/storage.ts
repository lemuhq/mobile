import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const storage = {
	async setToken(token: string) {
		try {
			await AsyncStorage.setItem("lemuToken", token);
		} catch (error) {
			console.error("Error saving token:", error);
		}
	},

	async getToken() {
		try {
			const token = await AsyncStorage.getItem("lemuToken");
			return token;
		} catch (error) {
			console.error("Error getting token:", error);
			return null;
		}
	},

	async clearToken() {
		try {
			await AsyncStorage.removeItem("lemuToken");
		} catch (error) {
			console.error("Error clearing token:", error);
		}
	},

	async saveLockPin(lockPin: string) {
		try {
			await AsyncStorage.setItem("lemuLockPin", lockPin);
		} catch (error) {
			console.error("Error saving lock pin:", error);
		}
	},

	async getLockPin() {
		try {
			return await AsyncStorage.getItem("lemuLockPin");
		} catch (error) {
			console.error("Error getting lock pin:", error);
			return null;
		}
	},

	async saveUserFirstName(firstName: string) {
		try {
			await AsyncStorage.setItem("lemuFirstName", firstName);
		} catch (error) {
			console.error("Error saving user first name:", error);
		}
	},

	async getUserFirstName() {
		try {
			return await AsyncStorage.getItem("lemuFirstName");
		} catch (error) {
			console.error("Error getting user first name:", error);
			return null;
		}
	},

	async saveUserToken(key: string, value: string) {
		await SecureStore.setItemAsync(key, value);
	},

	async saveRefreshToken(key: string, value: string) {
		await SecureStore.setItemAsync(key, value);
	},
	async getUserToken(key: string) {
		return await SecureStore.getItemAsync(key);
	},

	async getRefreshToken(key: string) {
		return await SecureStore.getItemAsync(key);
	},
};
