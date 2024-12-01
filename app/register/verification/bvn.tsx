import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import React, {
	ReactElement,
	ReactNode,
	useContext,
	useRef,
	useState,
} from "react";
import { StatusBar } from "expo-status-bar";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import Input from "@/components/inputs/Input";
import { ThemeContext } from "@/provider/ThemeProvider";
import PageHeader from "@/components/PageHeader";
import {
	useCreateNewUserMutation,
	useInitiateBvnVerficationMutation,
	useValidateBvnVerificationMutation,
} from "@/redux/services/auth";
import VerificationPageHeader from "@/components/VerificationPageHeader";
import BvnScreen from "@/screens/register/BvnScreen";
import ValidateBvnScreen from "@/screens/register/ValidateBvnScreen";
import CreateUserScreen from "@/screens/register/CreateUserScreen";
import { FlatList } from "react-native";
import { Animated } from "react-native";
import CreatePasswordScreen from "@/screens/register/CreatePasswordScreen";
import CreateTransactionPinScreen from "@/screens/register/CreateTransactionPinScreen";
import CreateLoginPinScreen from "@/screens/register/CreateLoginPinScreen";
import useToast from "@/hooks/useToast";
import { storage } from "@/utils/storage";
import { ModalContext } from "@/provider/ModalProvider";

