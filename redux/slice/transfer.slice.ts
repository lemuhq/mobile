import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	BankItem,
	BeneficiaryUser,
	PaymentRequest,
	Transaction,
} from "@/types/transfer";
import { RootState } from "../store";

interface TransferSliceState {
	bankList: BankItem[];
	beneficiaryUser: BeneficiaryUser | null;
	paymentData: PaymentRequest | null;
	transactionHistory: Transaction[];
}

const initialState: TransferSliceState = {
	bankList: [],
	beneficiaryUser: null,
	paymentData: null,
	transactionHistory: [],
};

const transferSlice = createSlice({
	name: "transferSlice",
	initialState,
	reducers: {
		setBankList: (state, action: PayloadAction<BankItem[]>) => {
			let allBanks: BankItem[] = [];
			let bankSet: Set<string> = new Set();

			action.payload.forEach((bank) => {
				if (!bankSet.has(bank.bankCode)) {
					allBanks.push(bank);

					bankSet.add(bank.bankCode);
				}
			});

			const sortedBanks = allBanks.sort((a, b) =>
				a.name.localeCompare(b.name)
			);

			state.bankList = sortedBanks;
		},

		setSelectedBeneficiaryUser: (
			state,
			action: PayloadAction<BeneficiaryUser>
		) => {
			state.beneficiaryUser = action.payload;
		},

		clearBeneficiaryUser: (state) => {
			state.beneficiaryUser = null;
		},

		setPaymentData: (state, action: PayloadAction<PaymentRequest>) => {
			state.paymentData = action.payload;
		},
		clearPaymentData: (state) => {
			state.paymentData = null;
		},

		setTransactionHistory: (state, action: PayloadAction<Transaction[]>) => {
			state.transactionHistory = action.payload;
		},
	},
});

export const {
	setBankList,
	setSelectedBeneficiaryUser,
	clearBeneficiaryUser,
	setPaymentData,
	clearPaymentData,
	setTransactionHistory,
} = transferSlice.actions;

export default transferSlice.reducer;
export const selectTransfer = (state: RootState) => state.bank;
