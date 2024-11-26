import { View, Text, Platform, TouchableOpacity } from "react-native";
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
} from "react";
import Button from "@/components/Button";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import { SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import PinInputSheet from "@/components/PinInputSheet";
import { Ionicons } from "@expo/vector-icons";

const CreateLoginPinScreen: FC<{
	next: () => void;
	prev: () => void;
	pin: number[];
	onChangePin: Dispatch<SetStateAction<number[]>>;
}> = ({ next, prev, pin, onChangePin }) => {
	const { theme } = useContext(ThemeContext);
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "android" ? 10 : 20;

	function handlePinSet() {
		if (pin.length === 4) {
			next();
		}
	}

	useEffect(() => {
		if (pin.length === 4) {
			handlePinSet();
		}
	}, [pin]);
	return (
		<View
			style={{
				backgroundColor: theme.background,
				flexGrow: 1,
				width: SCREEN_WIDTH,
				paddingTop: statusBarHeight + 20,
				paddingBottom: statusBarHeight - 20,
				paddingHorizontal: SPACING.space_20,
				gap: 10,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					onPress={() => prev()}
					style={{ width: 30, height: 30 }}
				>
					<Ionicons
						name="arrow-back-outline"
						size={30}
						color={theme.text}
					/>
				</TouchableOpacity>

				<Text
					style={{
						color: theme.text,
						fontFamily: "PoppinsLight",
						fontSize: fontSizes.FONT20,
					}}
				>
					<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 6/</Text>6
				</Text>
			</View>
			<PinInputSheet
				header="Create Login Pin"
				subheader="Create a 4 digit pin to Login"
				pin={pin}
				setPin={onChangePin}
				pinCount={4}
			/>
		</View>
	);
};

export default CreateLoginPinScreen;
