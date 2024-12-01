import { View, Text, Platform, TouchableOpacity } from "react-native";
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import { SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import PinInputSheet from "@/components/PinInputSheet";
import SuccessScreenModal from "@/components/modals/SuccessScreenModal";
import { ModalContext } from "@/provider/ModalProvider";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
	setFirstTimeOnboardingData,
	setSecondTimeOnboardingData,
} from "@/redux/slice/onboarding.slice";

const CreateTransactionPinScreen = () => {
	//Redux
	const dispatch = useDispatch();
	const { firstTimeUser, secondTimeUser, userStage } = useSelector(
		(state: RootState) => state.onboarding
	);

	const { theme, isDarkMode } = useContext(ThemeContext);
	const { successScreenVisible, toggleSuccessScreen } =
		useContext(ModalContext);
	const [isSuccess, setIsSuccess] = useState(false);
	const [pin, onChangePin] = useState<number[]>([]);

	function handlePinSet() {
		if (pin.length === 6) {
			if (userStage === 1) {
				const newUserData = {
					...firstTimeUser,
					transactionPin: pin.join(""),
				};

				dispatch(setFirstTimeOnboardingData(newUserData));
				router.navigate("/register/createLoginPin");
				return;
			}

			if (userStage === 2) {
				const newUserData = {
					...secondTimeUser,
					transactionPin: pin.join(""),
				};

				dispatch(setSecondTimeOnboardingData(newUserData));
				router.navigate("/register/createLoginPin");
				return;
			}
		}
	}

	useEffect(() => {
		if (pin.length === 6) {
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
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					onPress={() => router.back()}
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
					<Text style={{ fontFamily: "PoppinsSemiBold" }}>Step 5/</Text>6
				</Text>
			</View>
			<PinInputSheet
				header="Create Transaction Pin"
				subheader="Create a 6 digit pin for all your transactions"
				pin={pin}
				setPin={onChangePin}
				pinCount={6}
			/>
		</View>
	);
};

export default CreateTransactionPinScreen;
