import {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
	Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BORDERRADIUS, SPACING } from "@/constants/Theme";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Constants from "expo-constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import useToast from "@/hooks/useToast";
import { router } from "expo-router";
import { selectTransfer, setPaymentData } from "@/redux/slice/transfer.slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/inputs/Input";
import MoneyInput from "@/components/inputs/MoneyInput";
import Button from "@/components/Button";

import { ModalContext } from "@/provider/ModalProvider";
import ConfirmTransactionModal from "@/components/modals/ConfirmTransactionModal";
import { useGetCurrentUserQuery } from "@/redux/services/auth";
import KeyboardAvoidingViewContainer from "@/components/KeyboardAvoidingViewContainer";

const TransferAmount = () => {
	const statusHeight = Constants.statusBarHeight;

	const { isDarkMode, theme } = useContext(ThemeContext);
	const { showCustomToast } = useToast();
	//Redux
	const dispatch = useDispatch();
	const { beneficiaryUser, paymentData } = useSelector(selectTransfer);

	const { data: currentUser } = useGetCurrentUserQuery();
	const { toggleConfirmTransactionModal } = useContext(ModalContext);

	//State
	const [amount, onChangeAmount] = useState<string>("0.00");
	const [remark, onChangeRemark] = useState<string>("");
	const [errors, setErrors] = useState({
		amount: '',
		remark: ''
	});

	useEffect(() => {
		if (!beneficiaryUser) {
			router.back();
		}
	}, [beneficiaryUser]);

	const validateForm = () => {
		const newErrors = {
			amount: '',
			remark: ''
		};
		
		if (!amount || amount === '0.00') {
			newErrors.amount = 'Amount is required';
		} else {
			// Remove commas and convert to number for comparison
			const numericAmount = Number(amount.replace(/,/g, ''));
			if (numericAmount < 50) {
				newErrors.amount = 'Amount cannot be less than ₦50';
			}
		}
		
		if (!remark.trim()) {
			newErrors.remark = 'Remark is required';
		}

		setErrors(newErrors);
		return !newErrors.amount && !newErrors.remark;
	};

	const handleConfirm = () => {
		if (validateForm()) {
			toggleConfirmTransactionModal();
		}
	};

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
				<View style={{ flex: 1, paddingBottom: 10 }}>
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

					<View
						style={{
							flex: 1,
							paddingVertical: SPACING.space_20,
							paddingHorizontal: SPACING.space_10,
							gap: 20,
							marginBottom: Platform.OS === 'ios' ? 20 : 0,
						}}
					>
						{beneficiaryUser && (
							<>
								{beneficiaryUser?.accountName.includes("LEMU") ? (
									<View>
										<Text style={styles.inputLabel}>Send to</Text>
										<View
											style={[
												styles.verifiedUser,
												{ backgroundColor: Colors.orangeTint },
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
									</View>
								) : (
									<View>
										<Text style={styles.inputLabel}>Send to</Text>
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
									</View>
								)}
							</>
						)}

						<View>
							<Text style={styles.inputLabel}>Amount</Text>
							<MoneyInput value={amount} setValue={onChangeAmount} />
							{errors.amount ? (
								<Text style={styles.errorText}>{errors.amount}</Text>
							) : null}
						</View>

						<View>
							<Text style={styles.inputLabel}>Remark</Text>
							<Input
								value={remark}
								setValue={onChangeRemark}
								placeholder="What's this for?"
								keyboardType="default"
							/>
							{errors.remark ? (
								<Text style={styles.errorText}>{errors.remark}</Text>
							) : null}
						</View>
					</View>
					<View
						style={{
							paddingHorizontal: SPACING.space_10,
							paddingBottom: Platform.OS === 'ios' ? 20 : 10,
						}}
					>
						<Button
							buttonText="Confirm"
							onPress={handleConfirm}
						/>
					</View>
				</View>
				<ConfirmTransactionModal
					amount={amount}
					currentUser={currentUser!}
					beneficiaryUser={beneficiaryUser!}
					handleProceed={() => {
						const sendAmount = amount.replace(/,/g, "");
						dispatch(
							setPaymentData({
								amount: Number(Number(sendAmount).toFixed(0)),
								beneficiaryBankCode: paymentData?.beneficiaryBankCode!,
								beneficiaryAccountNumber:
									paymentData?.beneficiaryAccountNumber!,
								narration: remark || "",
								nameEnquiryReference: paymentData?.nameEnquiryReference!,
							})
						);

						router.push("/transfer/transferPin");
						toggleConfirmTransactionModal();
					}}
				/>
			</View>
		</KeyboardAvoidingViewContainer>
	);
};

export default TransferAmount;

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
		fontSize: wp("3.5%"),
		fontFamily: "PoppinsSemiBold",
		color: "black",
		marginBottom: SPACING.space_8 - 3,
	},

	verifiedUser: {
		height: 52,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: BORDERRADIUS.radius_15,
		paddingHorizontal: SPACING.space_10,
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
	errorText: {
		color: '#FF0000',  // Bright red
		fontSize: wp('3.5%'),
		fontFamily: 'PoppinsMedium',
		marginTop: 5,
		marginLeft: 2,
	},
});
