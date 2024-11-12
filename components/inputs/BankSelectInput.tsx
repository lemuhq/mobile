import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, useContext, useState } from "react";
import inputStyles from "@/styles/input.styles";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ModalContext } from "@/provider/ModalProvider";

interface IProps {
	value: { bankCode: string; bankName: string } | null;
	// onChange: (value: { bankCode: string; bankName: string }) => void;
}

const BankSelectInput: FC<IProps> = ({ value }) => {
	const [focus, setFocus] = useState(false);
	const { banksModalOpen, toggleBankModal } = useContext(ModalContext);
	return (
		<TouchableOpacity onPress={toggleBankModal}>
			<View
				style={[
					inputStyles.container,
					{
						borderWidth: 1,
						borderColor: focus ? Colors.orange : Colors.whiteSmoke,
						flexDirection: "row",

						alignItems: "center",
						justifyContent: "space-between",
					},
				]}
			>
				{value?.bankName ? (
					<Text>{value.bankName}</Text>
				) : (
					<Text
						style={{ color: Colors.silver, fontFamily: "PoppinsMedium" }}
					>
						Select bank
					</Text>
				)}
				{banksModalOpen ? (
					<MaterialIcons
						name="keyboard-arrow-up"
						size={24}
						color="black"
					/>
				) : (
					<MaterialIcons
						name="keyboard-arrow-down"
						size={24}
						color="black"
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default BankSelectInput;
