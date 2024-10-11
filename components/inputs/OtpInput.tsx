import { View, Text } from "react-native";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import inputStyles from "@/styles/input.styles";
import { Colors } from "@/constants/Colors";
import globalStyles from "@/styles/global.styles";

export default function OtpInput({
	otpVal,
	setOtpVal,
}: {
	otpVal: string;
	setOtpVal: Dispatch<SetStateAction<string>>;
}) {
	return (
		<View>
			<OTPTextInput
				inputCount={6}
				textInputStyle={globalStyles.otpTextInputStyle}
				tintColor={Colors.orange}
				defaultValue={otpVal}
				handleTextChange={(val) => setOtpVal(val)}
				//   ref={e => (otpInput = e)}
			/>
		</View>
	);
}
