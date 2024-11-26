import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Image,
	Pressable,
	Platform,
	TouchableOpacity,
	FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { BORDERRADIUS, FONTSIZE, SPACING } from "@/constants/Theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Avatar from "@/components/Avatar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import TransactionItem from "@/components/TransactionItem";
import { ModalContext } from "@/provider/ModalProvider";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import DebitCard from "@/components/DebitCard";
import {
	useGetBankListQuery,
	useGetTransactionHistoryQuery,
} from "@/redux/services/transfer";
import {
	setBankList,
	setTransactionHistory,
} from "@/redux/slice/transfer.slice";
import { selectUser, setCurrentUser } from "@/redux/slice/user.slice";
import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "@/redux/services/auth";
import { Transaction } from "@/types/transfer";
import { Skeleton } from "moti/skeleton";
import {
	heightPercentageToDP,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { storage } from "@/utils/storage";

export default function Home() {
	const dispatch = useDispatch();
	const { isDarkMode, theme } = useContext(ThemeContext);
	const colorMode: "light" | "dark" = isDarkMode ? "dark" : "light";
	const {
		toggleProfileVisible,
		toggleTransactionModal,
		toggleEmailVerification,
	} = useContext(ModalContext);

	const { data, isLoading } = useGetCurrentUserQuery();
	const { currentUser } = useSelector(selectUser);

	const { data: transactionData, isLoading: transactionLoading } =
		useGetTransactionHistoryQuery({});

	const { data: bankData, isLoading: bankLoading } = useGetBankListQuery({});

	useEffect(() => {
		async function checkForLockPin() {
			const userLockPin = await storage.getLockPin();

			if (!userLockPin) {
				await storage.saveLockPin(data?.lockPin!);
			}
		}

		checkForLockPin();
	}, [data]);

	useEffect(() => {
		if (bankData && !bankLoading) {
			dispatch(setBankList(bankData.data));
		}
	}, [bankData, bankLoading]);

	useEffect(() => {
		if (!transactionLoading && transactionData?.transactions) {
			dispatch(setTransactionHistory(transactionData?.transactions));
		}
	}, [transactionData]);

	useEffect(() => {
		if (!isLoading && data) {
			dispatch(setCurrentUser(data));
		}
	}, [data]);

	const widgetsData: { name: string; icon: any }[] = [
		{
			name: "Account",
			icon: () => (
				<MaterialCommunityIcons
					name="bank"
					size={24}
					color="black"
					style={{ zIndex: 3 }}
				/>
			),
		},
		{
			name: "Send",
			icon: () => (
				<FontAwesome5
					name="telegram-plane"
					size={24}
					color="black"
					style={{ zIndex: 3 }}
				/>
			),
		},
		{
			name: "Top-Up",
			icon: () => (
				<Entypo
					name="circle-with-plus"
					size={24}
					color="black"
					style={{ zIndex: 3 }}
				/>
			),
		},
		{
			name: "More",
			icon: () => (
				<Ionicons
					name="grid"
					size={24}
					color="black"
					style={{ zIndex: 3 }}
				/>
			),
		},
	];

	return (
		<SafeAreaView
			style={[
				{
					flex: 1,
					backgroundColor: isDarkMode ? Colors.gray : Colors.white,
					paddingTop: Platform.OS === "android" ? SPACING.space_30 : 0,
				},
			]}
		>
			<StatusBar style={isDarkMode ? "light" : "dark"} />

			<ScrollView
				style={[
					styles.scrollViewContainer,
					{
						backgroundColor: isDarkMode ? Colors.gray : Colors.whiteSmoke,
					},
				]}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				stickyHeaderIndices={[0]}
				contentContainerStyle={{ flex: 0 }}
			>
				<View
					style={[
						styles.stickyHeader,
						{ backgroundColor: theme.background },
					]}
				>
					<View style={styles.stickyHeaderBody}>
						<TouchableOpacity
							onPress={() => {
								if (!isLoading) {
									toggleProfileVisible();
								}
							}}
						>
							<View style={styles.userInfoContainer}>
								<Skeleton
									colorMode={colorMode}
									width={25}
									height={25}
									radius={"round"}
								>
									{isLoading ? null : (
										<Avatar
											variant="sm"
											imageUrl={require(`@/assets/default-user.png`)}
										/>
									)}
								</Skeleton>
								<Skeleton
									width={wp("15%")}
									height={10}
									colorMode={colorMode}
								>
									{isLoading ? null : (
										<Text>
											Hello,{" "}
											{data?.firstName || currentUser?.firstName}
										</Text>
									)}
								</Skeleton>
								{!isLoading && (
									<MaterialIcons
										name="keyboard-arrow-down"
										size={18}
										color="black"
										style={{ marginLeft: 5 }}
									/>
								)}
							</View>
						</TouchableOpacity>
						{!isLoading && (
							<View style={{ position: "relative" }}>
								<View
									style={{
										position: "absolute",
										width: 8,
										height: 8,
										borderRadius: 50,
										backgroundColor: Colors.orange,
										right: 3,
									}}
								/>
								<MaterialCommunityIcons
									name="bell-outline"
									size={24}
									color={isDarkMode ? Colors.orange : Colors.black}
								/>
							</View>
						)}
					</View>
				</View>
				<View
					style={[
						styles.firstSectionContainer,
						{
							backgroundColor: isDarkMode
								? Colors.gray
								: Colors.whiteSmoke,
						},
					]}
				>
					<DebitCard
						isLoading={isLoading}
						currentUser={data! || currentUser}
					/>

					<View style={styles.widgetsContainer}>
						{widgetsData.map((item, idx) => {
							if (isLoading) {
								return (
									<Skeleton
										colorMode={colorMode}
										width={54}
										height={54}
										radius={"round"}
										key={idx}
									/>
								);
							}

							return (
								<TouchableOpacity
									key={idx}
									style={styles.navigationButtons}
									onPress={() => {
										if (item.name === "Send") {
											// toggleTransactionModal();
											router.push("/transfer");
										}
										if (item.name === "Account") {
											toggleTransactionModal();
										}
									}}
								>
									<View
										style={[
											styles.iconWrapper,
											{
												backgroundColor: isDarkMode
													? Colors.orangeTint
													: Colors.white,
											},
										]}
									>
										{item.icon()}
										<View
											style={{
												width: 15,
												height: 15,
												borderRadius: 50,
												backgroundColor: isDarkMode
													? Colors.orangeTintTwo
													: Colors.orangeTint,

												top: 20,
												left: 25,
												position: "absolute",
												zIndex: 1,
											}}
										/>
									</View>
									<Text
										style={[
											styles.widgetLabel,
											{
												color: isDarkMode
													? Colors.orangeTint
													: Colors.black,
												fontFamily: "PoppinsRegular",
											},
										]}
									>
										{item.name}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>

				{/*KYC section*/}
				<Pressable onPress={() => toggleEmailVerification()}>
					<View
						style={{
							borderTopWidth: 1,
							borderColor: "#34393E40",
							paddingVertical: SPACING.space_20,
							paddingHorizontal: SPACING.space_20,
							backgroundColor: isDarkMode
								? Colors.gray
								: Colors.whiteSmoke,
						}}
					>
						<Skeleton colorMode={colorMode} width={"100%"} height={65}>
							{isLoading ? null : (
								<View style={styles.kycWrapper}>
									<Text style={styles.kycText}>
										Get your flame on with Lemu.
									</Text>
									<Text style={styles.kycText}>
										<Text style={{ color: Colors.orangeTint }}>
											Update your KYC
										</Text>
										information today!.
									</Text>

									<Image
										source={require(`@/assets/kyc.png`)}
										style={{
											width: 135,
											height: 135,
											position: "absolute",
											bottom: -39,
											right: 0,
											resizeMode: "contain",
										}}
									/>
								</View>
							)}
						</Skeleton>
					</View>
				</Pressable>
				<View
					style={{
						backgroundColor: isDarkMode ? Colors.gray : Colors.white,
						flex: 1,
					}}
				>
					<View style={styles.trendContainer}>
						{!isLoading && (
							<Text
								style={{
									fontFamily: "PoppinsSemiBold",

									fontSize: FONTSIZE.size_14 - 1,
									color: isDarkMode ? Colors.orange : Colors.black,
								}}
							>
								Trending today
							</Text>
						)}
						<Skeleton colorMode={colorMode} width={"100%"} height={90}>
							{isLoading ? null : (
								<LinearGradient
									colors={["#F99B6D", "#FF6113"]}
									style={styles.trendItem}
								>
									<Text style={styles.trendHeader}>
										Orange sure looks
									</Text>
									<Text style={styles.trendHeader}>good on you!</Text>
									<Text
										style={{
											fontFamily: "PoppinsRegular",
											fontSize: FONTSIZE.size_10 - 2,
											color: Colors.black,
											zIndex: 3,
										}}
									>
										Get cashback on every transaction
									</Text>
									<Image
										source={require(`@/assets/trend-person.png`)}
										style={{
											width: 220,
											height: 200,
											resizeMode: "contain",
											position: "absolute",
											top: -40,
											right: -10,
											zIndex: 2,
										}}
									/>

									<Image
										source={require(`@/assets/trend-pattern.png`)}
										style={{
											width: 230,
											height: 180,
											resizeMode: "contain",
											position: "absolute",
											top: -38,
											right: -40,
										}}
									/>
								</LinearGradient>
							)}
						</Skeleton>
					</View>

					<View
						style={{
							backgroundColor: isDarkMode ? Colors.gray : Colors.white,
							flex: 1,
						}}
					>
						{/*Transaction header*/}
						<View
							style={[
								styles.transactionHeader,
								{
									backgroundColor: isDarkMode
										? Colors.orangeTintTwo
										: Colors.whiteSmoke,
								},
							]}
						>
							<Skeleton
								width={wp("30%")}
								height={14}
								colorMode={colorMode}
							>
								{isLoading ? null : (
									<Text
										style={{
											fontFamily: "PoppinsSemiBold",

											fontSize: FONTSIZE.size_14 - 1,
											color: isDarkMode
												? Colors.orange
												: Colors.black,
										}}
									>
										Transaction History
									</Text>
								)}
							</Skeleton>

							<Skeleton
								width={wp("20%")}
								height={14}
								colorMode={colorMode}
							>
								{isLoading ? null : (
									<TouchableOpacity
										style={styles.viewButton}
										onPress={() => {
											router.push("/(tabs)/history");
										}}
									>
										<Text
											style={{
												color: Colors.orange,
												fontFamily: "PoppinsSemiBold",
												fontSize: FONTSIZE.size_10 + 3,
											}}
										>
											View all
										</Text>
										<MaterialIcons
											name="keyboard-arrow-right"
											size={20}
											color={Colors.orange}
										/>
									</TouchableOpacity>
								)}
							</Skeleton>
						</View>

						{/* <View style={styles.transactionContainer}>
							<FlatList
								data={
									isLoading || transactionLoading
										? []
										: transactionData?.transactions
								}
								renderItem={({ item }) => <TransactionItem {...item} />}
								keyExtractor={(item) => item._id}
								contentContainerStyle={{
									gap: 5,
								}}
								ListEmptyComponent={() => {
									if (isLoading || transactionLoading) {
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
																paddingVertical:
																	heightPercentageToDP("2%"),
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
										<View
											style={{ flex: 1, justifyContent: "center" }}
										>
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
						</View> */}
					</View>
				</View>
			</ScrollView>
			{/* <TransactionModal /> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	scrollViewContainer: {
		flex: 1,
	},
	stickyHeader: {
		minHeight: 80,
		height: 80,
		borderBottomLeftRadius: BORDERRADIUS.radius_20,
		borderBottomRightRadius: BORDERRADIUS.radius_20,
		paddingHorizontal: SPACING.space_20,
	},
	stickyHeaderBody: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		height: "100%",
	},

	userInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.whiteSmoke,
		paddingHorizontal: SPACING.space_10,
		paddingVertical: SPACING.space_10 - 5,
		gap: SPACING.space_10,
		borderRadius: 200,
	},

	firstSectionContainer: {
		paddingVertical: SPACING.space_30,
		paddingHorizontal: SPACING.space_20,
		gap: SPACING.space_30,
		backgroundColor: Colors.whiteSmoke,
	},
	card: {
		minHeight: 150,
		maxHeight: Platform.OS === "ios" ? 170 : 160,
		borderRadius: BORDERRADIUS.radius_20,
		overflow: "hidden",
		position: "relative",
	},
	cardBackgroundImage: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 400,
		height: "100%",
		opacity: 0.05,
	},
	cardContentWrapper: {
		position: "relative",
		padding: SPACING.space_18,
		height: "100%",
		width: "100%",
		justifyContent: "space-between",
	},

	widgetsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	navigationButtons: {
		alignItems: "center",
		justifyContent: "center",
		gap: SPACING.space_10 - 5,
	},
	iconWrapper: {
		width: 54,
		height: 54,
		borderRadius: 50,
		position: "relative",
		backgroundColor: Colors.white,
		alignItems: "center",
		justifyContent: "center",
		zIndex: 2,
	},
	widgetLabel: {
		fontFamily: "PoppinsLight",
		fontSize: FONTSIZE.size_12,
		color: Colors.gunMetal,
	},
	kycWrapper: {
		backgroundColor: Colors.blue,
		paddingHorizontal: SPACING.space_20,
		paddingVertical: SPACING.space_15,
		position: "relative",
		overflow: "hidden",
		width: "100%",
		borderRadius: BORDERRADIUS.radius_10,
		flex: 1,
	},
	kycText: {
		textAlign: "left",
		fontSize: FONTSIZE.size_12,
		color: Colors.white,
		lineHeight: 18,
		fontFamily: "PoppinsSemiBold",
		// paddingHorizontal: SPACING.space_10,
	},
	trendContainer: {
		// backgroundColor: Colors.white,
		paddingHorizontal: SPACING.space_20,
		paddingVertical: SPACING.space_20,
		gap: SPACING.space_10,
	},
	trendItem: {
		paddingHorizontal: SPACING.space_20,
		paddingVertical: SPACING.space_20,
		minHeight: 109,
		borderRadius: BORDERRADIUS.radius_10,
		overflow: "hidden",
		justifyContent: "center",
		position: "relative",
	},
	trendHeader: {
		fontSize: FONTSIZE.size_20,
		color: Colors.black,
		lineHeight: 22,
		fontFamily: "PoppinsSemiBold",
		zIndex: 3,
	},
	transactionHeader: {
		paddingVertical: SPACING.space_10,
		paddingHorizontal: SPACING.space_20,
		backgroundColor: Colors.whiteSmoke,
		borderTopRightRadius: BORDERRADIUS.radius_20,
		borderTopLeftRadius: BORDERRADIUS.radius_20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	viewButton: {
		flexDirection: "row",
		alignItems: "center",
	},
	transactionContainer: {
		paddingBottom: SPACING.space_10,
		paddingHorizontal: SPACING.space_20,
		flex: 1,
		paddingTop: SPACING.space_10 - 5,
	},
});
