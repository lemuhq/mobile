import { View } from "react-native";
import React, { Dispatch, SetStateAction, useRef, useEffect } from "react";
import OTPTextInput from "react-native-otp-textinput";
import { Colors } from "@/constants/Colors";
import globalStyles from "@/styles/global.styles";
import { SPACING } from "@/constants/Theme";

function OtpInput({
	otpVal,
	setOtpVal,
}: {
	otpVal: string;
	setOtpVal: Dispatch<SetStateAction<string>>;
}) {
	const inputRef = useRef<any>(null);

	useEffect(() => {
		// Clear the input when component mounts
		if (inputRef.current) {
			inputRef.current.clear();
		}
	}, []);

	return (
		<View>
			<OTPTextInput
				ref={inputRef}
				inputCount={4}
				textInputStyle={globalStyles.otpTextInputStyle}
				tintColor={Colors.orange}
				handleTextChange={setOtpVal}
				containerStyle={{
					gap: SPACING.space_10,
				}}
				autoFocus={false}
				offTintColor={Colors.orange}
				keyboardType="numeric"
				inputCellLength={1}
			/>
		</View>
	);
}

export default React.memo(OtpInput);
