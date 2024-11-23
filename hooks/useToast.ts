import React from "react";
import Toast from "react-native-toast-message";

const useToast = () => {
	const showCustomToast = (
		type: "success" | "error" | "info",
		message: string
	) => {
		Toast.show({
			type: type,
			text1: message,
		});
	};

	return { showCustomToast };
};

export default useToast;
