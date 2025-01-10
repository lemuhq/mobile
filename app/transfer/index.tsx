import {
	View,
	Text,
	Platform,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import { BORDERRADIUS, SPACING } from "@/constants/Theme";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import Input from "@/components/inputs/Input";
import BankSelectInput from "@/components/inputs/BankSelectInput";
import Button from "@/components/Button";
import BankListModal from "@/components/modals/BankListModal";
import {
	useGetBankListQuery,
	useVerifyAccountNumberMutation,
} from "@/redux/services/transfer";
import useToast from "@/hooks/useToast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	clearBeneficiaryUser,
	selectTransfer,
	setBankList,
	setPaymentData,
	setSelectedBeneficiaryUser,
} from "@/redux/slice/transfer.slice";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";

export default function TransferPage() {
	const statusHeight = Constants.statusBarHeight;

	const { isDarkMode, theme } = useContext(ThemeContext);
	const { showCustomToast } = useToast();

	const { data: bankData, isLoading: bankLoading } = useGetBankListQuery({});

	useEffect(() => {
		if (bankData && !bankLoading) {
			dispatch(setBankList(bankData.data));
		}
	}, [bankData, bankLoading]);

	//Redux
	const dispatch = useDispatch();
	const { beneficiaryUser } = useSelector(selectTransfer);

	//state
	const [accountNumber, onChangeAccountNumber] = useState<string>("");
	const [selectedBank, setSelectedBank] = useState<{
		bankCode: string;
		bankName: string;
	} | null>(null);
	const [isAccountVerified, setIsAccountVerified] = useState<boolean>(false);

	//Functions
	const [verifyAccountNumber, { isLoading, data, error }] =
		useVerifyAccountNumberMutation();

	async function handleVerification() {
		if (accountNumber.length < 10) {
			alert("Please enter a valid 10-digit account number.");
			return;
		}
		if (selectedBank?.bankCode.length === 0) {
			alert("Please select a bank.");
			return;
		}
		const response = await verifyAccountNumber({
			accountNumber,
			bankCode: selectedBank?.bankCode,
		});

		if (response?.data?.responseCode !== "00") {
			if (response?.data?.responseCode === "91") {
				showCustomToast(
					"error",
					response?.data?.message ?? "Account verification failed."
				);
			} else {
				showCustomToast("error", "Account verification failed.");
			}
			onChangeAccountNumber("");
			setSelectedBank(null);

			return;
		}

		dispatch(setSelectedBeneficiaryUser(response?.data?.data));

		dispatch(
			setPaymentData({
				amount: 0,
				beneficiaryBankCode: selectedBank?.bankCode ?? "",
				beneficiaryAccountNumber: accountNumber ?? "",
				narration: "",
				nameEnquiryReference: response?.data?.data?.sessionId,
			})
		);
		setIsAccountVerified(true);
	}

	useEffect(() => {
		if (accountNumber.length === 10 && selectedBank) {
			handleVerification();
		}
	}, [accountNumber, selectedBank]);

	useEffect(() => {
		dispatch(clearBeneficiaryUser());
	}, []);

	return (
		<KeyboardAvoidingViewContainer>
			<View
				style={[
					styles.container,
					{
						paddingTop: statusHeight + 10,
						backgroundColor: theme.background,
					},
				]}
			>
				<StatusBar style={isDarkMode ? "light" : "dark"} />
				<View style={{ flex: 1 }}>
					<View style={styles.headerWrapper}>
						<TouchableOpacity onPress={() => router.back()}>
							<MaterialIcons
								name="keyboard-arrow-left"
								size={36}
								color="black"
							/>
						</TouchableOpacity>
						<Text style={styles.pageHeader}>Transfer to Bank Account</Text>
					</View>

					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							flexGrow: 1,
							paddingTop: SPACING.space_30,
							paddingHorizontal: SPACING.space_10,
							paddingBottom: SPACING.space_20,
						}}
						keyboardShouldPersistTaps="handled"
					>
						<View
							style={{
								gap: 20,
								flex: 1,
							}}
						>
							<View>
								<Text style={styles.inputLabel}>Recepient Account</Text>
								<Input
									value={accountNumber}
									setValue={onChangeAccountNumber}
									placeholder="Enter account number"
									keyboardType="number-pad"
									maxLength={10}
								/>
							</View>
							<View>
								<Text style={styles.inputLabel}>Select Bank</Text>
								<BankSelectInput value={selectedBank} />
							</View>

							{beneficiaryUser && (
								<>
									{beneficiaryUser?.accountName.includes("LEMU") ? (
										<View
											style={[
												styles.verifiedUser,
												{ backgroundColor: Colors.silver },
											]}
										>
											<View style={styles.lemuIcon}>
												<Image
													source={require(`@/assets/lemu-icon.png`)}
													style={{
														width: 14,
														height: 14,
														resizeMode: "contain",
													}}
												/>
											</View>
											<Text
												style={[
													styles.beneficiaryName,
													{ color: Colors.black },
												]}
											>
												{beneficiaryUser?.accountName}
											</Text>
										</View>
									) : (
										<View
											style={[
												styles.verifiedUser,
												{ backgroundColor: "#E5FFCD" },
											]}
										>
											<View style={styles.verifiedIcon}>
												<Ionicons
													name="checkmark-sharp"
													size={20}
													color="#68F611"
												/>
											</View>
											<Text
												style={[
													styles.beneficiaryName,
													{ color: Colors.black },
												]}
											>
												{beneficiaryUser?.accountName}
											</Text>
										</View>
									)}
								</>
							)}
						</View>

						<View style={{}}>
							<Button
								buttonText="Next"
								disabled={
									!selectedBank ||
									!accountNumber ||
									!isAccountVerified ||
									isLoading
								}
								onPress={() => {
									router.push("/transfer/transferAmount");
								}}
								isLoading={isLoading}
							/>
						</View>
					</ScrollView>

					<BankListModal setSelectedBank={setSelectedBank} />
				</View>
			</View>
		</KeyboardAvoidingViewContainer>
	);
}

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

	inputLabel: {
		fontSize: wp("5.2%"),
		fontFamily: "PoppinsSemiBold",
		color: "black",
		marginBottom: SPACING.space_8,
	},

	verifiedUser: {
		height: 52,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: BORDERRADIUS.radius_15,
		paddingHorizontal: SPACING.space_20,
		gap: SPACING.space_10,
	},
	lemuIcon: {
		width: 36,
		height: 36,
		borderRadius: wp("100%"),
		backgroundColor: Colors.gunMetal,
		alignItems: "center",
		justifyContent: "center",
	},
	beneficiaryName: {
		fontSize: wp("3.4%"),
		fontFamily: "PoppinsBold",
		// color: Colors.gunMetal,
		flex: 1,
	},
	verifiedIcon: {
		width: 36,
		height: 36,
		borderRadius: wp("100%"),
		borderWidth: 5,
		borderColor: "#68F611",
		alignItems: "center",
		justifyContent: "center",
	},
});
