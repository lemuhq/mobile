import AsyncStorage from "@react-native-async-storage/async-storage";

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
			return await AsyncStorage.getItem("lemuToken");
		} catch (error) {
			console.error("Error getting token:", error);
			return null;
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
};
