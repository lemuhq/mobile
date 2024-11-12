import {
	View,
	Text,
	Platform,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react";
import { ModalContext } from "@/provider/ModalProvider";
import { SPACING } from "@/constants/Theme";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "../inputs/Input";
import { useSelector } from "react-redux";
import { selectTransfer } from "@/redux/slice/transfer.slice";
import BottomSheetModal from "./BottomSheetModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BankListModal: FC<{
	setSelectedBank: Dispatch<
		SetStateAction<{ bankCode: string; bankName: string } | null>
	>;
}> = ({ setSelectedBank }) => {
	const { banksModalOpen, toggleBankModal } = useContext(ModalContext);

	const { bankList } = useSelector(selectTransfer);

	//State
	const [search, setSearch] = useState<string>("");
	const [items, setItems] = useState(bankList.slice(0, 20));

	const filteredBanks = useMemo(() => {
		if (!search) {
			return bankList;
		}

		return bankList.filter((bank) =>
			bank.name.toLowerCase().includes(search.toLowerCase())
		);
	}, [search, bankList]);

	const [loading, setLoading] = useState(false);

	const loadMore = () => {
		if (loading) return;
		setLoading(true);

		// Simulate an API call or data fetching delay
		setTimeout(() => {
			const nextItems = bankList.slice(items.length, items.length + 20);
			setItems((prevItems) => [...prevItems, ...nextItems]);
			setLoading(false);
		}, 1000); // Adjust delay as needed
	};

	return (
		<BottomSheetModal
			isOpen={banksModalOpen}
			onDismiss={() => {
				toggleBankModal();
				setSearch("");
			}}
		>
			<View
				style={[
					{
						width: "100%",
						height: hp("90%"),
						paddingHorizontal: SPACING.space_20,
						overflow: "hidden",
						zIndex: 2,
						paddingBottom:
							Platform.OS === "ios"
								? SPACING.space_30
								: SPACING.space_10,
						flex: 1,
						gap: wp("5%"),
					},
				]}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-end",
					}}
				>
					<TouchableOpacity
						style={{
							zIndex: 3,
						}}
						onPress={toggleBankModal}
					>
						<MaterialCommunityIcons
							name="close"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 4 }}>
					<Input
						value={search}
						setValue={setSearch}
						placeholder="Search for bank"
					/>
				</View>
				<FlatList
					data={filteredBanks}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								setSelectedBank({
									bankCode: item.bankCode,
									bankName: item.name,
								});
								toggleBankModal();
							}}
							style={styles.bankItem}
						>
							<Text
								style={{
									fontFamily: "PoppinsMedium",
									fontSize: 14,
								}}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item.bankCode}
					contentContainerStyle={{
						gap: 5,

						// flexGrow: 1,
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
					style={styles.flatList}
					// contentContainerStyle={styles.flatListContent}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</BottomSheetModal>
	);
};

export default BankListModal;

const styles = StyleSheet.create({
	bankItem: {
		height: 40,
		justifyContent: "center",
	},
	flatList: {
		flex: 1, // Make FlatList take full height
	},
	flatListContent: {
		paddingBottom: 20,
		gap: 2,
	},
});
