import {
	View,
	StyleSheet,
	Platform,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
	clearBeneficiaryUser,
	clearPaymentData,
	selectTransfer,
} from "@/redux/slice/transfer.slice";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { SPACING } from "@/constants/Theme";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ThemeContext } from "@/provider/ThemeProvider";
import PinInputSheet from "@/components/PinInputSheet";
import SuccessScreenItem from "@/components/SuccessScreenItem";
import { useTransferToBankMutation } from "@/redux/services/transfer";
import { useGetCurrentUserQuery } from "@/redux/services/auth";
import useToast from "@/hooks/useToast";
import { PaymentRequest } from "@/types/transfer";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const TransferPin = () => {
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight + 5 : 60;

	const dispacth = useDispatch();
	const { isDarkMode, theme } = useContext(ThemeContext);
	const { showCustomToast } = useToast();
	const { beneficiaryUser, paymentData } = useSelector(selectTransfer);

	//Queries and mutation
	const { data: currentUser } = useGetCurrentUserQuery();
	const [transferToBank, { isLoading, isError }] = useTransferToBankMutation();

	const [pin, setPin] = useState<number[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	console.log("🚀 ~ TransferPin ~ pin:", pin)

	async function handleTransferToBanks() {
		//Confirm if pin is correct
		if (pin.join("").toString() !== currentUser?.transactionPin) {
			showCustomToast("error", "Transaction pin is incorrect");
			return;
		}

		try {
			const data: PaymentRequest = {
				amount: paymentData?.amount,
				nameEnquiryReference: paymentData?.nameEnquiryReference || "",
				beneficiaryBankCode: paymentData?.beneficiaryBankCode || "",
				beneficiaryAccountNumber:
					paymentData?.beneficiaryAccountNumber || "",
				narration: paymentData?.narration,
			};

			const response = await transferToBank(data);

			if (response?.data?.statusCode === 200) {
				console.log(
					"🚀 ~ handleTransferToBanks ~ response success:",
					response
				);
				setIsSuccess(true);
				return;
			}

			if (response?.data?.responseCode === "51") {
				showCustomToast("error", response?.data?.message);
				return;
			}
			console.log("🚀 ~ handleTransferToBanks ~ response fail:", response);
			showCustomToast("error", "Failed to transfer funds");
		} catch (error) {
			console.log("🚀 ~ handleTransferToBanks ~ error:", error);
		}
	}

	useEffect(() => {
		if (pin.length === 6) {
			handleTransferToBanks();
		}
	}, [pin]);

	return (
		<>
			<StatusBar style={isDarkMode ? "light" : "dark"} />
			{isSuccess && (
				<SuccessScreenItem
					header="Successful"
					subHeader={`You have sent ₦ ${paymentData?.amount} to ${beneficiaryUser?.accountName}`}
					handleProceed={() => {
						router.push("/(tabs)/history");
						dispacth(clearBeneficiaryUser());
						dispacth(clearPaymentData());
					}}
				/>
			)}
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
			{!isSuccess && (
				<>
					<StatusBar style={isDarkMode ? "light" : "dark"} />
					<View
						style={{
							paddingTop: hp("15%"),
							paddingBottom: statusHeight - 20,
							flex: 1,
							gap: 5,
							position: "relative",
						}}
					>
						<TouchableOpacity
							style={{
								position: "absolute",
								top: "10%",
								left: 20,
								width: 40,
								height: 40,
								borderRadius: 20,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => {
								router.back();
							}}
						>
							<AntDesign name="arrowleft" size={24} color="black" />
						</TouchableOpacity>
						<PinInputSheet
							header={`Enter your pin`}
							subheader="Enter your 6 digit pin"
							pin={pin}
							setPin={setPin}
							pinCount={6}
							hasBiometrics={true}
						/>
					</View>
				</>
			)}
		</>
	);
};

export default TransferPin;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: SPACING.space_10,
	},
	headerWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	pageHeader: {
		fontSize: wp("6%"),
		fontFamily: "PoppinsSemiBold",
		color: "black",
		// marginLeft: SPACING.space_10,
	},
});
