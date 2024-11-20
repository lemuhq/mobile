import useToast from "./useToast";
import * as Clipboard from "expo-clipboard";

const useCopyToClipboard = () => {
	const { showCustomToast } = useToast();

	const handleCopyText = async (text: string) => {
		await Clipboard.setStringAsync(text);
		showCustomToast("success", "Copied successfully");
	};

	return {
		handleCopyText,
	};
};

export default useCopyToClipboard;
