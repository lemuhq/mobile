import { View, Text, Platform, TouchableOpacity } from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import { fontSizes, SCREEN_WIDTH, statusBarHeight } from "@/constants";
import { SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import PinInputSheet from "@/components/PinInputSheet";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setOnboardingData } from "@/redux/slice/onboarding.slice";
import { router } from "expo-router";

const CreateLoginPinScreen: FC = () => {
	const { theme } = useContext(ThemeContext);
	const [pin, setPin] = useState<number[]>([]);
	const [confirmPin, setConfirmPin] = useState<number[]>([]);
	const [isPinConfirmation, setIsPinConfirmation] = useState(false);
	const KEYBOARD_VERTICAL_OFFSET = Platform.OS === "android" ? 10 : 20;
	const onboardingData:any = useSelector((state: RootState) => state.onboarding.value);
	const dispatch = useDispatch();

	function handlePinSet() {
		if (pin.length === 4) {
			if (!isPinConfirmation) {
				setIsPinConfirmation(true);
				return;
			}
			
			// Check if pins match
			if (pin.join('') === confirmPin.join('')) {
				const newOnboardingData = {...onboardingData};
				newOnboardingData.loginPin = pin.join('');
				dispatch(setOnboardingData(newOnboardingData));
				console.log("🚀 ~ handlePinSet ~ newOnboardingData:", newOnboardingData);
				router.navigate('/register/transactionPin');
			} else {
				// Reset both pins if they don't match
				setPin([]);
				setConfirmPin([]);
				setIsPinConfirmation(false);
			}
		}
	}

	useEffect(() => {
		if (isPinConfirmation) {
			if (confirmPin.length === 4) {
				handlePinSet();
			}
		} else if (pin.length === 4) {
			handlePinSet();
		}
	}, [pin, confirmPin]);

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
					onPress={() => {
						if (isPinConfirmation) {
							setIsPinConfirmation(false);
							setConfirmPin([]);
							setPin([]);
						} else {
							router.back();
						}
					}}
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
				header={isPinConfirmation ? "Confirm Login Pin" : "Create Login Pin"}
				subheader={isPinConfirmation ? "Re-enter your 4 digit pin" : "Create a 4 digit pin to Login"}
				pin={isPinConfirmation ? confirmPin : pin}
				setPin={isPinConfirmation ? setConfirmPin : setPin}
				pinCount={4}
				
			/>
		</View>
	);
};

export default CreateLoginPinScreen;
