import AsyncStorage from "@react-native-async-storage/async-storage";

async function getCurrentUserToken() {
	const token = await AsyncStorage.getItem("authToken");

	if (token) return token;

	return null;
}

async function saveLockKey(token: string) {
	const jsonValue = JSON.stringify(token);
	await AsyncStorage.setItem("lemu-lock", jsonValue);
}

export { getCurrentUserToken, saveLockKey };
