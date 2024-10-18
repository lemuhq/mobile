import AsyncStorage from "@react-native-async-storage/async-storage";

async function getCurrentUserToken() {
	const token = await AsyncStorage.getItem("authToken");

	if (token) return token;

	return null;
}

export { getCurrentUserToken };