const BvnVerification = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const { successScreenVisible, toggleSuccessScreen } =
		useContext(ModalContext);
	const { showCustomToast } = useToast();

	//Page values
	const [otp, setOtp] = useState<string>("");
	const [bvnNumber, setBvnNumber] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [referalCode, setReferalCode] = useState<string>("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [userIdentiyId, setUserIdentiyId] = useState<string>("");
	const [userIdentityNumber, setUserIdentityNumber] = useState<string>("");
	const [userIdentityType, setUserIdentityType] = useState<"BVN" | "">("");
	const [transactionPin, setTransactionPin] = useState<number[]>([]);
	const [lockPin, setLockPin] = useState<number[]>([]);

	const { phoneNumber }: { phoneNumber: string } = useLocalSearchParams();

	const slidesRef = useRef<any>(null);
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
	const scrollX = useRef(new Animated.Value(0)).current;

	//RTK Hooks
	const [initiateBvnVerfication, { isLoading: isBvnLoading, data: bvnData }] =
		useInitiateBvnVerficationMutation();
	const [validateBvnVerification, { isLoading }] =
		useValidateBvnVerificationMutation();
	const [
		createNewUser,
		{ isLoading: isCreatingUser, isSuccess: verificationSuccess },
	] = useCreateNewUserMutation();

	//Functions
	const handleBvnSubmit = async () => {
		if (bvnNumber.length < 11) {
			showCustomToast("error", "Bvn number must be 11 digits");
			return;
		}

		if (bvnNumber.length === 11 && otp.length === 4 && userIdentiyId) {
			handleNextScreen(2);
			return;
		}

		try {
			const { data, error } = await initiateBvnVerfication({
				bvnNumber,
				phoneNumber,
			});

			if (error) {
				showCustomToast(
					"error",
					//@ts-ignore
					error?.response?.data?.message || "Something went wrong."
				);
				return;
			}

			console.log("🚀 ~ handleBvnSubmit ~ data:", data);

			// router.push(
			// 	`/register/verification/validateBvn?identityId=${data?.identityId}&phoneNumber=${phoneNumber}`
			// );
			setUserIdentiyId(data?.identityId);
			handleNextScreen(1);
		} catch (error) {
			console.log("🚀 ~ handleBvnSubmit ~ error:", error);
			showCustomToast("error", "Something went wrong.");
		}
	};

	const handleValidateBvn = async () => {
		console.log("got here");
		try {
			const {
				data: { data },

				error,
			} = await validateBvnVerification({
				identityId: userIdentiyId,
				otp,
			});

			if (error) {
				showCustomToast(
					"error",
					//@ts-ignore
					error?.response?.data?.message || "Something went wrong"
				);
				return;
			}
			console.log("🚀 ~ handleValidateBvn ~ data:", data);

			if (!data) {
				showCustomToast("error", "Invalid OTP, try again");
				return;
			}

			setFirstName(data?.providerResponse?.firstName);
			setLastName(data?.providerResponse?.lastName);
			setEmail(data?.providerResponse?.email);
			setUserIdentityNumber(data?.providerResponse?.bvn);
			setUserIdentityType("BVN");
			handleNextScreen(2);
		} catch (error: any) {
			showCustomToast(
				"error",
				error?.response?.data?.message || "Something went wrong"
			);
		}
	};

	const handleUserInfo = async () => {
		if (!firstName) {
			showCustomToast("error", "First name is required");
			return;
		}

		if (!lastName) {
			showCustomToast("error", "Last name is required");
			return;
		}
		if (!email) {
			showCustomToast("error", "Email is required");
			return;
		}
		if (firstName && lastName && email) {
			handleNextScreen(3);
			return;
		}
	};

	const handlePassword = async () => {
		if (!password) {
			showCustomToast("error", "Password is required");
			return;
		}
		if (password.length < 8) {
			showCustomToast(
				"error",
				"Password must be at least 8 characters long"
			);
			return;
		}
		if (!confirmPassword) {
			showCustomToast("error", "Confirm password is required");
			return;
		}
		if (password !== confirmPassword) {
			showCustomToast("error", "Passwords do not match");
			return;
		}
		handleNextScreen(4);
	};

	const handleTransactionPin = async () => {
		if (transactionPin.length === 4) {
			showCustomToast("error", "Transaction pin must be 4 digits");
			return;
		}

		handleNextScreen(5);
	};

	const handleCreateUser = async () => {
		const userData = {
			phoneNumber: phoneNumber,
			emailAddress: email,
			identityType: userIdentityType || "BVN",
			identityNumber: userIdentityNumber,
			identityId: userIdentiyId,
			otp: otp,
			password: password,
			transactionPin: transactionPin.join(""),
			lockPin: lockPin.join(""),
		};

		try {
			const { data, error } = await createNewUser(userData);

			if (error) {
				console.log("��� ~ handleCreateUser ~ error:", error);

				showCustomToast(
					"error",
					//@ts-ignore
					error?.response.data?.message ?? "Failed to create user"
				);

				return;
			}

			await storage.saveLockPin(lockPin.join(""));
			await storage.saveUserFirstName(firstName);

			router.push("/login");
		} catch (error: any) {
			showCustomToast(
				"error",
				//@ts-ignore
				error?.response.data?.message ?? "Failed to create user"
			);
		}
	};

	//Data
	// const registeData: { name: string; pageComponent: any }[] = [
	// 	{
	// 		name: "bvn",
	// 		pageComponent: (
	// 			<BvnScreen
	// 				next={() => {
	// 					if (bvnNumber.length === 11 && otp.length === 4) {
	// 						handleNextScreen(2);
	// 						return;
	// 					}

	// 					handleBvnSubmit();
	// 				}}
	// 				bvnNumber={bvnNumber}
	// 				onChangeBvnNumber={setBvnNumber}
	// 				isLoading={isBvnLoading}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		name: "verification",
	// 		pageComponent: (
	// 			<ValidateBvnScreen
	// 				prev={() => {
	// 					handlePrevScreen(0);
	// 				}}
	// 				next={() => {
	// 					handleValidateBvn();
	// 				}}
	// 				otpValue={otp}
	// 				onChangeOtp={setOtp}
	// 				isLoading={isLoading}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		name: "userInfo",
	// 		pageComponent: (
	// 			<CreateUserScreen
	// 				prev={() => {
	// 					handlePrevScreen(1);
	// 				}}
	// 				next={() => {
	// 					// handleNextScreen(3);
	// 					handleUserInfo();
	// 				}}
	// 				firstName={firstName}
	// 				onChangeFirstName={setFirstName}
	// 				lastName={lastName}
	// 				onChangeLastName={setLastName}
	// 				referalCode={referalCode}
	// 				onChangeReferalCode={setReferalCode}
	// 				email={email}
	// 				onChangeEmail={setEmail}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		name: "password",
	// 		pageComponent: (
	// 			<CreatePasswordScreen
	// 				prev={() => {
	// 					handlePassword();
	// 				}}
	// 				next={() => {
	// 					handleNextScreen(4);
	// 				}}
	// 				password={password}
	// 				confirmPassword={confirmPassword}
	// 				onChangePassword={setPassword}
	// 				onChangeConfirmPassword={setConfirmPassword}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		name: "transactionPin",
	// 		pageComponent: (
	// 			<CreateTransactionPinScreen
	// 				prev={() => {
	// 					handlePrevScreen(3);
	// 				}}
	// 				next={() => {
	// 					// handleNextScreen(5);
	// 					handleTransactionPin();
	// 				}}
	// 				pin={transactionPin}
	// 				onChangePin={setTransactionPin}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		name: "loginpin",
	// 		pageComponent: (
	// 			<CreateLoginPinScreen
	// 				prev={() => {
	// 					handlePrevScreen(4);
	// 				}}
	// 				next={() => {
	// 					handleCreateUser();
	// 				}}
	// 				pin={lockPin}
	// 				onChangePin={setLockPin}
	// 			/>
	// 		),
	// 	},
	// ];

	const handleNextScreen = (page: number) => {
		slidesRef.current.scrollToIndex({ index: page });
	};

	const handlePrevScreen = (page: number) => {
		slidesRef.current.scrollToIndex({ index: page });
	};

	return <BvnScreen />;
};

export default BvnVerification;
