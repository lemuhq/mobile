import {
	View,
	Text,
	StyleSheet,
	Platform,
	Image,
	TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectTransfer } from "@/redux/slice/transfer.slice";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { BORDERRADIUS, SPACING } from "@/constants/Theme";
import Constants from "expo-constants";
import PageHeader from "@/components/PageHeader";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { formatNumberWithCommas } from "@/helpers/formatter";
import { MaterialIcons } from "@expo/vector-icons";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

const TransactionId = () => {
	const { transactionId }: { transactionId: string } = useLocalSearchParams();
	const { transactionHistory } = useSelector(selectTransfer);

	const { handleCopyText } = useCopyToClipboard();

	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight + 30 : 70;

	const transaction = useMemo(() => {
		return transactionHistory.find((t) => t._id === transactionId);
	}, [transactionId, transactionHistory]);

	const STATUS_MAP = {
		Completed: (
			<View style={styles.statusWrapper}>
				<MaterialIcons
					name="check-circle-outline"
					size={22}
					color="#68F611"
				/>
				<Text style={[styles.statusText, { color: "#5FD318" }]}>
					Successful
				</Text>
			</View>
		),
		Pending: (
			<View style={styles.statusWrapper}>
				<MaterialIcons name="pending" size={22} color="#DC9F44" />
				<Text style={[styles.statusText, { color: "#DC9F44" }]}>
					Pending
				</Text>
			</View>
		),
		Failed: (
			<View style={styles.statusWrapper}>
				<MaterialIcons name="error" size={22} color="#e84747" />
				<Text style={[styles.statusText, { color: "#FF2C2C" }]}>
					Failed
				</Text>
			</View>
		),
	};

	if (!transaction) {
		return (
			<View style={[styles.container, { paddingTop: statusHeight }]}>
				<Text>Transaction not found</Text>
			</View>
		);
	}
	return (
		<View
			style={[
				styles.container,
				{ paddingTop: statusHeight, paddingBottom: statusHeight - 60 },
			]}
		>
			<PageHeader
				header="Transaction Details"
				backButton={true}
				variant="center"
			/>
			<View style={styles.contentWrapper}>
				<View style={styles.userInfo}>
					<View style={styles.bankIcon}>
						<Image
							source={require(`@/assets/lemu-icon.png`)}
							style={{
								width: 14,
								height: 14,
								resizeMode: "contain",
							}}
						/>
					</View>

					<View
						style={{
							paddingTop: 10,
							gap: 10,
						}}
					>
						<Text style={[styles.sectionHeader, { textAlign: "center" }]}>
							Transfer{" "}
							{transaction?.transactionType === "Outwards"
								? "to"
								: "from"}{" "}
							{transaction?.receiverAccountName}
						</Text>
						<Text style={[styles.sectionHeader, { textAlign: "center" }]}>
							{"\u20A6"}
							{formatNumberWithCommas(transaction?.amount)}
						</Text>
						{STATUS_MAP[transaction?.status]}
					</View>
				</View>
				<View style={styles.transactionInfo}>
					<Text style={styles.sectionHeader}>Transaction Details</Text>

					<View style={styles.transactionItems}>
						<View style={styles.transactionItem}>
							<Text style={styles.itemTitle}>Recipient Details</Text>

							<View style={{ alignItems: "flex-end", gap: 2 }}>
								<Text style={styles.itemValue}>
									{transaction?.receiverAccountName}
								</Text>
								<Text style={styles.itemValue}>
									{transaction?.receiverAccountNumber}
								</Text>
							</View>
						</View>
						<View style={styles.transactionItem}>
							<Text style={styles.itemTitle}>Transaction Type</Text>

							<Text style={styles.itemValue}>
								Transfer to Lemu Account
							</Text>
						</View>
						<View style={styles.transactionItem}>
							<Text style={styles.itemTitle}>Transaction No.</Text>

							<View style={{ flexDirection: "row", gap: 2 }}>
								<Text style={styles.itemValue}>
									{transaction?.reference?.slice(0, 20)}...
								</Text>
								<TouchableOpacity
									onPress={() =>
										handleCopyText(transaction?.reference)
									}
								>
									<MaterialIcons
										name="content-copy"
										size={18}
										color={Colors.orange}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.transactionItem}>
							<Text style={styles.itemTitle}>Payment Method</Text>

							<Text style={styles.itemValue}>Lemu Pay</Text>
						</View>
						<View style={styles.transactionItem}>
							<Text style={styles.itemTitle}>Transaction Date</Text>

							<Text style={styles.itemValue}>Lemu Pay</Text>
						</View>
					</View>
				</View>

				<View style={styles.buttonWrapper}>
					{/* <Button buttonText="Report an issue" variant="dark" />
					<Button buttonText="Share receipt" /> */}
					<TouchableOpacity
						style={[
							styles.buttonStyles,
							{ backgroundColor: Colors.gunMetal },
						]}
					>
						<Text style={styles.buttonText}>Report an issue</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.buttonStyles,
							{ backgroundColor: Colors.orange },
						]}
					>
						<Text style={styles.buttonText}>Share receipt</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default TransactionId;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.whiteSmoke,
		flex: 1,
		paddingHorizontal: SPACING.space_10,
	},
	contentWrapper: {
		flex: 1,
		paddingHorizontal: SPACING.space_10,
		paddingTop: SPACING.space_20,
		marginTop: SPACING.space_10,
	},
	userInfo: {
		backgroundColor: Colors.white,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: BORDERRADIUS.radius_10,
		paddingVertical: SPACING.space_30,
	},
	bankIcon: {
		backgroundColor: Colors.gunMetal,
		width: SPACING.space_36,
		height: SPACING.space_36,
		borderRadius: wp("100%"),
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: hp("-1.2%"),
	},

	sectionHeader: {
		color: Colors.black,
		fontSize: wp("4%"),
		fontFamily: "PoppinsSemiBold",
	},
	statusWrapper: {
		flexDirection: "row",
		alignContent: "center",
		gap: 5,
		justifyContent: "center",
	},
	statusText: {
		fontSize: wp("3.8%"),
		fontFamily: "PoppinsBold",
	},
	transactionInfo: {
		backgroundColor: Colors.white,
		position: "relative",
		borderRadius: BORDERRADIUS.radius_10,
		paddingVertical: SPACING.space_20,
		paddingHorizontal: SPACING.space_10,
		marginTop: SPACING.space_20,
	},
	buttonWrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		gap: 20,
	},

	transactionItems: {
		marginTop: SPACING.space_10,
	},
	transactionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: SPACING.space_10,
	},
	itemTitle: {
		fontSize: wp("3.5%"),
		color: "#777777",
		fontFamily: "PoppinsRegular",
		textAlign: "right",
		paddingRight: SPACING.space_10,
	},
	itemValue: {
		fontSize: wp("3.5%"),
	},
	buttonStyles: {
		paddingHorizontal: SPACING.space_20,
		height: 54,
		borderRadius: BORDERRADIUS.radius_15,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontFamily: "PoppinsSemiBold",
		fontSize: wp("3.5%"),
		color: Colors.white,
	},
});
