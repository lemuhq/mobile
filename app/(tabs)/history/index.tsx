import {
	View,
	Text,
	StyleSheet,
	Platform,
	TextInput,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import Constants from "expo-constants";
import { useGetTransactionHistoryQuery } from "@/redux/services/transfer";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import PageHeader from "@/components/PageHeader";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import TransactionItem from "@/components/TransactionItem";
import { useDispatch } from "react-redux";
import { setTransactionHistory } from "@/redux/slice/transfer.slice";
import { Skeleton } from "moti/skeleton";
import { ThemeContext } from "@/provider/ThemeProvider";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function History() {
	const dispatch = useDispatch();
	const { isDarkMode } = useContext(ThemeContext);
	const colorMode: "light" | "dark" = isDarkMode ? "dark" : "light";
	const statusHeight = Constants.statusBarHeight;

	const { data: transactionData, isLoading: transactionLoading, refetch, isFetching , error } =
		useGetTransactionHistoryQuery({
			
		});

	useEffect(() => {
		if (!transactionLoading && transactionData?.transactions) {
			dispatch(setTransactionHistory(transactionData?.transactions));
		}
	}, [transactionData]);

	useEffect(() => {
		refetch();
	}, []);

	

	//State
	const [search, onChangeSearch] = useState<string>("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	useEffect(() => {
		return () => {
			setSelectedDate(null);
		};
	}, []);

	const filteredTransactions = useMemo(() => {
		let filtered = transactionData?.transactions;

		if (!filtered) return [];

		if (search) {
			filtered = filtered.filter(
				(transaction) =>
					transaction?.senderAccountName?.toLowerCase().includes(search.toLowerCase()) ||
					transaction?.senderBank?.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (selectedDate) {
			filtered = filtered.filter((transaction) => {
				const transactionDate = new Date(transaction?.date || transaction?.createdAt);
				const compareDate = new Date(selectedDate);
				transactionDate.setHours(0, 0, 0, 0);
				compareDate.setHours(0, 0, 0, 0);
				
				return transactionDate.getTime() === compareDate.getTime();
			});
		}

		return filtered;
	}, [search, transactionData, selectedDate]);

	const handleDateChange = (event: any, date?: Date) => {
		if (Platform.OS === 'android') {
			setShowDatePicker(false);
		}
		if (date) {
			setSelectedDate(date);
		}
	};

	return (
		<View style={[styles.container, { paddingTop: statusHeight + 10 }]}>
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
				<TouchableOpacity onPress={() => setShowDatePicker(true)}>
					<MaterialCommunityIcons
						name="calendar-blank"
						size={24}
						color={selectedDate ? Colors.primary : "black"}
					/>
				</TouchableOpacity>
			</View>

			{(showDatePicker || Platform.OS === 'ios') && (
				<DateTimePicker
					value={selectedDate || new Date()}
					mode="date"
					display={Platform.OS === 'ios' ? 'spinner' : 'default'}
					onChange={handleDateChange}
				/>
			)}

			<View style={styles.transactionsContainer}>
				<FlatList
					data={[...filteredTransactions].reverse()}
					renderItem={({ item }) => <TransactionItem {...item} />}
					keyExtractor={(item) => item._id}
					contentContainerStyle={{
						gap: 5,
					}}
					ListEmptyComponent={() => {
						if (transactionLoading) {
							return (
								<>
									{Array(5)
										.fill("")
										.map((_, idx) => (
											<View
												style={{
													flex: 1,
													justifyContent: "space-between",
													alignItems: "center",
													marginBottom: 10,
													paddingVertical: hp("2%"),
													flexDirection: "row",
												}}
												key={idx}
											>
												<View style={{ gap: 5 }}>
													<Skeleton
														width={wp("20%")}
														height={10}
														colorMode={colorMode}
													/>
													<Skeleton
														width={wp("30%")}
														height={15}
														colorMode={colorMode}
													/>
												</View>

												<Skeleton
													width={wp("30%")}
													height={15}
													colorMode={colorMode}
												/>
											</View>
										))}
								</>
							);
						}
						return (
							<View style={{ flex: 1, justifyContent: "center" }}>
								<Text
									style={{
										fontFamily: "PoppinsRegular",
										fontSize: FONTSIZE.size_14,
									}}
								>
									No transactions found.
								</Text>
							</View>
						);
					}}
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
