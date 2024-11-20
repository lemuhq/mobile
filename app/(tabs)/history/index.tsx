import {
	View,
	Text,
	StyleSheet,
	Platform,
	TextInput,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import Constants from "expo-constants";
import { useGetTransactionHistoryQuery } from "@/redux/services/transfer";
import { BORDERRADIUS, SPACING } from "@/constants/Theme";
import PageHeader from "@/components/PageHeader";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import TransactionItem from "@/components/TransactionItem";
import { useDispatch } from "react-redux";
import { setTransactionHistory } from "@/redux/slice/transfer.slice";

export default function History() {
	const dispatch = useDispatch();
	const statusHeight =
		Platform.OS === "android" ? Constants.statusBarHeight + 30 : 70;

	const { data: transactionData, isLoading: transactionLoading } =
		useGetTransactionHistoryQuery({});

	useEffect(() => {
		if (!transactionLoading && transactionData?.transactions) {
			dispatch(setTransactionHistory(transactionData?.transactions));
		}
	}, [transactionData]);

	//State
	const [search, onChangeSearch] = useState<string>("");

	const filteredTransactions = useMemo(() => {
		if (!search) {
			return transactionData?.transactions;
		}

		return transactionData?.transactions.filter(
			(transaction) =>
				transaction.senderAccountName
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				transaction?.senderBank.toLowerCase().includes(search.toLowerCase())
		);
	}, [search, transactionData]);

	return (
		<View style={[styles.container, { paddingTop: statusHeight }]}>
			<PageHeader
				header="Transaction History"
				backButton={true}
				variant="center"
			/>

			<View
				style={{
					marginTop: SPACING.space_20,
					paddingHorizontal: SPACING.space_10,
					flexDirection: "row",
					alignItems: "center",
					gap: 10,
				}}
			>
				<View style={styles.inputWrapper}>
					<MaterialIcons name="search" size={24} color={Colors.silver} />
					<TextInput
						style={styles.input}
						placeholder="Search Transaction"
						placeholderTextColor={Colors.gunMetal}
						value={search}
						onChangeText={onChangeSearch}
					/>
				</View>
				<TouchableOpacity>
					<MaterialCommunityIcons
						name="calendar-blank"
						size={24}
						color="black"
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.transactionsContainer}>
				<FlatList
					data={filteredTransactions}
					renderItem={({ item }) => <TransactionItem {...item} />}
					keyExtractor={(item) => item._id}
					contentContainerStyle={{
						gap: 5,
					}}
					ListEmptyComponent={() => (
						<View
							style={{
								flex: 1,
							}}
						>
							<Text style={{ textAlign: "center" }}>No banks found</Text>
						</View>
					)}
					// onEndReached={loadMore}
					// onEndReachedThreshold={0.5}
					// ListFooterComponent={loading ? <ActivityIndicator /> : null}
					// style={styles.flatList}
					// contentContainerStyle={styles.flatListContent}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		flex: 1,
		paddingHorizontal: SPACING.space_10,
	},

	inputWrapper: {
		height: hp("6.2%"),
		backgroundColor: Colors.whiteSmoke,
		borderRadius: BORDERRADIUS.radius_15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingHorizontal: SPACING.space_10,
		gap: SPACING.space_8,
		overflow: "hidden",
		flex: 1,
	},
	input: {
		backgroundColor: "transparent",
		flex: 1,
		height: "100%",
		fontFamily: "PoppinsMedium",
	},
	transactionsContainer: {
		flex: 1,

		marginTop: SPACING.space_20,
		paddingHorizontal: SPACING.space_10,
		paddingTop: SPACING.space_10,
	},
});
