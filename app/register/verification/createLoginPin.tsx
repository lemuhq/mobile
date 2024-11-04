import {
	View,
	Text,
	SafeAreaView,
	Platform,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PinInputSheet from "@/components/PinInputSheet";
import { ThemeContext } from "@/provider/ThemeProvider";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SuccessScreenItem from "@/components/SuccessScreenItem";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { useCreateNewUserMutation } from "@/redux/services/auth";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import VerificationSuccess from "@/components/VerificationSuccessScreen";
import { saveLockKey } from "@/helpers/token";

export default function CreateLoginPin() {
	const paramsData: {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		bvn: string;
		identityType: "BVN";
		identityNumber: string;
		identityId: string;
		otp: string;
		password: string;
		transactionPin: string;
	} = useLocalSearchParams();
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [pin, setPin] = useState<number[]>([]);
	// const [isSuccess, setIsSuccess] = useState<boolean>(false);
	console.log("🚀 ~ CreateLoginPin ~ paramsData:", paramsData);

	const [createNewUser, { isLoading, isSuccess: verificationSuccess }] =
		useCreateNewUserMutation();

	async function handleCreateUser() {
		const userData = { ...paramsData, lockPin: pin.join("") };
		console.log("🚀 ~ handleCreateUser ~ data:", userData);

		try {
			const { data, error } = await createNewUser({
				phoneNumber: userData.phoneNumber,
				emailAddress: "jkwaltomayi@gmail.com",
				identityType: "BVN",
				identityNumber: userData.identityNumber,
				identityId: userData.identityId,
				otp: userData.otp,
				password: userData.password,
				transactionPin: userData.transactionPin,
				lockPin: userData.lockPin,
			});

			if (error) {
				console.log("��� ~ handleCreateUser ~ error:", error);
				return;
			}
			console.log("🚀 ~ handleCreateUser ~ data:", data);

			saveLockKey(userData?.lockPin);
		} catch (err) {
			console.log("��� ~ handleCreateUser ~ err:", err);
		}
	}

	useEffect(() => {
		if (pin.length === 4) {
			handleCreateUser();
		}
	}, [pin]);

	return (
		<>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			{verificationSuccess && <VerificationSuccess />}
			{isLoading && (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(0,0,0,.5)",
						position: "absolute",
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						zIndex: 80,
					}}
				>
					<View
						style={{
							width: wp("20%"),
							height: hp("10%"),
							backgroundColor: theme.background,
							alignItems: "center",
							borderRadius: wp("2%"),
							justifyContent: "center",
						}}
					>
						<ActivityIndicator color={Colors.orange} size={"large"} />
					</View>
				</View>
			)}
			{/* {isSuccess && (
				<SuccessScreenItem
					header="Login Pin Set"
					subHeader="Congratulations. You can now sign into your account with your passcode."
				/>
			)} */}
			{!verificationSuccess && (
				<SafeAreaView
					style={[
						{
							flex: 1,
							backgroundColor: theme.background,
							paddingTop:
								Platform.OS === "android" ? SPACING.space_30 : 0,
							paddingBottom:
								Platform.OS === "android" ? SPACING.space_10 : 0,
						},
					]}
				>
					<StatusBar style={isDarkMode ? "light" : "dark"} />
					<View
						style={{
							// paddingVertical: SPACING.space_10,
							flex: 1,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingHorizontal: SPACING.space_20,
								marginBottom: SPACING.space_20,
							}}
						>
							<TouchableOpacity onPress={() => router.back()}>
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
									fontSize: FONTSIZE.size_20,
								}}
							>
								<Text style={{ fontFamily: "PoppinsSemiBold" }}>
									Step 5/
								</Text>
								5
							</Text>
						</View>
						<PinInputSheet
							header="Create Login Pin"
							subheader="Create a 6 digit pin to Login"
							pin={pin}
							setPin={setPin}
							pinCount={4}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
}
