import { View, Text } from "react-native";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import { Colors } from "@/constants/Colors";
import globalStyles from "@/styles/global.styles";
import { SPACING } from "@/constants/Theme";

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
				inputCount={4}
				textInputStyle={globalStyles.otpTextInputStyle}
				tintColor={Colors.orange}
				defaultValue={otpVal}
				handleTextChange={(val) => setOtpVal(val)}
				containerStyle={{
					gap: SPACING.space_10,
				}}
				//   ref={e => (otpInput = e)}
			/>
		</View>
	);
}
